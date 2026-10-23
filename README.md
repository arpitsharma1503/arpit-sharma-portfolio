# Arpit Sharma — portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Open it
Double-click `index.html`, or upload the whole folder to any static host
(Netlify, Vercel, GitHub Pages, your own server). `index.html` is the home page.

## Files
- `index.html`      Home page (hero, scroll story, projects, contact)
- `groupbima.html`  GroupBima case study
- `cardinal.html`   Cardinal case study
- `assets/`         Your images, plus shared files used by the pages:
                    `case-study.css` / `case-study.js` (case-study layout, tabs,
                    count-up numbers, click-to-copy colours, demos and the
                    content visuals) and `music.js`

Sliderequest and Supply Management System are marked NDA, so they have no page.

## Background music (Vatapi Ganapatim, flute)
The player is built in and already wired into all three pages. It needs one file:

    assets/vatapi-ganapatim.mp3

Until that file exists, no music button is shown. Once it is there, a small
speaker button appears at the top right of every page:
- The music starts softly on the visitor's first click, tap or key press
  (browsers block sound before that), and loops quietly in the background.
- The button switches it off or on. The choice is remembered on every page and
  on the next visit, and it carries on from the same spot between pages.
- It pauses when the tab is hidden and resumes when the visitor comes back.

Tips for the audio file: MP3, about 2-4 MB (128 kbps is plenty), and a version
that loops cleanly. Make sure you have the right to use the recording: the
composition is by Muthuswami Dikshitar (1775-1835), but each recording is
separately copyrighted by its performer or label. Use your own recording, a
licensed one, or one whose licence allows web use (and credit it if required).

To tweak it, edit the settings at the top of `assets/music.js`:
`VOLUME` (0-1), `AUTOSTART` (set to false so it only plays from the button).
To remove music entirely, delete the `<script src="assets/music.js">` line at
the bottom of each page.

## Visuals on the case-study pages
The illustrations, charts and diagrams are drawn in code (inline SVG / CSS) from
each project's own content, so they need no image files: the competitor rings, daily-user bars, policy-card anatomy, 100-dot charts, the
5-seconds-vs-5-minutes bar, the onboarding icons and the walking-distance radar.
They are stand-ins that illustrate the story. Your real screens and illustrations
still go in the dashed placeholder boxes below.

## Night sky on the project pages
On GroupBima and Cardinal there is a dim full moon that drifts down the sky as you
read, the Big Dipper and Cassiopeia in the empty left margin (shown only while a
chapter is on screen), and a rare shooting star on top of the starfield. It is all
drawn in code, sits behind the content, ignores the mouse, and the moon is dimmed to
a measured level so body text stays above the 4.5:1 contrast minimum. With reduced
motion it is a still sky. To adjust it, see section 9 of `assets/case-study.css`
(moon opacity, size, position) and `initNightSky` in `assets/case-study.js`.

## Images
Cardinal's images are in `assets/images/cardinal/` (WebP, 0.5 MB in total):
- `onboarding.webp`, `home.webp`, `nearby.webp`: the three journey photos (Final experience)
- `screen1.webp` to `screen12.webp`: the screens row (splash, four onboarding slides, Add New Card,
  My Wallet, the wallet swipe actions, Home, Nearby, offer detail, expanded map)

Every screen sits in a frame as tall as the tallest one, and shorter screens are extended at the bottom
with their own edge colour (set inline as `--screen-bg`), so the row lines up and nothing is cropped.
To add or swap a screen, add a `<figure class="screen" style="--screen-bg:#hex">` with an `<img>`
(with `width`, `height` and descriptive `alt`) inside the `.rail` in `cardinal.html`.

GroupBima's images are in `assets/images/groupbima/` (WebP):
- `groupbima_onboarding.webp`, `groupbima_discovery.webp`, `groupbima_trust.webp`: the three journey photos.
  Each sits in a 4:5 portrait frame (the taller Trust photo is cropped evenly top and bottom).
- `5_direction.webp` (the five logo directions) and `elephant_mark.webp` (the final mark): lossless WebP,
  so the fine line work stays crisp. Both have opaque backgrounds (white and brand cream).

## Still to add (search each file for `TODO`)
- groupbima.html: nothing, every image slot is filled
- cardinal.html:  =cardinal wordmark, onboarding illustrations

To replace a placeholder, put your image in `assets/images/` and swap the placeholder `<div class="ph ...">`
for, for example:

    <figure class="shot"><img src="assets/images/groupbima/onboarding.webp" width="1536" height="1024"
      loading="lazy" decoding="async" alt="Describe what the image shows"></figure>

Note: the page fonts (Outfit, Pacifico, Lexend) load from Google Fonts, so they
need an internet connection to display as designed.
