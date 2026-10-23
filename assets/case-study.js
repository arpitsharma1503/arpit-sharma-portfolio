/* ==========================================================================
   Case-study pages (GroupBima, Cardinal) — interactive pieces.
   Every feature looks for its own markup and quietly does nothing if it is
   not on the page. If this file fails to load, the content is still all there.
   ========================================================================== */
(() => {
  "use strict";

  const root = document.documentElement;
  const motion = root.classList.contains("motion");
  const hasIO = "IntersectionObserver" in window;
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  root.classList.add("cs-ready");

  /* ------------------------------------------------------------------
     Journey tabs
     ------------------------------------------------------------------ */
  $$("[data-tabs]").forEach(box => {
    const tabs = $$('[role="tab"]', box);
    const panels = tabs.map(t => document.getElementById(t.getAttribute("aria-controls")));

    function select(index, focus) {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i, false));
      tab.addEventListener("keydown", e => {
        const last = tabs.length - 1;
        let next = null;
        if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
        else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = last;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });

    select(0, false);
  });

  /* ------------------------------------------------------------------
     Count-up numbers (the final value is already in the markup)
     ------------------------------------------------------------------ */
  const counters = $$("[data-count]");
  if (counters.length && motion && hasIO) {
    const fmt = (el, value) => {
      const decimals = +(el.dataset.decimals || 0);
      return value.toFixed(decimals) + (el.dataset.suffix || "");
    };
    const ease = t => 1 - Math.pow(1 - t, 3);

    counters.forEach(el => { el.textContent = fmt(el, 0); });

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const start = performance.now();
        const duration = 1300;
        (function tick(now) {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = fmt(el, target * ease(t));
          if (t < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: .6 });
    counters.forEach(el => io.observe(el));
  }

  /* ------------------------------------------------------------------
     Click to copy (colour swatches and token names)
     ------------------------------------------------------------------ */
  const live = document.createElement("p");
  live.className = "sr-only";
  live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { /* blocked */ }
      ta.remove();
      return ok;
    }
  }

  $$("[data-copy]").forEach(btn => {
    let timer = 0;
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      if (!(await copyText(text))) return;
      btn.dataset.state = "copied";
      live.textContent = `Copied ${text}`;
      clearTimeout(timer);
      timer = setTimeout(() => { delete btn.dataset.state; }, 1600);
    });
  });

  /* ------------------------------------------------------------------
     Small demos in the design-system cards
     ------------------------------------------------------------------ */
  // favourite heart: instant, no confirmation
  $$(".heart").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true"));
    });
  });

  // category chips: pick one
  $$(".demo--chips").forEach(group => {
    const chips = $$("button.chip", group);
    chips.forEach(chip => chip.addEventListener("click", () => {
      chips.forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
    }));
  });

  // bottom navigation: active tab fills in
  $$(".demo--nav").forEach(nav => {
    const tabs = $$("button", nav);
    tabs.forEach(tab => tab.addEventListener("click", () => {
      tabs.forEach(t => t.removeAttribute("aria-current"));
      tab.setAttribute("aria-current", "true");
    }));
  });

  // stepper: back / next through the five onboarding steps
  $$("[data-stepper]").forEach(box => {
    const names = ["Family details", "Medical history", "Personal info", "View quotes", "Purchase"];
    const bars = $$(".stepbar i", box);
    const msg = box.querySelector(".stepmsg");
    const prev = box.querySelector("[data-prev]");
    const next = box.querySelector("[data-next]");
    let step = 1;

    function render() {
      bars.forEach((b, i) => b.classList.toggle("on", i < step));
      msg.textContent = `Step ${step} of ${names.length} — ${names[step - 1]}` + (step >= 4 ? " · you’re almost there" : "");
      prev.disabled = step === 1;
      next.disabled = step === names.length;
    }
    prev.addEventListener("click", () => { step = Math.max(1, step - 1); render(); });
    next.addEventListener("click", () => { step = Math.min(names.length, step + 1); render(); });
    render();
  });

  /* ------------------------------------------------------------------
     Staggered entrance for groups of cards
     ------------------------------------------------------------------ */
  const groups = $$("[data-stagger]");
  groups.forEach(g => $$(":scope > *", g).forEach((child, i) => child.style.setProperty("--i", Math.min(i, 8))));
  if (!motion || !hasIO) {
    groups.forEach(g => g.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
    groups.forEach(g => io.observe(g));
  }

  /* ------------------------------------------------------------------
     Visuals: play their entrance when they scroll into view
     ------------------------------------------------------------------ */
  const vizzes = $$("[data-viz]");
  vizzes.forEach(v => $$(".rings > i", v).forEach((el, i) => el.style.setProperty("--i", i)));
  if (!motion || !hasIO) {
    vizzes.forEach(v => v.classList.add("is-in"));
  } else {
    const vio = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        vio.unobserve(entry.target);
      });
    }, { threshold: .3 });
    vizzes.forEach(v => vio.observe(v));
  }

  /* ------------------------------------------------------------------
     Night sky: a full moon, two constellations and a rare shooting star
     ------------------------------------------------------------------ */
  (function initNightSky() {
    const MOON = `
      <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="moon-base" cx=".38" cy=".34" r=".78">
            <stop offset="0" stop-color="#fffdf1"/><stop offset=".55" stop-color="#ece7d0"/><stop offset="1" stop-color="#b7b199"/>
          </radialGradient>
          <radialGradient id="moon-limb" cx=".5" cy=".5" r=".5">
            <stop offset=".72" stop-color="#140a15" stop-opacity="0"/><stop offset="1" stop-color="#140a15" stop-opacity=".32"/>
          </radialGradient>
          <filter id="moon-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter>
          <clipPath id="moon-clip"><circle cx="100" cy="100" r="96"/></clipPath>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#moon-base)"/>
        <g clip-path="url(#moon-clip)" filter="url(#moon-soft)" fill="#8c8670" opacity=".38">
          <ellipse cx="72" cy="66" rx="26" ry="20"/><ellipse cx="108" cy="60" rx="15" ry="13"/>
          <ellipse cx="124" cy="90" rx="21" ry="14"/><ellipse cx="140" cy="118" rx="11" ry="17"/>
          <ellipse cx="86" cy="130" rx="16" ry="13"/><ellipse cx="48" cy="98" rx="19" ry="34"/>
          <ellipse cx="96" cy="94" rx="12" ry="9"/>
        </g>
        <g fill="none" stroke="#8c8670" stroke-opacity=".5" stroke-width="1.2">
          <circle cx="82" cy="104" r="4.2"/><circle cx="100" cy="172" r="3.6"/><circle cx="58" cy="60" r="3"/>
        </g>
        <circle cx="100" cy="100" r="96" fill="url(#moon-limb)"/>
      </svg>`;

    // the Big Dipper (top) and Cassiopeia (bottom)
    const dipper = [[8, 30], [46, 40], [80, 46], [112, 54], [172, 58], [168, 96], [118, 90]];
    const dipperLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]];
    const cassiopeia = [[6, 178], [44, 204], [82, 176], [122, 204], [160, 182]];
    const lines = (pts, pairs) => pairs.map(([a, b]) => `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}"/>`).join("");
    const dots = (pts, k0) => pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i % 3 === 0 ? 2.8 : 2.1}" style="--k:${k0 + i}"/>`).join("");
    const caseLines = cassiopeia.slice(1).map((_, i) => [i, i + 1]);
    const CONSTELLATIONS = `
      <svg viewBox="0 0 200 260" aria-hidden="true" focusable="false">
        ${lines(dipper, dipperLines)}${lines(cassiopeia, caseLines)}
        ${dots(dipper, 0)}${dots(cassiopeia, 7)}
      </svg>`;

    const moon = document.createElement("div");
    moon.className = "moon";
    moon.setAttribute("aria-hidden", "true");
    moon.innerHTML = MOON;

    const constellations = document.createElement("div");
    constellations.className = "constellations";
    constellations.setAttribute("aria-hidden", "true");
    constellations.innerHTML = CONSTELLATIONS;
    constellations.firstElementChild.style.cssText = "display:block;width:100%;height:auto";

    document.body.append(moon, constellations);
    // The constellations live in the empty left margin, which only exists while a
    // chapter is on screen. Fade them in there and out over the hero, next-project
    // block and footer, so they never sit behind text.
    const chapters = $$(".chap");
    const labels = $$(".chap > .chapter");
    let ticking = false;
    const update = () => {
      ticking = false;
      if (chapters.length) {
        const top = chapters[0].getBoundingClientRect().top;
        const bottom = chapters[chapters.length - 1].getBoundingClientRect().bottom;
        const inChapters = top < window.innerHeight * .3 && bottom > window.innerHeight * .7;
        // also step aside while a chapter label scrolls through their patch of sky
        const c = constellations.getBoundingClientRect();
        const crossed = labels.some(l => {
          const r = l.getBoundingClientRect();
          return r.bottom > c.top - 24 && r.top < c.bottom + 24 && r.right > c.left - 24 && r.left < c.right + 24;
        });
        constellations.classList.toggle("is-on", inChapters && !crossed);
      }
      if (motion) {                             // the moon drifts down the sky as you read
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--mp", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0");
      }
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();

    if (!motion) return;                        // reduced motion: a still sky

    // a shooting star, rarely
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.setAttribute("aria-hidden", "true");
    document.body.appendChild(star);
    star.addEventListener("animationend", () => star.classList.remove("go"));
    const schedule = () => setTimeout(fire, 22000 + Math.random() * 28000);
    function fire() {
      if (!document.hidden) {
        star.style.setProperty("--x", `${window.innerWidth * (.45 + Math.random() * .5)}px`);
        star.style.setProperty("--y", `${window.innerHeight * (.06 + Math.random() * .3)}px`);
        star.classList.remove("go");
        void star.offsetWidth;
        star.classList.add("go");
      }
      schedule();
    }
    setTimeout(fire, 9000 + Math.random() * 6000);
  })();

})();
