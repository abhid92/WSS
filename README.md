# World Spirituality Summit 2026

Ten standalone HTML pages. Pure CSS and vanilla JavaScript. No installation, build step, framework, or runtime dependency.

## Local preview

From this folder run `python3 -m http.server 8765 --bind 127.0.0.1` and open http://127.0.0.1:8765/.

## Theme approval

Use Review Color Themes on any page. Selection applies immediately and persists across pages. Copy Review Link includes the selected theme while preserving zone parameters and anchors. A localhost review link works only on the machine serving the preview; share the folder or host it on GitHub Pages for remote reviewers.

Themes: midnight-gold, forest-champagne, burgundy-sandstone, indigo-lavender, teal-copper.

Set `reviewEnabled:false` and the approved `defaultTheme` in assets/js/theme.js after approval.

## GitHub Pages

Upload the contents of this folder to the desired GitHub repository root. Configure Pages to serve that branch at / (root). No build workflow is needed. Relative links support a project subdirectory. Repository: https://github.com/abhid92/WSS

GitHub Pages preview: https://abhid92.github.io/WSS/

## Before launch

- Prices, convenience fee, availability counts and seating layout are demonstration values.
- Booking creates a demonstration confirmation only. No payment is charged, ticket emailed, or admission reserved. Payment controls use sample data.
- Enquiry forms do not send until their individual Formspree endpoints replace REPLACE_WITH_FORM_ID. Then AJAX handles success and errors.
- Speaker and artist participation is tentative. Portraits use initials.
- The venue hero is an artistic adaptation of the supplied image, not a verified photograph. The experience scenes are generated illustrations. The WSS text mark is used until an official logo is supplied.
- Contact addresses, social destinations, legal policies, press kit and downloadable agenda need confirmation or supplied content.
- Country selection includes a free-text Other option.
- Add-ons apply per delegate; a corporate table contains ten delegates. Confirm this charging rule before launch.
- Google Fonts and Google Maps require internet access.
- Seven new visual assets and their complete generation prompts are listed in IMAGE-PROMPTS.md. The older cosmic image remains in assets but is no longer used in the design.
- All event content follows the supplied brief. Logistics and participation have not been independently verified.

## Reference-led visual update

Forest & Champagne is the default theme. Five palettes remain available for approval. Live headings are separate from the venue image. The transparent chakra rotates slowly; page elements reveal on scroll. Pause motion is available on every page and persists across navigation. System reduced-motion preferences disable these effects.
