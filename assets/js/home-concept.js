(() => {
 if (!document.querySelector('.pd-home')) return;
 const designs=['immersive','luminous','editorial'];
 const controls=[...document.querySelectorAll('button[data-design]')];
 function applyDesign(id){if(!designs.includes(id))id='editorial';document.documentElement.dataset.design=id;try{localStorage.setItem('wss-design',id);}catch(_){}controls.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.design===id)));const url=new URL(location.href);url.searchParams.set('design',id);history.replaceState(null,'',url);}
 let saved;try{saved=localStorage.getItem('wss-design');}catch(_){}
 applyDesign(new URLSearchParams(location.search).get('design')||saved||document.documentElement.dataset.design);
 controls.forEach(button=>button.addEventListener('click',()=>applyDesign(button.dataset.design)));
 document.getElementById('reset-theme')?.addEventListener('click',()=>applyDesign('editorial'));
 const choices=[['summit-conversation.png','Illustrative spiritual leadership panel','Plenary sessions & conscious leadership','dialogue'],['bazaar-editorial.jpg','Illustrative conscious craft marketplace','Soul Bazaar & conscious living','living'],['music.jpg','Illustrative sacred music performance','Musical evenings & shared celebration','culture']];
 const tabs=[...document.querySelectorAll('[data-explore]')];
 function select(index){tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});const choice=choices[index];const panel=document.getElementById('pd-explore-panel');panel.setAttribute('aria-labelledby',tabs[index].id);panel.querySelector('img').src='./assets/images/'+choice[0];panel.querySelector('img').alt=choice[1];document.getElementById('pd-explore-title').textContent=choice[2];document.getElementById('pd-explore-link').href='./experience.html#'+choice[3];}
 tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>select(index));tab.addEventListener('keydown',event=>{const next=event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key==='Home'?0:event.key==='End'?tabs.length-1:-1;if(next>=0){event.preventDefault();select(next);tabs[next].focus();}});});
})();
