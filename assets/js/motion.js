/* Motion is decorative and never required to read or operate the website. */
(() => {
  'use strict';
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const controls = [...document.querySelectorAll('.motion-control')];
  let paused = false;
  try { paused = localStorage.getItem('wss-motion-paused') === 'true'; } catch (_) {}

  function updateMotion() {
    const reduced = preference.matches;
    const enabled = !paused && !reduced;
    root.dataset.motion = enabled ? 'on' : 'off';
    controls.forEach(button => {
      button.textContent = reduced ? 'Reduced motion' : enabled ? 'Pause motion' : 'Resume motion';
      button.setAttribute('aria-pressed', String(!enabled));
      button.disabled = reduced;
    });
  }
  controls.forEach(button => button.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('wss-motion-paused', String(paused)); } catch (_) {}
    updateMotion();
  }));
  preference.addEventListener('change', updateMotion);
  updateMotion();
  document.addEventListener('visibilitychange', () => {
    root.dataset.pageHidden = String(document.hidden);
  });

  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px 35px 0px' });

  document.querySelectorAll('.section-heading, .image-card, .experience-row, .editorial-banner, .summit-collage, .speaker, .session').forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 55}ms`);
    if (element.getBoundingClientRect().top < innerHeight) element.classList.add('is-visible');
    observer.observe(element);
  });
})();
