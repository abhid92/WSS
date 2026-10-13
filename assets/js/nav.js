const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const navigation=document.getElementById('navigation');
function scrollHeader(){
  header.classList.toggle('scrolled',scrollY>80)
}
addEventListener('scroll',scrollHeader,{
  passive:true
}
);
scrollHeader();
const file=location.pathname.split('/').pop()||'index.html';
navigation.querySelectorAll('a').forEach(a=>{
  if(a.getAttribute('href').endsWith(file))a.setAttribute('aria-current','page')
}
);
function closeMenu(){
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
  menu.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-label','Open navigation');
  menu.textContent='☰';
  document.body.style.overflow=''
}
menu.onclick=()=>{
  const open=navigation.classList.toggle('open');
  document.body.classList.toggle('menu-open',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  menu.textContent=open?'×':'☰';
  document.body.style.overflow=open?'hidden':''
}
;
navigation.addEventListener('click',e=>{
  if(e.target.closest('a'))closeMenu()
}
);
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeMenu()
  }
  if(e.key==='Tab'&&navigation.classList.contains('open')){
    const links=[...navigation.querySelectorAll('a')];
    if(!e.shiftKey&&document.activeElement===menu){
      e.preventDefault();
      links[0].focus()
    }
    if(e.shiftKey&&document.activeElement===links[0]){
      e.preventDefault();
      menu.focus()
    }
  }
}
);
matchMedia('(min-width:1024px)').addEventListener('change',e=>{
  if(e.matches)closeMenu()
}
);

// Place the expanded drawer below navigation, including the ATF space above it.
function updateAdNavigationOffset() {
  navigation.style.setProperty('--ad-nav-top', Math.max(0, header.getBoundingClientRect().bottom) + 'px');
}
menu.addEventListener('click', updateAdNavigationOffset);
addEventListener('resize', updateAdNavigationOffset, { passive: true });
