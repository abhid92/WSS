/* Launch visibility and local-only form review. */
window.WSS_LAUNCH = { hiddenPages: ['schedule','speakers','tickets','media'], interestEndpoint: null, adsEnabled: false };
(() => {
 const page=location.pathname.split('/').pop().replace(/\.html$/,'');
 if(WSS_LAUNCH.hiddenPages.includes(page)){
  const destination=new URL(page==='tickets'?'./register.html':'./index.html',location.href);
  const theme=new URLSearchParams(location.search).get('theme');
  if(theme)destination.searchParams.set('theme',theme);
  location.replace(destination.href);
 }
 document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-interest-form]').forEach(form=>{
   const status=document.getElementById(form.dataset.interestForm==='partner'?'partner-interest-status':'interest-status');
   const submit=form.querySelector('button[type="submit"]');
   if(submit)submit.disabled=false;
   form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    if(status){
     status.textContent='Preview only. Your details have been checked in this browser but have not been sent or saved. The approved form service must be connected before launch.';
     status.tabIndex=-1;
     status.focus();
    }
   });
  });
 });
})();
