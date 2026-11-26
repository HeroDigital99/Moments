/* ===== WhatsApp floating button: opens a chat directly ===== */
(()=>{
  const NUM='966558400088';
  const MSG={ar:'مرحباً، أرغب بالاستفسار عن الشاشات الدعائية',en:'Hello, I would like to inquire about your advertising screens.'};
  try{if(typeof T!=='undefined')T['تواصل عبر واتساب']='Chat on WhatsApp'}catch(e){}
  const a=document.createElement('a');a.className='wa-fab';a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','تواصل عبر واتساب');
  a.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C9.4 3 4 8.38 4 15.02c0 2.12.55 4.18 1.6 6L4 29l8.17-1.57a12.03 12.03 0 0 0 3.87.63C22.67 28.06 28 22.67 28 16.03 28 9.38 22.67 3 16.04 3zm0 22.04c-1.22 0-2.42-.25-3.53-.73l-.5-.22-4.85.93.97-4.72-.27-.52a9.1 9.1 0 0 1-1.4-4.86c0-5 4.1-9.07 9.14-9.07 5.03 0 9.1 4.07 9.1 9.07 0 5-4.07 9.12-9.1 9.12h.44zm5-6.8c-.27-.14-1.62-.8-1.87-.89-.25-.09-.44-.14-.62.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.6.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.12-.25-.18-.52-.32z"/></svg><span class="wa-tip">تواصل عبر واتساب</span>';
  const url=()=>'https://wa.me/'+NUM+'?text='+encodeURIComponent(MSG[document.documentElement.lang==='en'?'en':'ar']);
  a.href=url();
  document.documentElement.addEventListener('langchange',()=>{a.href=url();const tip=a.querySelector('.wa-tip'),en=document.documentElement.lang==='en';tip.textContent=en?'Chat on WhatsApp':'تواصل عبر واتساب';a.setAttribute('aria-label',tip.textContent)});
  document.body.appendChild(a);
})();
