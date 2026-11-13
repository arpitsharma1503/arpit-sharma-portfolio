---
name: case-study-page
description: Build a portfolio project detail page (a design case study) with an editorial layout, a fixed chapter structure and skimmable writing. Use when asked to create, write, restructure or review a case study, project page or project detail page for a designer's portfolio.
---

# Case Study Page

A project detail page that a hiring manager can skim in one minute and read in ten. It reads like a magazine feature: a big hero, numbered chapters, one claim per chapter, and visuals drawn from the project's real content.

Works in any stack. The markup below is plain HTML. Keep the class names, or map them to the project's own components.

## Before you build

1. Look at the host project first. Reuse its fonts, colours, spacing, navigation, footer and theme. Do not bring a new visual style with you.
2. Gather the facts: project name, role, timeline, platform, team, responsibilities, problem, research, decisions, outcome.
3. Never invent facts. No made-up metrics, quotes, users or results. If a fact is missing, leave a clear `TODO` and tell the user. If there are no hard numbers, say so plainly and use qualitative signals.

## Page structure

Keep this order. Skip a chapter when there is no real content for it, then renumber.

| # | Part | What it holds |
|---|---|---|
| - | Top bar | Thin scroll progress line, site nav |
| - | Hero | Breadcrumb, tag pills, huge project name, one-sentence promise, facts list |
| 00 | At a Glance | Three short answers: the challenge, what I did, what shipped |
| 01 | Challenge | User pain and business problem, then the brief in one pull quote |
| 02 | Research | Methods, what was found, a visual of the evidence |
| 03 | Key Insights | Four to six findings as cards |
| 04 | Product Strategy | Three to five principles, each with the decision it drove |
| 05 | Information Architecture | Structure, user types, core flow |
| 06 | Design Exploration | Directions tried and why one won |
| 07 | Design System | Colour, type, key components |
| 08 | Final Experience | Two to three journeys stacked one after another, with real screens |
| 09 | Outcome | What shipped and what it meant |
| 10 | Reflection | What worked, what I learned, what I would improve |
| - | Next Project | Big link to the next case study, so no page is a dead end |
| - | Footer | Contact and profile links |

Capitalisation: chapter labels, nav links, small labels (facts, "Key Moves", "Next Up"), tab names and buttons use Title Case (small words like "a", "of", "to" stay lowercase). Headlines and body sentences use sentence case.

## Writing rules

- **Chapter titles are claims, not labels.** The small label says "Challenge". The heading says "Insurance in India is a trust problem, not a product problem."
- **One lead sentence per chapter**, larger than the body. Reading only the leads and titles should tell the whole story.
- **Highlight the key phrase** in each paragraph with `<strong>`, so the page can be skimmed.
- **Say "I" for what you did** and "we" only for real team work.
- **Tie every design choice to a reason**: research finding, constraint or goal. Show the decision, not just the screen.
- **Short sentences, plain words, no buzzwords.** Be honest about limits, such as "a concept, not a shipped product".

## Layout rules

- **Hero:** project name is the largest thing on the page, about `clamp(3.4rem, 13vw, 12.5rem)`, weight 800, tight tracking (`-.035em`), line height `.95`. The promise line stays under 26 characters wide per line (`max-width: 26ch`).
- **Chapters, wide screens (1100px and up):** two columns. Left is a sticky rail with a large outlined number and the chapter name. Right is the content. This keeps the reader oriented.
- **Chapters, small screens:** one column, with a compact inline label and a hairline after it.
- **Reading width:** body `58ch`, lead `44ch`, titles `24ch`. Images and grids may run wider.
- **Spacing:** one edge value for everything, such as `--edge: clamp(20px, 5vw, 84px)`. Chapter gap about `clamp(72px, 13vh, 150px)`.
- **Tone:** thin hairline borders and generous space. No heavy shadows or large rounded cards.

## Markup

```html
<div class="progress" id="progress" aria-hidden="true"></div>

<main id="top">
  <header class="hero">
    <p class="crumbs">
      <a href="index.html#work"><span aria-hidden="true">←</span> Projects</a>
      <span aria-hidden="true">/</span>
      <span>PROJECT</span>
    </p>
    <ul class="tags" aria-label="Project type">
      <li class="pill">Industry</li><li class="pill">Platform</li><li class="pill">Year</li>
    </ul>
    <h1 class="hero__name">PROJECT</h1>
    <p class="hero__tag">One sentence: the change this project made.</p>
    <dl class="facts">
      <div><dt>Role</dt><dd>...</dd></div>
      <div><dt>Timeline</dt><dd>...</dd></div>
      <div><dt>Platform</dt><dd>...</dd></div>
      <div><dt>Team</dt><dd>...</dd></div>
      <div class="wide"><dt>Responsibilities</dt><dd>...</dd></div>
    </dl>
  </header>

  <section class="chap chap--glance" aria-labelledby="t-glance">
    <p class="chapter"><span class="chapter__n">00</span> <span class="chapter__t" id="t-glance">At a glance</span></p>
    <dl class="glance">
      <div><dt>The challenge</dt><dd>...</dd></div>
      <div><dt>What I did</dt><dd>...</dd></div>
      <div><dt>What shipped</dt><dd>...</dd></div>
    </dl>
  </section>

  <section class="chap" aria-labelledby="t-challenge">
    <p class="chapter"><span class="chapter__n">01</span> <span class="chapter__t">Challenge</span></p>
    <h2 class="chap__title" id="t-challenge">A claim, not a label.</h2>
    <div class="prose">
      <p class="lead">The story of this chapter in one sentence.</p>
      <p>Supporting detail with a <strong>highlighted key phrase</strong>.</p>
    </div>
    <p class="pull"><span class="pull__label">The design brief, distilled</span>The brief in one or two lines.</p>
    <p class="note"><b>Small label</b>A short side remark.</p>
  </section>

  <!-- more chapters: same pattern -->

  <aside class="next" aria-label="Next project">
    <p class="next__label">Next up</p>
    <a class="next__link" href="next.html"><span class="next__title">NEXT PROJECT</span></a>
    <p class="next__story">One line on that project.</p>
  </aside>
</main>
```

## Core CSS

Swap the variables for the host project's tokens.

```css
:root {
  --edge: clamp(20px, 5vw, 84px);
  --hair: rgba(255, 255, 255, .14);   /* thin lines */
  --ink: #fff;                        /* main text */
  --ink-soft: rgba(255, 255, 255, .8);/* body text */
  --accent: #e2622e;
  --grid-gap: clamp(12px, 1.6vw, 24px);
}

.progress { position: fixed; top: 0; left: 0; z-index: 10; width: 100%; height: 2px;
  background: var(--accent); transform-origin: 0 50%; transform: scaleX(0); pointer-events: none; }

.hero { padding: clamp(110px, 17vh, 170px) var(--edge) 0; }
.tags { display: flex; flex-wrap: wrap; gap: 10px; margin: clamp(28px, 5vh, 48px) 0 0; padding: 0; list-style: none; }
.pill { padding: 7px 16px; border: 1px solid var(--accent); border-radius: 999px; font-size: .8rem; }
.hero__name { margin: 26px 0 0; font-size: clamp(3.4rem, 13vw, 12.5rem); font-weight: 800; letter-spacing: -.035em; line-height: .95; }
.hero__tag { margin: 28px 0 0; max-width: 26ch; text-wrap: balance; font-size: clamp(1.3rem, 2.8vw, 2.6rem); font-weight: 300; line-height: 1.25; }
.facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); margin: 6vh 0 0; border-top: 1px solid var(--hair); }
.facts > div { padding: 22px 24px 22px 0; }
.facts dt { font-size: .85rem; opacity: .6; }
.facts dd { margin: 6px 0 0; font-size: 1.05rem; line-height: 1.45; }

.chap { padding: clamp(72px, 13vh, 150px) var(--edge) 0; }
.chapter { display: flex; align-items: center; gap: 18px; margin: 0 0 28px; font-size: .85rem; opacity: .8; }
.chapter::after { content: ""; flex: 1; height: 1px; background: var(--hair); }
.chapter__n { font-size: 1.5rem; font-weight: 800; letter-spacing: -.02em; line-height: 1; font-variant-numeric: tabular-nums; }
.chap__title { max-width: 24ch; text-wrap: balance; margin: 0 0 clamp(28px, 5vh, 56px);
  font-size: clamp(2rem, 4.6vw, 4.4rem); font-weight: 600; letter-spacing: -.025em; line-height: 1.12; }

@media (min-width: 1100px) {
  .chap { display: grid; grid-template-columns: minmax(150px, 200px) minmax(0, 1fr); column-gap: clamp(32px, 4vw, 72px); }
  .chap > .chapter { grid-column: 1; grid-row: 1 / span 80; align-self: start; position: sticky; top: 96px; display: block; margin: 0; }
  .chap > .chapter::after { display: none; }
  .chap > :not(.chapter) { grid-column: 2; }
  .chapter__n { display: block; font-size: clamp(3.6rem, 6.4vw, 6.6rem); letter-spacing: -.05em;
    color: transparent; -webkit-text-stroke: 1px var(--ink-soft); }
  .chapter__t { display: block; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--hair); font-size: .95rem; opacity: .75; }
}

.prose p { max-width: 58ch; color: var(--ink-soft); line-height: 1.72; }
.prose p.lead { max-width: 44ch; margin-bottom: 1em; color: var(--ink);
  font-size: clamp(1.3rem, 2.1vw, 1.85rem); font-weight: 300; line-height: 1.4; letter-spacing: -.01em; }
.prose strong { color: var(--ink); font-weight: 500;
  background: linear-gradient(transparent 64%, color-mix(in srgb, var(--accent) 30%, transparent) 64%);
  -webkit-box-decoration-break: clone; box-decoration-break: clone; }

.glance { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--grid-gap); margin: 0; }
.glance dt { font-size: .85rem; opacity: .65; }
.glance dd { margin: 10px 0 0; max-width: 34ch; font-size: clamp(1.05rem, 1.4vw, 1.25rem); line-height: 1.5; }

.pull { max-width: 30ch; margin: clamp(40px, 8vh, 80px) 0 0; padding-left: 20px; border-left: 2px solid var(--accent);
  font-size: clamp(1.4rem, 2.6vw, 2.4rem); line-height: 1.3; }
.pull__label { display: block; margin-bottom: 12px; font-size: .85rem; opacity: .65; }
.note { max-width: 62ch; margin-top: 36px; padding-left: 16px; border-left: 1px solid var(--accent); color: var(--ink-soft); line-height: 1.6; }
.note b { display: block; margin-bottom: 6px; font-size: .85rem; font-weight: 500; opacity: .7; }

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--grid-gap); margin-top: 28px; }
.card { padding: clamp(18px, 2.2vw, 30px); border: 1px solid var(--hair); }

.next { margin-top: clamp(80px, 15vh, 170px); padding: clamp(40px, 8vh, 90px) var(--edge); border-top: 1px solid var(--hair); }
.next__label { font-size: .85rem; opacity: .7; }
.next__link { display: block; width: fit-content; margin-top: 18px; color: inherit; text-decoration: none; }
.next__title { font-size: clamp(2.6rem, 8vw, 8rem); font-weight: 800; letter-spacing: -.03em; line-height: 1; transition: color .3s ease; }
.next__link:is(:hover, :focus-visible) .next__title { color: var(--accent); }
```

## Progress line script

```js
const bar = document.getElementById("progress");
let ticking = false;
const update = () => {
  ticking = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
};
const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
addEventListener("scroll", request, { passive: true });
addEventListener("resize", request);
update();
```

## Components worth adding

Add only when the project's content calls for them. The page must still read fully if a script fails.

- **Journeys:** two or three flows in the Final experience chapter, stacked one after another (no tabs). Each starts with a "Journey N — Name" label and its own heading.
- **Big number line:** one huge fact, such as "8 competitors. 0 of them solved trust." Count up on scroll, and keep the real number in the HTML for screen readers.
- **Evidence visuals:** small charts drawn in CSS or SVG from real data, each with a `figcaption`.
- **Click-to-copy colour swatches** in the design system chapter.
- **Working mini demos** of key components (a toggle, a stepper), so the system is felt, not just shown.
- **Soft reveal on scroll:** fade and slight blur, once only, using `IntersectionObserver`. Hide content only after a script confirms it can reveal it.

## Quality checks

- Every image has real `alt` text, `loading="lazy"` below the fold, and `width` and `height` set.
- One `h1`. Headings go in order.
- Unique `<title>` and meta description. Example: `PROJECT — Topic UX Case Study | Name`.
- Mobile first: no sideways scroll at 375px. Wide images scroll inside their own box.
- `prefers-reduced-motion` shows everything without animation.
- Works in both light and dark if the host site has both. White logos need a dark backing in light mode.
- Press feedback on links and buttons. Hover-only hints also appear on touch.
- Keyboard focus is visible.
- Nothing claimed on the page is invented.
