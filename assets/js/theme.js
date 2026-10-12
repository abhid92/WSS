(() => {
  'use strict';
  const themes=[['navy-gold-ivory','Navy Gold and Ivory','#081D33','#A9691E','#FAF7F0','Grand, event-led navy with ivory and champagne.'],['beige-gold','Beige and Gold','#392F25','#AD813F','#F5EEE1','Warm cream, sand and restrained antique gold.'],['corporate-premium','Corporate Premium','#172B3D','#B49B70','#FBFAF7','Recommended: light surfaces, navy and fine gold detailing.']];
  const config={
    reviewEnabled:true,defaultTheme:'corporate-premium'
  }
  ;
  const valid=id=>themes.some(t=>t[0]===id);
  let saved;
  try{
    saved=localStorage.getItem('wss-theme')
  }
  catch(e){
  }
  const requested=new URLSearchParams(location.search).get('theme');
  let current=requested!==null?(valid(requested)?requested:config.defaultTheme):(valid(saved)?saved:config.defaultTheme);
  if(!config.reviewEnabled)current=config.defaultTheme;
  document.documentElement.dataset.theme=current;
  function persist(){
    try{
      localStorage.setItem('wss-theme',current)
    }
    catch(e){
    }
  }
  persist();
  document.addEventListener('DOMContentLoaded',()=>{
    const dialog=document.getElementById('theme-dialog'), opener=document.getElementById('theme-open'),options=document.getElementById('theme-options'),status=document.getElementById('theme-status');
    if(!config.reviewEnabled){
      opener.hidden=true;
      return
    }
    function render(){
      options.innerHTML=themes.map((t,i)=>`<button class="theme-option" data-theme-id="${t[0]}" aria-pressed="${t[0]===current}"><span class="swatches" aria-hidden="true">${t.slice(2,5).map(c=>`<i style="background:${c}"></i>`).join('')}</span><span><strong>0${i+1}. ${t[1]}</strong><small>${t[5]}</small></span>${t[0]===current?'<span class="selected-label">Selected</span>':''}</button>`).join('')
    }
    function apply(id){
      current=id;
      document.documentElement.dataset.theme=id;
      document.dispatchEvent(new CustomEvent('wss:themechange'));
      persist();
      const url=new URL(location.href);
      url.searchParams.set('theme',id);
      history.replaceState(null,'',url);
      render();
      status.textContent=themes.find(t=>t[0]===id)[1]+' selected.';
      options.querySelector(`[data-theme-id="${id}"]`).focus()
    }
    render();
    opener.addEventListener('click',()=>dialog.showModal());
    options.addEventListener('click',e=>{
      const b=e.target.closest('[data-theme-id]');
      if(b)apply(b.dataset.themeId)
    }
    );
    document.getElementById('reset-theme').onclick=()=>apply(config.defaultTheme);
    document.getElementById('copy-theme').onclick=async()=>{
      const url=new URL(location.href);
      url.searchParams.set('theme',current);
      try{
        await navigator.clipboard.writeText(url.href);
        status.textContent='Review link copied.'
      }
      catch(e){
        status.textContent='Copy this review link: '+url.href
      }
    }
    ;
    document.addEventListener('click',e=>{
      const a=e.target.closest('a[href]');
      if(!a)return;
      const url=new URL(a.href);
      if(url.origin===location.origin&&url.pathname.endsWith('.html')){
        url.searchParams.set('theme',current);
        a.href=url.href
      }
    }
    );
  }
  );
}
)();
