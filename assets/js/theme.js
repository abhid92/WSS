(() => {
  'use strict';
  const themes=[['midnight-gold','Midnight & Gold','#0B1340','#C9A84C','#F0D98A','Formal, premium summit identity.'],['forest-champagne','Forest & Champagne','#103D30','#D3B479','#F3E5BB','Nature, wellbeing, and conscious enterprise.'],['burgundy-sandstone','Burgundy & Sandstone','#59283E','#D7AD75','#F3DFC2','Warm, ceremonial, and culturally rooted.'],['indigo-lavender','Indigo & Lavender','#30275F','#C7B6EB','#E7DEF7','Contemplative, contemporary, and atmospheric.'],['teal-copper','Teal & Copper','#124951','#E0AA82','#F5DDCA','Contemporary global forum with warm accents.']];
  const config={
    reviewEnabled:true,defaultTheme:'forest-champagne'
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
