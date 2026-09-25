document.querySelectorAll('[data-tab-group]').forEach(group=>{
  const tabs=[...group.querySelectorAll(':scope > .tabs > [data-tab]')],panels=[...group.querySelectorAll(':scope > [data-tab-content]')];
  function activate(tab){
    tabs.forEach(t=>{
      const selected=t===tab;
      t.classList.toggle('active',selected);
      t.setAttribute('aria-selected',String(selected));
      t.tabIndex=selected?0:-1
    }
    );
    panels.forEach(p=>p.hidden=p.dataset.tabContent!==tab.dataset.tab)
  }
  tabs.forEach((tab,i)=>{
    tab.onclick=()=>activate(tab);
    tab.onkeydown=e=>{
      let next;
      if(e.key==='ArrowRight')next=(i+1)%tabs.length;
      if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;
      if(e.key==='Home')next=0;
      if(e.key==='End')next=tabs.length-1;
      if(next!==undefined){
        e.preventDefault();
        activate(tabs[next]);
        tabs[next].focus()
      }
    }
  }
  );
  if(group.dataset.tabGroup==='partners'&&location.hash==='#exhibitors')activate(tabs[1])
}
);
