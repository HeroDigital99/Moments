/* ===== Flowing-colour text (wraps existing text nodes, so translations keep working) ===== */
(()=>{
  const WRAP='.btn:not(#lang),nav a,.detail-point,.product-card-link,.scr div';
  document.querySelectorAll(WRAP).forEach(el=>{
    const dark=el.matches('.btn.p,.scr div');
    const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),list=[];let n;
    while(n=w.nextNode()){if(n.nodeValue.trim()&&!n.parentNode.closest('svg,.fx'))list.push(n)}
    list.forEach(t=>{const s=document.createElement('span');s.className='fx-wrap'+(dark?' fx-dark-wrap':'');t.parentNode.insertBefore(s,t);s.appendChild(t)});
  });
  const SEL={h1:7,h2:9,h3:11,'.tag':8,'.fx-wrap':7,p:16,'.fact b':10,'.fact a':12,'.fact span':14,'footer a':14,'.footer-bottom span':18,'.tile-caption span':12,small:14,'.gallery-heading p':16};
  const targets=[];let i=0;
  Object.keys(SEL).forEach(sel=>document.querySelectorAll('main '+sel+',footer '+sel+',.brand '+sel+',header '+sel).forEach(el=>{
    if(el.classList.contains('fx')||el.closest('#lang,.fx,.wa-fab,video'))return;
    if(el.matches('.fx-wrap')&&el.classList.contains('fx-dark-wrap')){el.classList.add('fx','fx-dark')}
    else{el.classList.add('fx','fx-'+'abcd'[i%4]);if(el.matches('p,small,.footer-bottom span,.fact a,.fact span,footer a,.tile-caption span'))el.classList.add('fx-soft')}
    el.style.setProperty('--fx-dur',(SEL[sel]+(i%3))+'s');
    el.style.setProperty('--fx-delay',(-(i*1.7)%12).toFixed(1)+'s');
    el.style.setProperty('--fx-dir',i%2?'reverse':'normal');
    targets.push(el);i++;
  }));
  if('IntersectionObserver'in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('fx-on',e.isIntersecting)),{rootMargin:'80px'});
    targets.forEach(t=>io.observe(t));
  }else targets.forEach(t=>t.classList.add('fx-on'));
})();
