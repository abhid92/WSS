document.querySelectorAll('dialog').forEach(d=>{
  d.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>d.close());
  d.addEventListener('click',e=>{
    if(e.target===d){
      const r=d.getBoundingClientRect();
      if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()
    }
  }
  )
}
);
document.querySelectorAll('[data-policy]').forEach(b=>b.onclick=()=>{
  document.getElementById('policy-title').textContent=b.dataset.policy;
  document.getElementById('policy-dialog').showModal()
}
);
document.querySelectorAll('[data-sponsor]').forEach(b=>b.onclick=()=>{
  const d=document.getElementById('sponsor-dialog');
  d.querySelector('[name="interested-tier"]').value=b.dataset.sponsor;
  d.showModal()
}
);
document.querySelectorAll('[data-pending]').forEach(b=>b.onclick=()=>{
  b.parentElement.nextElementSibling.textContent=b.dataset.pending
}
);
document.querySelectorAll('.enquiry-form').forEach(form=>form.addEventListener('submit',async e=>{
  e.preventDefault();
  const status=form.querySelector('[role=status]');
  if(form.action.includes('REPLACE_WITH')){
    status.textContent='Preview only. Your enquiry has not been sent. The form endpoint must be connected before launch.';
    return
  }
  const button=form.querySelector('[type=submit]');
  button.disabled=true;
  try{
    const response=await fetch(form.action,{
      method:'POST',body:new FormData(form),headers:{
        Accept:'application/json'
      }
    }
    );
    if(!response.ok)throw new Error();
    status.textContent='Thank you. Your enquiry has been sent.';
    form.reset()
  }
  catch(error){
    status.textContent='Your enquiry could not be sent. Please try again.'
  }
  finally{
    button.disabled=false
  }
}
));
