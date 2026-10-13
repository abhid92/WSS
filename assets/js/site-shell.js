(() => {
  'use strict';

  const pages = [
    ['index', 'Home', 'index.html'],
    ['about', 'About', 'about.html'],
    ['experience', 'Experience', 'experience.html'],
    ['venue', 'Venue', 'venue.html'],
    ['partners', 'Partners', 'partners.html']
  ];
  const page = document.body.dataset.page || 'index';
  const current = pages.find(([id]) => id === page) || ['register', 'Register', 'register.html'];
  const headerHost = document.querySelector('[data-site-header]');
  const footerHost = document.querySelector('[data-site-footer]');
  const overlaysHost = document.querySelector('[data-site-overlays]');

  if (headerHost) {
    const brand = page === 'index'
      ? '<a class="brand-lockup" href="./index.html" aria-label="World Spirituality Summit — Shanti Manthan"><span class="lockup-symbol"><img src="./assets/images/logo-final.png" alt="" width="1536" height="1024"></span><span class="lockup-wordmark"><img src="./assets/images/logo-final.png" alt="" width="1536" height="1024"></span></a>'
      : '<a class="brand pd-brand-original" href="./index.html" aria-label="World Spirituality Summit — Shanti Manthan"><img src="./assets/images/logo-final.png" alt="World Spirituality Summit — Shanti Manthan" width="1536" height="1024"></a>';
    const links = pages.map(([id, label, href]) =>
      `<a href="./${href}"${id === page ? ' aria-current="page"' : ''}>${label}</a>`
    ).join('');

    headerHost.outerHTML = `
      <a class="skip" href="#main">Skip to content</a>
      <header class="site-header">
        ${brand}
        <nav id="navigation" aria-label="Main navigation">
          ${links}
          <a hidden data-launch-hidden="true" href="./schedule.html">Schedule</a>
          <a hidden data-launch-hidden="true" href="./speakers.html">Speakers</a>
          <a hidden data-launch-hidden="true" href="./tickets.html">Tickets</a>
          <a hidden data-launch-hidden="true" href="./media.html">Media</a>
        </nav>
        <a class="button header-cta" href="./register.html">Register</a>
        <button class="menu-toggle" aria-controls="navigation" aria-expanded="false" aria-label="Open navigation">☰</button>
      </header>
      ${page === 'index' ? '' : `<nav class="site-breadcrumb pd-wrap" aria-label="Breadcrumb"><a href="./index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">${current[1] === 'About' ? 'About WSS' : current[1]}</span></nav>`}
    `.trim();
  }

  if (footerHost) {
    footerHost.outerHTML = `
      <footer id="site-footer" class="pd-footer">
        <div class="pd-wrap pd-footer-top">
          <div>
            <a class="brand pd-brand-original" href="./index.html" aria-label="World Spirituality Summit — Shanti Manthan"><img src="./assets/images/logo-final.png" alt="World Spirituality Summit — Shanti Manthan" width="1536" height="1024"></a>
            <p>Spiritual wisdom.<br>Collective peace.</p>
          </div>
          <div>
            <p class="pd-label">WORLD SPIRITUALITY SUMMIT 2026</p>
            <strong>16 &amp; 17 December 2026</strong>
            <p>Bharat Mandapam, New Delhi</p>
            <a href="./register.html">Register ↗</a>
          </div>
          <div class="pd-footer-contact">
            <p class="pd-label">GET IN TOUCH</p>
            <a href="mailto:info@worldspiritualitysummit.com">info@worldspiritualitysummit.com</a>
            <a href="https://wa.me/917982692805">WhatsApp: +91 7982692805</a>
          </div>
          <nav aria-label="Footer navigation">
            <a href="./about.html">About WSS</a>
            <a href="./experience.html">Experiences</a>
            <a href="./partners.html">Partnerships</a>
            <a href="./venue.html">Plan your visit</a>
            <a hidden data-launch-hidden="true" href="./schedule.html">Schedule</a>
            <a hidden data-launch-hidden="true" href="./speakers.html">Speakers</a>
            <a hidden data-launch-hidden="true" href="./tickets.html">Tickets</a>
            <a hidden data-launch-hidden="true" href="./media.html">Media</a>
          </nav>
        </div>
        <div class="pd-wrap pd-footer-bottom">
          <span>© 2026 Times Internet Limited</span>
          <span>Visuals are illustrative · <a href="#page-top" class="ev-back-top">Back to top ↑</a></span>
          <span><button class="text-button" data-policy="Privacy Policy">Privacy</button> / <button class="text-button" data-policy="Terms">Terms</button></span>
        </div>
      </footer>
    `.trim();
  }

  if (overlaysHost) {
    overlaysHost.outerHTML = `
      <button id="theme-open" class="theme-open" aria-haspopup="dialog" aria-label="Review Color Themes">◐ <span>Review Color Themes</span></button>
      <dialog id="theme-dialog">
        <div class="dialog-head">
          <div><p class="eyebrow">BUSINESS REVIEW</p><h2>Choose a visual direction</h2></div>
          <button data-close aria-label="Close theme selector">×</button>
        </div>
        <p>Choose one of the three layouts and one of the three color palettes.</p>
        <fieldset class="design-options" aria-label="Choose a layout">
          <legend>Layout</legend>
          <button type="button" data-design="immersive" aria-pressed="true">Immersive<small>Landscape-led</small></button>
          <button type="button" data-design="luminous" aria-pressed="false">Luminous<small>Warm and open</small></button>
          <button type="button" data-design="editorial" aria-pressed="false">Editorial<small>Quiet and refined</small></button>
        </fieldset>
        <p class="palette-label">Color palette</p>
        <div id="theme-options"></div>
        <p class="theme-guidance">Each layout can be previewed with any palette.</p>
        <div class="dialog-actions"><button id="copy-theme" class="button">Copy Review Link</button><button id="reset-theme" class="button secondary">Reset to Reference</button></div>
        <p id="theme-status" role="status"></p>
      </dialog>
      <dialog id="policy-dialog">
        <div class="dialog-head"><h2 id="policy-title"></h2><button data-close aria-label="Close">×</button></div>
        <p>Publication pending. This approval preview does not accept payments or submit enquiries until the live services are configured.</p>
      </dialog>
    `.trim();
  }
})();
