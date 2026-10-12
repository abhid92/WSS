(() => {
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  let queued = false;
  function update() {
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
    queued = false;
  }
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, {passive:true});
  addEventListener('resize', update);
  update();
  const journeys = [
    ['meditation.jpg','Illustration of a shared meditation practice','PAUSE. BREATHE. BE PRESENT.','A quieter mind.\nA wider perspective.','Explore meditation and mindful practices, and make room for a deeper connection with yourself.'],
    ['dialogue.jpg','Illustration of a summit dialogue','IDEAS THAT OPEN NEW POSSIBILITIES.','Ancient wisdom.\nNew conversations.','Discover perspectives on spirituality, leadership and conscious living through dialogue and shared inquiry.'],
    ['music.jpg','Illustration of a spiritual music performance','EXPERIENCE A SHARED RHYTHM.','Many traditions.\nOne human connection.','Explore music, cultural expression and the experiences that bring people together.']
  ];
  const tabs = [...document.querySelectorAll('[data-journey]')];
  function select(index) {
    tabs.forEach((tab,i) => { tab.setAttribute('aria-selected',String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    const [image,alt,kicker,title,description] = journeys[index];
    const picture = document.getElementById('journey-image');
    picture.src = './assets/images/' + image; picture.alt = alt;
    document.getElementById('journey-kicker').textContent = kicker;
    document.getElementById('journey-title').textContent = title;
    document.getElementById('journey-title').style.whiteSpace = 'pre-line';
    document.getElementById('journey-description').textContent = description;
    document.getElementById('journey-panel').setAttribute('aria-labelledby', tabs[index].id);
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? (index+1)%tabs.length : event.key === 'ArrowLeft' ? (index+tabs.length-1)%tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : -1;
      if (next < 0) return;
      event.preventDefault(); select(next); tabs[next].focus();
    });
  });
})();

// One set of ad mounts, positioned alongside desktop content or between mobile groups.
(() => {
 if (!window.WSS_LAUNCH?.adsEnabled) return;
 const mobile = matchMedia('(max-width:1023px)');
 const main = document.querySelector('main');
 const units = [...document.querySelectorAll('.ad-mrec')];
 const slots = units.map(unit => {
   const home = document.createComment('Desktop ad position'); unit.before(home);
   const band = document.createElement('aside'); band.className='mobile-ad-band';
   band.setAttribute('aria-label',unit.getAttribute('aria-label'));
   return {unit,home,band};
 });
 function place() {
   slots.forEach(({unit,home,band})=>{home.after(unit);band.remove();});
   if (!mobile.matches) return;
   const sections=[...main.children].filter(e=>e.tagName==='SECTION');
   const sessions=[...main.querySelectorAll('.tab-panel:not([hidden]) .session')];
   const speakers=[...main.querySelectorAll('.speaker')];
   let anchors=sections.length>=3?sections.slice(0,3):sections.slice(0,1);
   const items=sessions.length?sessions:speakers;
   if(items.length>=6) anchors=[sections[0],items[Math.floor(items.length/3)-1],items[Math.floor(items.length*2/3)-1]];
   slots.forEach(({unit,home,band},i)=>{
     if (anchors[i]) { anchors[i].after(band); band.append(unit); }
     else { home.after(band); band.append(unit); }
   });
 }
 mobile.addEventListener('change',place);
 document.querySelectorAll('[role=tab]').forEach(tab=>tab.addEventListener('click',()=>requestAnimationFrame(place)));
 document.querySelectorAll('[role=tab]').forEach(tab=>tab.addEventListener('keydown',()=>requestAnimationFrame(place)));
 place();
})();
