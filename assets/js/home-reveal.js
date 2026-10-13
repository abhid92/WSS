(() => {
  const home = document.querySelector('body[data-page="index"]');
  if (!home || !('IntersectionObserver' in window)) return;

  const targets = [
    home.querySelector('.voices-copy'),
    home.querySelector('.summit-voices>img'),
    ...home.querySelectorAll('.summit-experience'),
    home.querySelector('.journey-intro'),
    ...home.querySelectorAll('.journey-chapter')
  ].filter(Boolean);

  targets.forEach((element, index) => {
    element.classList.add('home-reveal');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });

  targets.forEach(element => {
    if (element.getBoundingClientRect().top < innerHeight) element.classList.add('is-visible');
    else observer.observe(element);
  });
  home.classList.add('home-reveal-ready');
})();
