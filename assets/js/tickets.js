const WSS_TIERS=[["general", "General", 3000, ["Access to main convention hall sessions", "Soul Bazaar and Satvik Food Trail", "Cultural Evenings (both nights)", "Seating: General zone (rows 41-60)"]], ["silver", "Silver", 8000, ["Everything in General", "Interactive Workshop access", "Healer\u2019s Circle sessions", "Seating: Silver zone (rows 26-40)"]], ["gold", "Gold", 15000, ["Everything in Silver", "Reserved seating allocation", "Conscious Business Forum access", "Meet and Greet access with Gurus", "Seating: Gold zone (rows 11-25)"]], ["platinum", "Platinum", 25000, ["Everything in Gold", "Front rows (rows 1-10)", "VIP lounge access", "Priority Meet and Greet", "Official event kit", "Seating: Platinum zone"]], ["corporate", "Corporate Table", 150000, ["10 Gold delegate passes", "Reserved table block", "Branding visibility in convention hall", "Pre-event dinner invitation", "Dedicated relationship manager"]]];
(() => {
  if(!document.querySelector('[data-step]'))return;
  const money=n=>'Rs. '+n.toLocaleString('en-IN');
  const quantity=document.getElementById('quantity');
  const form=document.getElementById('registration');
  let order;
  function getOrder(){
    const id=document.querySelector('[name=tier]:checked').value;
    const tier=WSS_TIERS.find(t=>t[0]===id);
    const q=Number(quantity.value);
    const delegates=q*(id==='corporate'?10:1);
    const addons=[];
    if(document.getElementById('addon-backstage').checked)addons.push(['Backstage Meet and Greet',5000*delegates]);
    if(document.getElementById('addon-dinner').checked)addons.push(['VIP Dinner Access Day 1',3500*delegates]);
    const subtotal=tier[2]*q+addons.reduce((n,a)=>n+a[1],0);
    return {
      tier,q,delegates,addons,subtotal,total:subtotal+99
    }
  }
  function update(){
    order=getOrder();
    document.getElementById('running-total').textContent=Number.isFinite(order.subtotal)&&order.q>=1?money(order.subtotal):'Select quantity';
  }
  const zone=new URLSearchParams(location.search).get('zone');
  if(WSS_TIERS.some(t=>t[0]===zone))document.querySelector(`[name=tier][value="${zone}"]`).checked=true;
  document.querySelectorAll('[name=tier],#quantity,#addon-backstage,#addon-dinner').forEach(el=>el.addEventListener('input',update));
  update();
  function step(n){
    document.querySelectorAll('[data-step]').forEach(el=>el.hidden=Number(el.dataset.step)!==n);
    document.querySelectorAll('.stepper li').forEach((li,i)=>{
      li.classList.toggle('active',i===n-1);
      if(i===n-1)li.setAttribute('aria-current','step');
      else li.removeAttribute('aria-current')
    }
    );
    const heading=document.querySelector(`[data-step="${n}"] h2`);
    heading.tabIndex=-1;
    heading.focus();
    heading.scrollIntoView({
      block:'start',behavior:'smooth'
    }
    )
  }
  document.getElementById('to-registration').onclick=()=>{
    if(!quantity.checkValidity()){
      document.getElementById('quantity-error').textContent='Enter a whole number from 1 to 10.';
      quantity.focus();
      return
    }
    document.getElementById('quantity-error').textContent='';
    update();
    step(2)
  }
  ;
  document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>step(Number(b.dataset.back)));
  const country=form.querySelector('[name=country]'),other=document.getElementById('other-country');
  country.onchange=()=>{
    const required=country.value==='Other';
    document.getElementById('other-country-field').hidden=!required;
    other.required=required;
    if(country.value!=='India')form.querySelector('[name=state]').value='Outside India'
  }
  ;
  function validate(){
    let first;
    form.querySelectorAll('.error').forEach(el=>el.textContent='');
    form.querySelectorAll('input,select,textarea').forEach(el=>{
      if(el.required&&el.type!=='radio'&&!el.value.trim()){
        el.setCustomValidity('Please complete this field.')
      }
      else el.setCustomValidity('');
      const valid=el.checkValidity();
      el.setAttribute('aria-invalid',String(!valid));
      if(!valid){
        first=first||el;
        const parent=el.closest('.field');
        if(parent&&parent.querySelector('.error'))parent.querySelector('.error').textContent=el.validationMessage
      }
    }
    );
    if(first){
      first.focus();
      return false
    }
    return true
  }
  function summary(target){
    target.replaceChildren();
    const heading=document.createElement('h3');
    heading.textContent='Your booking summary';
    target.append(heading);
    const rows=[[order.tier[1]+' × '+order.q,money(order.tier[2]*order.q)],['Delegates',String(order.delegates)],...order.addons.map(a=>[a[0],money(a[1])]),['Subtotal',money(order.subtotal)],['Convenience fee (demo)',money(99)],['Total',money(order.total)]];
    rows.forEach(([label,value],i)=>{
      const row=document.createElement('div');
      row.className='summary-line'+(i===rows.length-1?' summary-total':'');
      const a=document.createElement('span'),b=document.createElement('strong');
      a.textContent=label;
      b.textContent=value;
      row.append(a,b);
      target.append(row)
    }
    )
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!validate())return;
    update();
    summary(document.getElementById('order-summary'));
    document.querySelector('.payment-demo').textContent='Preview UPI Payment · '+money(order.total);
    step(3)
  }
  );
  document.querySelectorAll('.payment-demo').forEach(b=>b.onclick=()=>document.getElementById('payment-status').textContent='Payment preview only. Use Complete Booking (Demo) to see the confirmation.');
  document.getElementById('complete-booking').onclick=()=>{
    document.querySelectorAll('[data-step]').forEach(el=>el.hidden=true);
    document.querySelector('.stepper').hidden=true;
    const success=document.getElementById('booking-success');
    success.hidden=false;
    document.getElementById('booking-reference').textContent='Booking Reference: WSS2026-'+String(100000+Math.floor(Math.random()*900000));
    summary(document.getElementById('success-summary'));
    const calendar=new URL('https://calendar.google.com/calendar/render');
    calendar.search=new URLSearchParams({
      action:'TEMPLATE',text:'World Spirituality Summit 2026 - Shanti Manthan',dates:'20261216/20261218',location:'Bharat Mandapam, New Delhi',details:'Shanti Manthan - Chanting For Peace. Demonstration booking only; admission is not confirmed.'
    }
    );
    document.getElementById('calendar-link').href=calendar.href;
    document.getElementById('whatsapp-link').href='https://wa.me/?text='+encodeURIComponent('I am exploring World Spirituality Summit 2026 - Shanti Manthan at Bharat Mandapam, New Delhi on 16-17 Dec 2026! www.worldspiritualitysummit.com (Website booking preview; no reservation made.)');
    const heading=success.querySelector('h2');
    heading.tabIndex=-1;
    heading.focus();
    success.scrollIntoView({
      block:'start'
    }
    )
  }
  ;
  document.getElementById('download-ticket').onclick=()=>{
    document.getElementById('ticket-status').textContent='Demo only: no ticket has been issued or emailed to '+form.querySelector('[name=email]').value+'. Ticket delivery will be available when booking services are connected.'
  }
  ;
}
)();
