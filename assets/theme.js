/* ==========================================================================
   Light / dark theme switch

   One shared script for every page. It adds a small sun/moon button beside
   the music button. Dark is the default; choosing light is remembered across
   pages and visits. The stored choice is applied before first paint by the
   small inline script in each page's <head>, so there is no flash.
   The colours themselves live in each page's :root[data-theme="light"] block.
   ========================================================================== */
(() => {
  "use strict";

  const KEY = "theme";
  const root = document.documentElement;
  const isLight = () => root.dataset.theme === "light";

  const ICON = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <g class="theme-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5"/></g>
      <path class="theme-moon" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>
    </svg>`;

  // same look as the music button, sitting just to its left
  const CSS = `
    .theme-toggle{position:fixed;z-index:60;top:15px;right:var(--edge,20px);width:32px;height:32px;
      display:grid;place-items:center;padding:0;border:1px solid rgba(var(--ink-rgb,239,240,220),.14);border-radius:50%;
      background:rgba(var(--bg-rgb,20,10,21),.55);color:var(--cream,#eff0dc);cursor:pointer;
      -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);
      transition:border-color .3s ease,background .3s ease}
    .has-music .theme-toggle{right:calc(var(--edge,20px) + 40px)}
    .theme-toggle:hover{border-color:rgba(var(--ink-rgb,239,240,220),.5)}
    @media (prefers-reduced-transparency:reduce){.theme-toggle{background:rgb(var(--bg-rgb,20,10,21));-webkit-backdrop-filter:none;backdrop-filter:none}}
    .theme-toggle:focus-visible{outline:2px solid var(--cream,#eff0dc);outline-offset:3px}
    /* show the theme you would switch to: a sun while dark, a moon while light */
    .theme-toggle .theme-moon{display:none}
    [data-theme="light"] .theme-toggle .theme-sun{display:none}
    [data-theme="light"] .theme-toggle .theme-moon{display:inline}
    .has-theme .nav{padding-right:calc(var(--edge,20px) + 48px)}
    @media (max-width:640px){
      .theme-toggle{top:62px}
      .has-theme .nav{padding-right:var(--edge,20px)}
    }`;

  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";
  button.innerHTML = ICON;

  function render() {
    const light = isLight();
    button.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    button.title = light ? "Light theme — click for dark" : "Dark theme — click for light";
  }

  button.addEventListener("click", () => {
    const next = isLight() ? "dark" : "light";
    const apply = () => { if (next === "light") root.dataset.theme = "light"; else delete root.dataset.theme; };
    // a short cross-fade instead of a sudden flash of brightness, where the browser can
    // (skipped when the tab isn't drawing, e.g. hidden; the theme still changes, so ignore that)
    if (document.startViewTransition) document.startViewTransition(apply).ready.catch(() => {}); else apply();
    try { localStorage.setItem(KEY, next); } catch (e) { /* storage unavailable */ }
    render();
  });

  document.body.appendChild(button);
  root.classList.add("has-theme");
  render();
})();
