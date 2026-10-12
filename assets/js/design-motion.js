(() => {
 const root=document.querySelector('.pd');if(!root)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const observed=[...root.querySelectorAll('[data-enter]')];
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('entered');observer.unobserve(entry.target);}}),{threshold:.04});observed.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)el.classList.add('entered');observer.observe(el);});root.classList.add('motion-ready');}
 let scheduled=false;
 function update(){scheduled=false;if(preference.matches||document.documentElement.dataset.motion==='off')return;const hero=root.querySelector('.pd-hero');if(hero)hero.style.setProperty('--art-offset',Math.min(scrollY*.055,24)+'px');}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});
})();
