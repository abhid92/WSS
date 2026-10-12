(() => {
 const up = document.querySelector('.ux-up');
 let scheduled = false;
 function updateUpButton() {
  scheduled = false;
  const shown = scrollY > 150;
  up?.classList.toggle('is-shown', shown);
  if (up) {
   up.tabIndex = shown ? 0 : -1;
   up.setAttribute('aria-hidden', String(!shown));
  }
 }
 addEventListener('scroll', () => {
  if (!scheduled) {
   scheduled = true;
   requestAnimationFrame(updateUpButton);
  }
 }, { passive: true });
 updateUpButton();

 const tabs = [...document.querySelectorAll('[data-experience-group][role="tab"]')];
 const items = [...document.querySelectorAll('.ux-experience-item[data-experience-group]')];
 const panel = document.getElementById('experience-list');
 if (!tabs.length || !items.length || !panel) return;
 const names = new Set(['all', 'dialogue', 'living', 'culture']);
 function choose(name, focusTab) {
  const selected = tabs.find(tab => tab.dataset.experienceGroup === name) || tabs[0];
  tabs.forEach(tab => {
   const active = tab === selected;
   tab.setAttribute('aria-selected', String(active));
   tab.tabIndex = active ? 0 : -1;
  });
  const group = selected.dataset.experienceGroup;
  panel.setAttribute('aria-labelledby', selected.id);
  items.forEach(item => { item.hidden = group !== 'all' && item.dataset.experienceGroup !== group; });
  if (focusTab) selected.focus();
 }
 tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => choose(tab.dataset.experienceGroup));
  tab.addEventListener('keydown', event => {
   let next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (index + 1) % tabs.length
    : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? (index + tabs.length - 1) % tabs.length
    : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
   if (next >= 0) {
    event.preventDefault();
    choose(tabs[next].dataset.experienceGroup, true);
   }
  });
 });
 choose('all');
 const requestedGroup = location.hash.slice(1);
 if (names.has(requestedGroup) && requestedGroup !== 'all') choose(requestedGroup);
})();
