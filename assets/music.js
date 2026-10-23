/* ==========================================================================
   Background music — Vatapi Ganapatim (flute)

   One shared script for every page. It adds a small floating button that
   switches the music on or off, and remembers the choice across pages and
   visits.

   To use it, save your recording as:   assets/vatapi-ganapatim.mp3
   If that file is missing or can't be played, the button removes itself the
   first time it is needed (so the site never keeps a dead control).

   The recording is several MB, so nothing is downloaded on page load: the
   file is only fetched once the music is actually about to play.

   How it behaves
   · Browsers block sound until the visitor has interacted with the page, so
     the music starts softly on the first click, tap or key press (set
     AUTOSTART to false if you would rather it only start from the button).
   · Switching it off is remembered: it stays off on every page and next visit.
   · While the visitor moves between pages it carries on from the same spot.
   · It pauses when the tab is hidden and resumes when the visitor returns.
   ========================================================================== */
(() => {
  "use strict";

  const SRC = "assets/vatapi-ganapatim.mp3";
  const VOLUME = 0.35;       // 0 – 1, kept gentle so it stays in the background
  const FADE_IN_MS = 1800;
  const FADE_OUT_MS = 400;
  const AUTOSTART = true;

  const KEY_PREF = "music:pref";         // "off" once switched off (kept across visits)
  const KEY_POS = "music:position";      // playback position (kept across pages in a visit)

  const store = {
    get(area, key) { try { return window[area].getItem(key); } catch (e) { return null; } },
    set(area, key, value) { try { window[area].setItem(key, value); } catch (e) { /* storage unavailable */ } }
  };
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  const audio = new Audio();
  audio.loop = true;
  audio.preload = "none";              // no bytes until play() is called
  audio.volume = 0;

  let button = null;
  let fadeTimer = 0;
  let fadingOut = false;
  let resumeOnShow = false;
  let lastSaved = 0;

  const isOn = () => !audio.paused && !fadingOut;

  /* ---------- fading ---------- */
  function fadeTo(target, ms, done) {
    clearInterval(fadeTimer);
    const from = audio.volume;
    const steps = Math.max(1, Math.round(ms / 50));
    let i = 0;
    fadeTimer = setInterval(() => {
      i += 1;
      audio.volume = clamp(from + (target - from) * (i / steps), 0, 1);
      if (i >= steps) { clearInterval(fadeTimer); if (done) done(); }
    }, 50);
  }

  function start() {
    fadingOut = false;
    if (!audio.paused) { fadeTo(VOLUME, FADE_IN_MS / 2); render(); return Promise.resolve(); }
    audio.volume = 0;
    return audio.play().then(() => { fadeTo(VOLUME, FADE_IN_MS); render(); });
  }

  function stop() {
    fadingOut = true;
    render();
    fadeTo(0, FADE_OUT_MS, () => { audio.pause(); fadingOut = false; render(); });
  }

  /* ---------- first-gesture start (browsers block sound before this) ---------- */
  const GESTURES = ["click", "keydown", "touchend"];
  function onGesture(e) {
    if (button && button.contains(e.target)) return;   // the button handles itself
    cancelGestureStart();
    if (store.get("localStorage", KEY_PREF) !== "off") start().catch(() => {});
  }
  function waitForGesture() {
    if (!AUTOSTART) return;
    GESTURES.forEach(t => document.addEventListener(t, onGesture, { capture: true, passive: true }));
  }
  function cancelGestureStart() {
    GESTURES.forEach(t => document.removeEventListener(t, onGesture, { capture: true }));
  }

  /* ---------- button ---------- */
  const ICON = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>
      <path class="music-off" d="M3.5 3.5l17 17"/>
    </svg>`;

  const CSS = `
    .music-toggle{position:fixed;z-index:60;top:15px;right:var(--edge,20px);width:32px;height:32px;
      display:grid;place-items:center;padding:0;border:1px solid rgba(var(--ink-rgb,239,240,220),.14);border-radius:50%;
      background:rgba(var(--bg-rgb,20,10,21),.55);color:var(--cream,#eff0dc);cursor:pointer;
      -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);
      transition:border-color .3s ease,background .3s ease}
    .music-toggle:hover{border-color:rgba(var(--ink-rgb,239,240,220),.5)}
    @media (prefers-reduced-transparency:reduce){.music-toggle{background:rgb(var(--bg-rgb,20,10,21));-webkit-backdrop-filter:none;backdrop-filter:none}}
    .music-toggle:focus-visible{outline:2px solid var(--cream,#eff0dc);outline-offset:3px}
    .music-toggle .music-off{display:none}
    .music-toggle[aria-pressed="false"] .music-off{display:inline}
    .music-toggle[aria-pressed="false"]{color:rgba(var(--ink-rgb,239,240,220),.6)}
    /* leave room for the button at the end of the nav row */
    .has-music .nav{padding-right:calc(var(--edge,20px) + 48px)}
    .has-music.has-theme .nav{padding-right:calc(var(--edge,20px) + 88px)}
    @media (max-width:640px){
      .music-toggle{top:62px;right:var(--edge,20px)}
      .has-music .nav,.has-music.has-theme .nav{padding-right:var(--edge,20px)}
    }`;

  function mount() {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    button = document.createElement("button");
    button.type = "button";
    button.className = "music-toggle";
    button.setAttribute("aria-label", "Background music");
    button.innerHTML = ICON;
    button.addEventListener("click", () => {
      cancelGestureStart();
      if (isOn()) {
        store.set("localStorage", KEY_PREF, "off");
        stop();
      } else {
        store.set("localStorage", KEY_PREF, "on");
        start().catch(() => {});
      }
    });
    document.body.appendChild(button);
    document.documentElement.classList.add("has-music");
    render();
  }

  function unmount() {
    cancelGestureStart();
    if (button) { button.remove(); button = null; }
    document.documentElement.classList.remove("has-music");
  }

  function render() {
    if (!button) return;
    const on = isOn();
    button.setAttribute("aria-pressed", String(on));
    button.title = on ? "Music on — click to turn off" : "Music off — click to turn on";
  }

  /* ---------- carry on across pages ---------- */
  function savePosition() {
    if (!isFinite(audio.currentTime)) return;
    store.set("sessionStorage", KEY_POS, String(audio.currentTime));
  }
  function restorePosition() {
    const saved = parseFloat(store.get("sessionStorage", KEY_POS));
    if (isFinite(saved) && isFinite(audio.duration) && audio.duration > 0) {
      try { audio.currentTime = saved % audio.duration; } catch (e) { /* not seekable yet */ }
    }
  }

  audio.addEventListener("timeupdate", () => {
    const now = Date.now();
    if (now - lastSaved > 1000) { lastSaved = now; savePosition(); }
  });
  window.addEventListener("pagehide", savePosition);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      resumeOnShow = isOn();
      if (resumeOnShow) audio.pause();
    } else if (resumeOnShow) {
      resumeOnShow = false;
      start().catch(() => {});
    }
  });

  audio.addEventListener("playing", render);
  audio.addEventListener("pause", render);

  /* ---------- boot ---------- */
  audio.addEventListener("loadedmetadata", restorePosition, { once: true });

  // file missing or unsupported: show no control at all
  audio.addEventListener("error", unmount);

  audio.src = SRC;
  mount();
  if (store.get("localStorage", KEY_PREF) !== "off") {
    if (store.get("sessionStorage", KEY_POS) !== null) {
      // already playing earlier in this visit: carry on, but only once the page itself has
      // loaded, so the audio download never competes with the page's own text and fonts
      const resume = () => setTimeout(() => {
        start().catch(waitForGesture);   // blocked by the browser → wait for the first gesture
      }, 300);
      if (document.readyState === "complete") resume();
      else window.addEventListener("load", resume, { once: true });
    } else {
      waitForGesture();
    }
  }
})();
