const WSS_ZONES=[["platinum", "Platinum", 25000, 40, "#C9A84C", "Rows 1-10 \u00b7 Approximately 200 seats"], ["gold", "Gold", 15000, 180, "#4A90D9", "Rows 11-25 \u00b7 Approximately 500 seats"], ["silver", "Silver", 8000, 420, "#7B68EE", "Rows 26-40 \u00b7 Approximately 800 seats"], ["general", "General", 3000, 1200, "#82C982", "Rows 41-60 \u00b7 Approximately 1500 seats"], ["corporate", "Corporate Tables", 150000, 6, "#E8845A", "10 tables of 10 \u00b7 Reserved block within Gold zone"]];
document.querySelectorAll('[data-zone]').forEach(el=>{
  const z=WSS_ZONES.find(z=>z[0]===el.dataset.zone);
  function select(){
    document.querySelectorAll('[data-zone]').forEach(n=>n.classList.toggle('selected',n===el));
    const info=document.getElementById('zone-info');
    info.innerHTML=`<p class="eyebrow">SELECTED ZONE</p><h2>${z[1]}</h2><p>${z[5]}</p><p><strong>Rs. ${z[2].toLocaleString('en-IN')}</strong> ${z[0]==='corporate'?'per table':'per seat'}</p><p>${z[3]} ${z[0]==='corporate'?'tables':'seats'} remaining (demo)</p><a class="button" href="./tickets.html?zone=${z[0]}">Book This Zone</a>`
  }
  el.addEventListener('click',select);
  el.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){
      e.preventDefault();
      select()
    }
  }
  );
  ['mouseenter','focus'].forEach(evt=>el.addEventListener(evt,()=>{
    document.getElementById('map-tooltip').textContent=`${z[1]} · Rs. ${z[2].toLocaleString('en-IN')} · ${z[3]} remaining (demo)`
  }
  ))
}
);
