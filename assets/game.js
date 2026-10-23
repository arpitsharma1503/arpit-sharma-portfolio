/* ==========================================================================
   Cosmic Defender — the "side quest" arcade game on the home page

   A small vertical space shooter drawn on one <canvas>. No libraries, no
   assets: the sprites are pixel grids below and the sounds are synthesised.

   How it is put together
   · State      ready → playing ⇄ paused → over (→ playing again)
   · World      a fixed logical size (960×540, or 540×675 on a tall phone
                screen); the canvas just scales it, so resizing never changes
                the game itself
   · Loop       requestAnimationFrame, with all movement multiplied by the
                elapsed time, so speed is the same at any frame rate
   · Text       every label, score and button is real HTML over the canvas
                (see the markup in index.html), so it is readable and
                keyboard-accessible
   · Pausing    automatic when the tab is hidden, the window loses focus or
                the game scrolls out of view; nothing runs while off screen
   ========================================================================== */
(() => {
  "use strict";

  const panel = document.querySelector(".arcade__panel");
  if (!panel) return;

  const $ = name => panel.querySelector(`[data-arcade="${name}"]`);
  const canvas = $("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const el = {
    screen: $("screen"), score: $("score"), best: $("best"), wave: $("wave"), lives: $("lives"),
    sound: $("sound"), pause: $("pause"), fullscreen: $("fullscreen"), start: $("start"), resume: $("resume"),
    restart: $("restart"), exit: $("exit"), again: $("again"),
    touchPause: $("touch-pause"),
    readyBest: $("ready-best"), readyBestValue: $("ready-best-value"),
    finalScore: $("final-score"), finalBest: $("final-best"),
    finalKills: $("final-kills"), finalTime: $("final-time"), verdict: $("verdict")
  };

  const reducedMotion = !document.documentElement.classList.contains("motion");
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const rand = (min, max) => min + Math.random() * (max - min);

  /* ---------- colours: the site's dark palette, fixed (the panel is dark in both themes) ---------- */
  const C = {
    bg: "#140a15", bg2: "#1e1022", cream: "#eff0dc", ember: "#e2622e",
    lime: "#5fd700", lilac: "#a896ff", warm: "#ffc4a0", white: "#ffffff"
  };

  /* ======================================================================
     Sprites — pixel grids. 1 = main colour, 2 = accent, 3 = shadow
     ====================================================================== */
  const PX = 4;                                   // one sprite pixel, in world units
  const SPRITES = {
    player: { colors: [C.cream, C.ember, C.bg2], rows: [
      ".....1.....",
      ".....1.....",
      "....111....",
      "....121....",
      ".1.11211.1.",
      ".111111111.",
      "11111111111",
      "11.11111.11",
      "1...3.3...1"] },
    scout: { colors: [C.lime, C.bg, C.bg2], rows: [
      "..1.1..",
      ".11111.",
      "1121211",
      "1111111",
      ".1.1.1.",
      "1.....1"] },
    fighter: { colors: [C.lilac, C.bg, C.bg2], rows: [
      "1.......1",
      "11.111.11",
      "111111111",
      "1.12121.1",
      "..11111..",
      "...111...",
      "....1...."] },
    heavy: { colors: [C.ember, C.cream, C.bg2], rows: [
      "...1111111...",
      "..111111111..",
      ".11211111211.",
      "1111111111111",
      "1133111113311",
      "1111111111111",
      ".111.111.111.",
      "..1...1...1.."] },
    bonus: { colors: [C.warm, C.bg, C.bg2], rows: [
      "...11111...",
      ".111111111.",
      "12121212121",
      ".111111111.",
      "...1...1..."] }
  };

  // each sprite is drawn once to its own small canvas (plus an all-white copy for the hit flash)
  function bakeSprite(def) {
    const w = def.rows[0].length, h = def.rows.length;
    const make = flash => {
      const c = document.createElement("canvas");
      c.width = w * PX; c.height = h * PX;
      const g = c.getContext("2d");
      def.rows.forEach((row, y) => {
        for (let x = 0; x < w; x++) {
          const ch = row[x];
          if (ch === ".") continue;
          g.fillStyle = flash ? C.white : def.colors[ch - 1];
          g.fillRect(x * PX, y * PX, PX, PX);
        }
      });
      return c;
    };
    return { w: w * PX, h: h * PX, normal: make(false), flash: make(true) };
  }
  const sprite = {};
  for (const key in SPRITES) sprite[key] = bakeSprite(SPRITES[key]);

  /* ======================================================================
     Tuning
     ====================================================================== */
  const ENEMY = {
    //         hit points  speed (world units / s)  score
    scout:   { hp: 1, speed: 150, points: 10 },
    fighter: { hp: 2, speed: 95,  points: 25 },
    heavy:   { hp: 5, speed: 55,  points: 60 }
  };
  const START_LIVES = 3;
  const PLAYER_SPEED = 430;
  const BULLET_SPEED = 640;
  const FIRE_GAP = .14;                           // seconds between shots (the ship fires by itself)
  const RAPID_GAP = .09;
  const RAPID_TIME = 7;
  const INVULNERABLE_TIME = 1.8;
  const POINTS_PER_WAVE = 350;
  const MAX_PARTICLES = 160;
  const BEST_KEY = "arcade:best";

  /* ======================================================================
     State
     ====================================================================== */
  let state = "ready";
  let W = 960, H = 540;                           // logical world size
  let best = readBest();
  let rafId = 0, lastTime = 0, inView = false;

  const input = { left: false, right: false, pointerX: null };
  const player = { x: 0, y: 0, w: sprite.player.w, h: sprite.player.h, cooldown: 0, invulnerable: 0, rapid: 0 };
  const game = { score: 0, lives: START_LIVES, wave: 1, kills: 0, time: 0, spawnIn: 0, bonusIn: 0, shake: 0, clock: 0 };
  let bullets = [], enemyBullets = [], enemies = [], particles = [], powerups = [], stars = [];
  let bonus = null;                               // the occasional bonus saucer

  function readBest() {
    try { return parseInt(localStorage.getItem(BEST_KEY), 10) || 0; } catch (e) { return 0; }
  }
  function saveBest(value) {
    try { localStorage.setItem(BEST_KEY, String(value)); } catch (e) { /* storage unavailable: best lasts for this visit */ }
  }

  /* ======================================================================
     Sound — synthesised, off until the player switches it on
     ====================================================================== */
  let audio = null, soundOn = false;
  function beep(from, to, seconds, type, volume) {
    if (!soundOn || !audio) return;
    const t = audio.currentTime;
    const osc = audio.createOscillator(), gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t + seconds);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(.0001, t + seconds);
    osc.connect(gain).connect(audio.destination);
    osc.start(t); osc.stop(t + seconds);
  }
  const sfx = {
    shoot:  () => beep(880, 320, .08, "square", .03),
    hit:    () => beep(300, 180, .05, "square", .03),
    boom:   () => beep(220, 50, .22, "sawtooth", .05),
    hurt:   () => beep(160, 40, .4, "sawtooth", .07),
    power:  () => beep(440, 990, .2, "triangle", .06),
    over:   () => beep(330, 55, .9, "triangle", .08)
  };
  function toggleSound() {
    soundOn = !soundOn;
    if (soundOn && !audio) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (Ctor) audio = new Ctor(); else soundOn = false;
    }
    if (soundOn && audio.state === "suspended") audio.resume();
    el.sound.setAttribute("aria-pressed", String(soundOn));
    el.sound.textContent = soundOn ? "Sound on" : "Sound off";
  }

  /* ======================================================================
     HUD (HTML) — only touched when a value actually changes
     ====================================================================== */
  const shown = {};
  function setText(node, key, value) {
    if (shown[key] === value) return;
    shown[key] = value;
    node.textContent = value;
  }
  function renderHud() {
    setText(el.score, "score", String(game.score));
    setText(el.best, "best", String(Math.max(best, game.score)));
    setText(el.wave, "wave", String(game.wave));
    if (shown.lives !== game.lives) {
      shown.lives = game.lives;
      el.lives.setAttribute("aria-label", `${game.lives} ${game.lives === 1 ? "life" : "lives"}`);
      // extra lives beyond the three pips simply keep all three lit
      [...el.lives.children].forEach((pip, i) => pip.classList.toggle("is-lost", i >= game.lives));
    }
  }
  function formatTime(seconds) {
    const s = Math.floor(seconds);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  /* ======================================================================
     Setting up a run
     ====================================================================== */
  function seedStars() {
    const count = Math.round(W * H / 5200);
    stars = Array.from({ length: count }, () => {
      const depth = Math.random() < .6 ? 0 : Math.random() < .7 ? 1 : 2;
      return { x: Math.random() * W, y: Math.random() * H, depth, size: [1.5, 2, 3][depth], alpha: [.3, .5, .8][depth] };
    });
  }

  function resetRun() {
    game.score = 0; game.lives = START_LIVES; game.wave = 1; game.kills = 0;
    game.time = 0; game.spawnIn = .8; game.bonusIn = rand(16, 22); game.shake = 0;
    bullets = []; enemyBullets = []; enemies = []; particles = []; powerups = []; bonus = null;
    player.x = W / 2; player.y = H - 46;
    player.cooldown = 0; player.invulnerable = 0; player.rapid = 0;
    input.left = input.right = false; input.pointerX = null;
  }

  /* ======================================================================
     Spawning
     ====================================================================== */
  // gets harder with each wave, but gently, and with a ceiling
  const speedScale = () => Math.min(1 + (game.wave - 1) * .06, 1.9);
  const spawnGap = () => Math.max(.38, 1.15 - (game.wave - 1) * .07);

  function addEnemy(type, x, y) {
    const def = ENEMY[type], sp = sprite[type];
    enemies.push({
      type, x: clamp(x, sp.w / 2 + 6, W - sp.w / 2 - 6), y,
      w: sp.w, h: sp.h, hp: def.hp, speed: def.speed * speedScale() * rand(.9, 1.1),
      phase: rand(0, Math.PI * 2), flash: 0, shootIn: rand(1.4, 3)
    });
  }

  function pickType() {
    const r = Math.random();
    if (game.wave >= 4 && r < Math.min(.1 + (game.wave - 4) * .03, .25)) return "heavy";
    if (game.wave >= 2 && r < Math.min(.3 + game.wave * .04, .6)) return "fighter";
    return "scout";
  }

  function spawn() {
    // from wave 3, sometimes a small V of scouts arrives together
    if (game.wave >= 3 && Math.random() < .22) {
      const cx = rand(120, W - 120), n = game.wave >= 6 ? 5 : 3, mid = (n - 1) / 2;
      for (let i = 0; i < n; i++) addEnemy("scout", cx + (i - mid) * 46, -30 - Math.abs(i - mid) * 26);
      return;
    }
    const type = pickType();
    addEnemy(type, rand(40, W - 40), -sprite[type].h);
  }

  function spawnBonus() {
    const fromLeft = Math.random() < .5, sp = sprite.bonus;
    bonus = { x: fromLeft ? -sp.w : W + sp.w, y: 54, w: sp.w, h: sp.h, vx: (fromLeft ? 1 : -1) * 130, hp: 3, flash: 0 };
  }

  function burst(x, y, color, count, power) {
    if (reducedMotion) count = Math.ceil(count / 3);
    for (let i = 0; i < count && particles.length < MAX_PARTICLES; i++) {
      const angle = rand(0, Math.PI * 2), speed = rand(.3, 1) * power;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0, max: rand(.25, .6), color, size: Math.random() < .5 ? PX : PX / 2 });
    }
  }

  /* ======================================================================
     Update
     ====================================================================== */
  const overlap = (a, b) =>
    Math.abs(a.x - b.x) * 2 < a.w + b.w && Math.abs(a.y - b.y) * 2 < a.h + b.h;

  // remove item i without shifting the rest of the array
  function drop(list, i) { list[i] = list[list.length - 1]; list.pop(); }

  function destroyEnemy(e, i) {
    game.score += ENEMY[e.type].points;
    game.kills += 1;
    burst(e.x, e.y, SPRITES[e.type].colors[0], e.type === "heavy" ? 22 : 12, e.type === "heavy" ? 240 : 170);
    sfx.boom();
    drop(enemies, i);
  }

  function hurtPlayer() {
    if (player.invulnerable > 0) return;
    game.lives -= 1;
    player.invulnerable = INVULNERABLE_TIME;
    player.rapid = 0;
    game.shake = reducedMotion ? 0 : .3;
    burst(player.x, player.y, C.cream, 18, 220);
    sfx.hurt();
    if (game.lives <= 0) gameOver();
  }

  function update(dt) {
    game.time += dt;
    game.clock += dt;
    game.wave = 1 + Math.floor(game.score / POINTS_PER_WAVE);
    if (game.shake > 0) game.shake -= dt;

    /* player */
    if (input.pointerX !== null) {
      player.x = input.pointerX;                                 // moves 1:1 with the finger
    } else {
      player.x += ((input.right ? 1 : 0) - (input.left ? 1 : 0)) * PLAYER_SPEED * dt;
    }
    player.x = clamp(player.x, player.w / 2 + 4, W - player.w / 2 - 4);
    player.y = H - 46;
    player.cooldown -= dt;
    if (player.invulnerable > 0) player.invulnerable -= dt;
    if (player.rapid > 0) player.rapid -= dt;

    if (player.cooldown <= 0) {                                 // fires on its own for the whole run
      const rapid = player.rapid > 0;
      player.cooldown = rapid ? RAPID_GAP : FIRE_GAP;
      const top = player.y - player.h / 2;
      if (rapid) {
        bullets.push({ x: player.x - 12, y: top, w: 4, h: 14 }, { x: player.x + 12, y: top, w: 4, h: 14 });
      } else {
        bullets.push({ x: player.x, y: top, w: 4, h: 14 });
      }
      sfx.shoot();
    }

    /* spawning */
    game.spawnIn -= dt;
    if (game.spawnIn <= 0) { spawn(); game.spawnIn = spawnGap() * rand(.75, 1.25); }
    game.bonusIn -= dt;
    if (game.bonusIn <= 0 && !bonus) { spawnBonus(); game.bonusIn = rand(18, 26); }

    /* player bullets */
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.y -= BULLET_SPEED * dt;
      if (b.y < -20) { drop(bullets, i); continue; }

      if (bonus && overlap(b, bonus)) {
        drop(bullets, i);
        bonus.hp -= 1; bonus.flash = .08; sfx.hit();
        if (bonus.hp <= 0) {
          game.score += 150;
          burst(bonus.x, bonus.y, C.warm, 20, 220); sfx.boom();
          // a damaged ship is more likely to be offered a repair
          const kind = game.lives < START_LIVES && Math.random() < .5 ? "repair" : "rapid";
          powerups.push({ x: bonus.x, y: bonus.y, w: 22, h: 22, kind });
          bonus = null;
        }
        continue;
      }
      for (let j = enemies.length - 1; j >= 0; j--) {
        const e = enemies[j];
        if (!overlap(b, e)) continue;
        drop(bullets, i);
        e.hp -= 1; e.flash = .08;
        if (e.hp <= 0) destroyEnemy(e, j); else sfx.hit();
        break;
      }
    }

    /* enemies */
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      e.y += e.speed * dt;
      if (e.flash > 0) e.flash -= dt;
      if (e.type === "scout") {
        e.x += Math.cos(game.clock * 3 + e.phase) * 70 * dt;             // a little weave
      } else if (e.type === "fighter") {
        e.x += clamp(player.x - e.x, -1, 1) * 42 * speedScale() * dt;    // drifts toward the player
        e.shootIn -= dt;
        if (game.wave >= 3 && e.shootIn <= 0 && e.y > 0 && e.y < H * .6) {
          e.shootIn = rand(2, 3.4);
          enemyBullets.push({ x: e.x, y: e.y + e.h / 2, w: 5, h: 12 });
        }
      }
      e.x = clamp(e.x, e.w / 2 + 4, W - e.w / 2 - 4);

      if (e.y - e.h / 2 > H) { drop(enemies, i); continue; }               // slipped past: no points
      if (overlap(e, player) && player.invulnerable <= 0) {
        burst(e.x, e.y, SPRITES[e.type].colors[0], 12, 170);
        drop(enemies, i);
        hurtPlayer();
        if (state !== "playing") return;
      }
    }

    /* enemy bullets */
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      const b = enemyBullets[i];
      b.y += 250 * speedScale() * dt;
      if (b.y > H + 20) { drop(enemyBullets, i); continue; }
      if (overlap(b, player) && player.invulnerable <= 0) {
        drop(enemyBullets, i);
        hurtPlayer();
        if (state !== "playing") return;
      }
    }

    /* bonus saucer and what it drops */
    if (bonus) {
      bonus.x += bonus.vx * dt;
      if (bonus.flash > 0) bonus.flash -= dt;
      if (bonus.x < -bonus.w * 2 || bonus.x > W + bonus.w * 2) bonus = null;
    }
    for (let i = powerups.length - 1; i >= 0; i--) {
      const p = powerups[i];
      p.y += 120 * dt;
      if (p.y > H + 20) { drop(powerups, i); continue; }
      if (!overlap(p, player)) continue;
      if (p.kind === "repair") game.lives = Math.min(game.lives + 1, START_LIVES);
      else player.rapid = RAPID_TIME;
      burst(p.x, p.y, p.kind === "repair" ? C.lime : C.warm, 10, 140);
      sfx.power();
      drop(powerups, i);
    }

    updateScenery(dt, 1);
  }

  // stars and particles also move on the start screen, just more slowly
  function updateScenery(dt, pace) {
    if (!reducedMotion) {
      for (const s of stars) {
        s.y += [14, 30, 62][s.depth] * pace * dt;
        if (s.y > H) { s.y -= H; s.x = Math.random() * W; }
      }
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life += dt;
      if (p.life >= p.max) { drop(particles, i); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt;
    }
  }

  /* ======================================================================
     Draw
     ====================================================================== */
  let scale = 1, dpr = 1;

  function drawSprite(sp, x, y, flash) {
    ctx.drawImage(flash ? sp.flash : sp.normal, Math.round(x - sp.w / 2), Math.round(y - sp.h / 2));
  }

  function draw() {
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    ctx.imageSmoothingEnabled = false;

    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, C.bg); sky.addColorStop(1, C.bg2);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    if (game.shake > 0) ctx.translate(rand(-3, 3), rand(-3, 3));

    ctx.fillStyle = C.cream;
    for (const s of stars) {
      ctx.globalAlpha = s.alpha;
      ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
    }
    ctx.globalAlpha = 1;

    for (const p of powerups) {
      const color = p.kind === "repair" ? C.lime : C.warm;
      ctx.strokeStyle = color; ctx.lineWidth = 2;
      ctx.strokeRect(Math.round(p.x - 11), Math.round(p.y - 11), 22, 22);
      ctx.fillStyle = color;
      if (p.kind === "repair") {                                   // a plus
        ctx.fillRect(p.x - 2, p.y - 7, 4, 14); ctx.fillRect(p.x - 7, p.y - 2, 14, 4);
      } else {                                                     // two bars: double shot
        ctx.fillRect(p.x - 6, p.y - 6, 4, 12); ctx.fillRect(p.x + 2, p.y - 6, 4, 12);
      }
    }

    if (bonus) drawSprite(sprite.bonus, bonus.x, bonus.y, bonus.flash > 0);
    for (const e of enemies) drawSprite(sprite[e.type], e.x, e.y, e.flash > 0);

    ctx.fillStyle = C.ember;
    for (const b of enemyBullets) ctx.fillRect(Math.round(b.x - b.w / 2), Math.round(b.y - b.h / 2), b.w, b.h);

    for (const b of bullets) {
      const x = Math.round(b.x - b.w / 2), y = Math.round(b.y - b.h / 2);
      ctx.globalAlpha = .25; ctx.fillStyle = C.lime;                // a restrained glow
      ctx.fillRect(x - 2, y - 2, b.w + 4, b.h + 4);
      ctx.globalAlpha = 1; ctx.fillStyle = C.cream;
      ctx.fillRect(x, y, b.w, b.h);
    }

    /* the ship: blinks while invulnerable, with a flickering thruster */
    const blinkOff = player.invulnerable > 0 && Math.floor(player.invulnerable * 12) % 2 === 0;
    if (state !== "over" && !blinkOff) {
      const bob = state === "ready" && !reducedMotion ? Math.sin(game.clock * 2) * 3 : 0;
      const flame = reducedMotion ? 8 : 6 + (Math.floor(game.clock * 18) % 2) * 5;
      ctx.fillStyle = player.rapid > 0 ? C.warm : C.ember;
      ctx.fillRect(player.x - 10, player.y + player.h / 2 + bob, 4, flame);
      ctx.fillRect(player.x + 6, player.y + player.h / 2 + bob, 4, flame);
      drawSprite(sprite.player, player.x, player.y + bob, false);
    }

    for (const p of particles) {
      ctx.globalAlpha = 1 - p.life / p.max;
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }

  /* ======================================================================
     Loop — runs while playing, or (gently) while the start screen is in view
     ====================================================================== */
  function frame(now) {
    rafId = 0;
    const dt = Math.min((now - lastTime) / 1000, 1 / 30);          // a long pause never becomes one giant step
    lastTime = now;

    if (state === "playing") { update(dt); renderHud(); }
    else { game.clock += dt; updateScenery(dt, .35); }
    draw();
    schedule();
  }
  function schedule() {
    if (rafId) return;
    const idleScene = state === "ready" && inView && !reducedMotion && !document.hidden;
    if (state !== "playing" && !idleScene) return;
    lastTime = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stopLoop() { cancelAnimationFrame(rafId); rafId = 0; }

  /* ======================================================================
     State changes
     ====================================================================== */
  function setState(next) {
    state = next;
    panel.dataset.state = next;
    const playing = next === "playing";
    el.pause.disabled = el.touchPause.disabled = !playing;
    stopLoop();
    draw();
    schedule();
  }

  function start() {
    panel.classList.remove("is-record");
    resetRun();
    renderHud();
    setState("playing");
    el.screen.focus({ preventScroll: true });       // so keys steer the ship instead of pressing a button
  }

  function pause() {
    if (state !== "playing") return;
    input.left = input.right = false; input.pointerX = null; drag = null;
    setState("paused");
    if (panel.contains(document.activeElement)) el.resume.focus({ preventScroll: true });
  }

  function resume() {
    if (state !== "paused") return;
    setState("playing");
    el.screen.focus({ preventScroll: true });
  }

  function exitToReady() {
    resetRun();
    renderHud();
    showReadyBest();
    setState("ready");
    el.start.focus({ preventScroll: true });
  }

  function gameOver() {
    const record = game.score > best;
    if (record) { best = game.score; saveBest(best); }
    panel.classList.toggle("is-record", record);

    el.finalScore.textContent = game.score;
    el.finalBest.textContent = best;
    el.finalKills.textContent = game.kills;
    el.finalTime.textContent = formatTime(game.time);
    el.verdict.textContent =
      game.score >= 1500 ? "Elite pilot detected." :
      game.score >= 500  ? "Not bad, pilot. Your sector is almost secure." :
                           "The galaxy believes in second chances.";
    sfx.over();
    renderHud();
    setState("over");
    if (panel.contains(document.activeElement)) el.again.focus({ preventScroll: true });
  }

  function showReadyBest() {
    el.readyBest.hidden = best <= 0;
    el.readyBestValue.textContent = best;
  }

  /* ======================================================================
     Input
     ====================================================================== */
  const isTyping = target =>
    target instanceof Element && target.closest("input, textarea, select, [contenteditable]");

  function onKeyDown(e) {
    if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;

    if (state === "playing") {
      switch (e.code) {
        case "ArrowLeft": case "KeyA": input.left = true; input.pointerX = null; break;
        case "ArrowRight": case "KeyD": input.right = true; input.pointerX = null; break;
        case "Space": case "ArrowUp": case "ArrowDown": break;      // swallowed, so the page stays put
        case "KeyP": case "Escape": pause(); break;
        case "KeyF": toggleFullscreen(); break;
        default: return;
      }
      e.preventDefault();
    } else if (state === "paused") {
      if (e.code === "KeyP" || e.code === "Escape") { resume(); e.preventDefault(); }
      else if (e.code === "KeyF") { toggleFullscreen(); e.preventDefault(); }
    } else if (e.code === "Enter" && inView) {
      // a focused button or link handles its own Enter; this is for when nothing is focused
      if (e.target instanceof Element && e.target.closest("button, a, summary")) return;
      start(); e.preventDefault();
    }
  }
  function onKeyUp(e) {
    switch (e.code) {
      case "ArrowLeft": case "KeyA": input.left = false; break;
      case "ArrowRight": case "KeyD": input.right = false; break;
    }
  }

  // drag (finger, pen or held mouse button) steers the ship: it moves by however far the
  // finger moves, from wherever the finger lands, so the ship never jumps and the thumb
  // doesn't have to cover it
  let drag = null;
  function pointerToWorld(e) {
    const rect = canvas.getBoundingClientRect();
    return clamp((e.clientX - rect.left) / rect.width, 0, 1) * W;
  }
  function onPointerDown(e) {
    if (state !== "playing") return;
    drag = { from: pointerToWorld(e), shipX: player.x };
    input.pointerX = player.x;
    canvas.setPointerCapture(e.pointerId);
    e.preventDefault();
  }
  function onPointerMove(e) {
    if (state !== "playing" || !drag) return;
    input.pointerX = drag.shipX + pointerToWorld(e) - drag.from;
  }
  function onPointerUp() { drag = null; input.pointerX = null; }

  /* ======================================================================
     Full screen — the whole panel (bar, screen and controls) fills the display.
     The button only appears where the browser can do it (not on iPhones).
     ====================================================================== */
  const fsRequest = panel.requestFullscreen || panel.webkitRequestFullscreen;
  const fsExit = document.exitFullscreen || document.webkitExitFullscreen;
  const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement;

  function toggleFullscreen() {
    if (!fsRequest || !fsExit) return;
    const result = fsElement() === panel ? fsExit.call(document) : fsRequest.call(panel);
    if (result && result.catch) result.catch(() => {});           // refused by the browser: stay as we are
  }
  function onFullscreenChange() {
    const on = fsElement() === panel;
    panel.classList.toggle("is-fullscreen", on);
    el.fullscreen.setAttribute("aria-pressed", String(on));
    el.fullscreen.textContent = on ? "Exit full screen" : "Full screen";
    if (state === "playing") el.screen.focus({ preventScroll: true });
    resize();
  }

  /* ======================================================================
     Sizing — the canvas matches its box; the world is scaled to fit
     ====================================================================== */
  function resize() {
    const rect = el.screen.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const tall = rect.height > rect.width;
    const nextW = tall ? 540 : 960, nextH = Math.round(nextW * rect.height / rect.width);
    const changed = nextW !== W || nextH !== H;
    W = nextW; H = nextH;
    scale = rect.width / W;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    if (changed || !stars.length) {
      seedStars();
      // keep everything inside the new field
      player.x = state === "playing" || state === "paused" ? clamp(player.x, player.w / 2, W - player.w / 2) : W / 2;
      player.y = H - 46;
      for (const e of enemies) e.x = clamp(e.x, e.w / 2, W - e.w / 2);
    }
    draw();
  }

  /* ======================================================================
     Boot
     ====================================================================== */
  el.start.addEventListener("click", start);
  el.again.addEventListener("click", start);
  el.restart.addEventListener("click", start);
  el.resume.addEventListener("click", resume);
  el.exit.addEventListener("click", exitToReady);
  el.pause.addEventListener("click", pause);
  el.touchPause.addEventListener("click", pause);
  el.sound.addEventListener("click", toggleSound);
  if (fsRequest && fsExit) {
    el.fullscreen.hidden = false;
    el.fullscreen.addEventListener("click", toggleFullscreen);
    ["fullscreenchange", "webkitfullscreenchange"].forEach(type => document.addEventListener(type, onFullscreenChange));
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", pause);
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); else schedule(); });

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  ["pointerup", "pointercancel"].forEach(type => canvas.addEventListener(type, onPointerUp));

  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(el.screen);
  window.addEventListener("resize", resize);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (!inView) pause();                         // scrolled away mid-game: hold everything
      schedule();
    }, { threshold: .35 }).observe(el.screen);
  } else {
    inView = true;
  }

  resetRun();
  resize();
  renderHud();
  showReadyBest();
  setState("ready");
})();
