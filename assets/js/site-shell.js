(() => {
  'use strict';

  const pages = [
    ['index', 'Home', 'index.html'],
    ['about', 'About', 'about.html'],
    ['experience', 'Experience', 'experience.html'],
    ['venue', 'Venue', 'venue.html'],
    ['partners', 'Partner with us', 'partners.html']
  ];
  const footerBrands = [
    ['The Times of India', 'https://timesofindia.indiatimes.com/', 'toi-icon.png'],
    ['Navbharat Times', 'https://navbharattimes.indiatimes.com/', 'nbt-icon.png'],
    ['Vijay Karnataka', 'https://vijaykarnataka.com/', 'vijay-karnataka-icon.png'],
    ['Maharashtra Times', 'https://maharashtratimes.com/', 'maharashtra-times-icon.png'],
    ['Samayam Tamil', 'http://tamil.samayam.com/', 'samayam-tamil-icon.png'],
    ['Samayam Telugu', 'https://telugu.samayam.com/', 'samayam-telugu-icon.png'],
    ['Samayam Malayalam', 'https://malayalam.samayam.com/', 'samayam-malayalam-icon.png'],
    ['I Am Gujarat', 'https://www.iamgujarat.com/', 'iam-gujarat-icon.png'],
    ['Bhagavat', 'https://www.bhagavat.co.in/', 'bhagavat-icon.png'],
    ['Speaking Tree', 'https://timesofindia.indiatimes.com/speaking-tree', 'speaking-tree-logo.png']
  ];
  const page = document.body.dataset.page || 'index';
  const current = pages.find(([id]) => id === page) || ['register', 'Register', 'register.html'];
  const headerHost = document.querySelector('[data-site-header]');
  const footerHost = document.querySelector('[data-site-footer]');
  const overlaysHost = document.querySelector('[data-site-overlays]');
  const whatsappIcon = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 2.5a13.5 13.5 0 0 0-11.7 20.2L2.5 29.5l7-1.8A13.5 13.5 0 1 0 16 2.5Zm0 24.5a11 11 0 0 1-5.6-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4A11 11 0 1 1 16 27Zm6-8.3c-.3-.1-1.9-.9-2.2-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7.1a9 9 0 0 1-2.7-1.7 10 10 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.5-.4-.5-.7-.5h-.6c-.3 0-.6.1-.9.4s-1.2 1.2-1.2 2.9 1.2 3.3 1.4 3.5c.2.3 2.4 3.8 5.9 5.1 2.9 1.1 3.5.9 4.1.8.7-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5s-.3-.3-.6-.4Z"/></svg>';

  if (headerHost) {
    const brand = '<a class="brand-lockup" href="./index.html" aria-label="World Spirituality Summit — Shanti Manthan"><span class="lockup-symbol"><img src="./assets/images/logo-final.png" alt="" width="1536" height="1024"></span><span class="lockup-wordmark"><img src="./assets/images/logo-final.png" alt="" width="1536" height="1024"></span></a>';
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
            <p>People. Purpose. Planet.</p>
          </div>
          <div>
            <p class="pd-label">WORLD SPIRITUALITY SUMMIT 2026</p>
            <strong>16–17 December 2026</strong>
            <p>Bharat Mandapam, New Delhi</p>
            <a href="./register.html">Register ↗</a>
          </div>
          <div class="pd-footer-contact">
            <p class="pd-label">GET IN TOUCH</p>
            <a href="mailto:info@worldspiritualitysummit.com">info@worldspiritualitysummit.com</a>
            <a class="pd-whatsapp-contact" href="https://wa.me/917982692805" aria-label="WhatsApp +91 7982692805">${whatsappIcon}<span>+91 7982692805</span></a>
          </div>
          <nav aria-label="Footer navigation">
            <a href="./about.html">About WSS</a>
            <a href="./experience.html">Experiences</a>
            <a href="./partners.html">Partner with us</a>
            <a href="./venue.html">Plan your visit</a>
            <a hidden data-launch-hidden="true" href="./schedule.html">Schedule</a>
            <a hidden data-launch-hidden="true" href="./speakers.html">Speakers</a>
            <a hidden data-launch-hidden="true" href="./tickets.html">Tickets</a>
            <a hidden data-launch-hidden="true" href="./media.html">Media</a>
          </nav>
        </div>
        <div class="pd-wrap pd-footer-presenter">
          <p class="pd-label">PRESENTED BY</p>
          <a href="https://timesinternet.in/" target="_blank" rel="noopener noreferrer" aria-label="Times Internet (opens in a new tab)"><img src="./assets/images/footer-brands/times-internet-logo.png" alt="Times Internet" width="4647" height="1341" loading="lazy"></a>
        </div>
        <div class="pd-wrap pd-footer-brands">
          <p class="pd-label">OUR BRANDS</p>
          <div class="pd-footer-brand-grid">
            ${footerBrands.map(([name, href, image]) => `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${name} (opens in a new tab)"><img src="./assets/images/footer-brands/${image}" alt="" loading="lazy"><span>${name}</span></a>`).join('')}
          </div>
        </div>
        <div class="pd-wrap pd-footer-bottom">
          <span>© 2026 Times Internet Limited</span>
          <span>Visuals are illustrative</span>
          <span><button class="text-button" data-policy="Privacy Policy">Privacy</button> / <button class="text-button" data-policy="Terms">Terms</button></span>
        </div>
      </footer>
    `.trim();
  }

  document.body.insertAdjacentHTML('beforeend', `<a class="floating-whatsapp" href="https://wa.me/917982692805" target="_blank" rel="noopener noreferrer" aria-label="Contact World Spirituality Summit on WhatsApp">${whatsappIcon}</a>`);

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
