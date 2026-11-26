/* Moments Screens: lists, nav hint, language toggle, glass glow */
const $=s=>document.querySelector(s);
const fill=(s,h)=>{const e=$(s);if(e)e.innerHTML=h};
const ic=n=>'<div class="ico"><svg><use href="#'+n+'"/></svg></div>';
const P=[
  ["الشاشات الدعائية العمودية","v","product-vertical.html","https://drive.google.com/thumbnail?id=1xP1B84qpl3MLeSbOLJl-MwCYbljspZxd&sz=w1600"],
  ["الشاشات الدعائية المحمولة العمودية","v","product-portable.html","https://drive.google.com/thumbnail?id=1I-7pQ3YbeH5UpXai8QzvhYt5-FSRvz7U&sz=w1600"],
  ["شاشات الخرائط الدعائية الأفقية","h","product-horizontal.html","https://drive.google.com/thumbnail?id=1AigNx-e-MRBadhvr1wRiW17hj4z_cWmo&sz=w1600"],
  ["شاشات الحائط الدعائية العمودية والأفقية","w","product-wall.html","https://drive.google.com/thumbnail?id=1PGsoOxU8RAGXAJwi0vuO0B7qZgEiAoWR&sz=w1600"],
  ["شاشات المصاعد الدعائية العمودية والأفقية","v","product-elevator.html","https://momentsscreens.com/wp-content/uploads/2019/09/1.jpg"],
  ["الشاشات التفاعلية الدعائية الأفقية","h","product-interactive.html","https://momentsscreens.com/wp-content/uploads/2019/10/Screen-03-e1638560504725-01-scaled.jpg"],
  ["شاشات الحائط المتعددة العمودية والأفقية","w","product-video-wall.html","https://momentsscreens.com/wp-content/uploads/2019/10/Screen-07-e1638560398934.png"],
  ["شاشات الحائط المعلقة المزدوجة العمودية","v","product-double-sided.html","https://momentsscreens.com/wp-content/uploads/2019/11/Screen-09-e1638560337456.jpg"],
  ["الشاشات الدعائية العمودية الخارجية","v","product-outdoor.html","https://momentsscreens.com/wp-content/uploads/2024/07/3w.jpg"],
  ["الشاشات الدعائية الذكية","k","product-smart.html","https://drive.google.com/thumbnail?id=1wt34oh85Cv45_7H1Mv5JNT5za51Xnnj5&sz=w1600"],
  ["الشاشات الدعائية العرضية للطاولات","t","product-tabletop-horizontal.html","https://momentsscreens.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-06-12-at-8.13.58-PM-1.jpeg"],
  ["الشاشات الدعائية العمودية الكاملة","v","product-full-height.html","https://drive.google.com/thumbnail?id=13sDhlM5f_RLxfXxUCcn6XuahOkY4B0qb&sz=w1600"],
  ["الشاشات العمودية والعرضية للطاولات","t","product-tabletop.html","https://drive.google.com/thumbnail?id=1XtaAr4aVQZJpqI8r7Jy5JtDkHGkfXJBJ&sz=w1600"],
  ["شاشات الدفع الذاتي","h","product-self-checkout.html","https://momentsscreens.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-06-10-at-8.32.15-PM.jpeg"],
  ["شاشات إطار الصور الدعائية","h","product-photo-frame.html","https://momentsscreens.com/wp-content/uploads/2019/10/Screen-10-e1638560305136.png"]
];
const card=(p)=>'<a class="g card prod product-card" href="'+p[2]+'">'+(p[3]?'<span class="product-image"><img src="'+p[3]+'" alt="'+p[0]+'" loading="lazy" decoding="async"></span>':ic(p[1]))+'<h3>'+p[0]+'</h3><span class="product-card-link">التفاصيل والخيارات <b>←</b></span></a>';
fill('#best',[P[0],P[2],P[3]].map(card).join(''));
fill('#new',[P[11],P[9],P[12],P[10]].map(card).join(''));
fill('#all',P.map(card).join(''));
fill('#why',[["مصنع سعودي","k"],["منتجات حديثة وأنظمة تشغيل متطورة","w"],["أسعار منافسة","t"],["الجودة والضمان","k"],["التوصيل لجميع أنحاء المملكة","h"],["الدعم الفني","v"]].map(p=>'<div class="g card">'+ic(p[1])+'<h3 style="margin:0">'+p[0]+'</h3></div>').join(''));
fill('#svc',["خدمات توريد الشاشات الدعائية","خدمات إيجار الشاشات الدعائية","خدمات صيانة الشاشات الدعائية","خدمات ما بعد البيع والدعم الفني"].map((s,i)=>'<div class="g card">'+ic(["v","t","w","k"][i])+'<h3>'+s+'</h3></div>').join(''));
fill('#sec',["قطاع الجهات الحكومية","قطاع الجهات الخاصة","القطاع التعليمي","القطاع العقاري","القطاع الطبي","قطاع المقاهي والمطاعم","قطاع الفنادق والمنتجعات"].map(s=>'<div class="g card"><h3 style="margin:0">'+s+'</h3></div>').join(''));
fill('#gal',Array.from({length:6},(_, i)=>'<div class="g ph">صورة '+(i+1)+'</div>').join(''));

const nv=$('nav'),hn=$('.hint');
function chk(){const m=nv.scrollWidth-nv.clientWidth;hn.classList.toggle('off',m<=2||Math.abs(nv.scrollLeft)>=m-4)}
{const on=$('nav a.on');if(on)on.scrollIntoView({inline:'center',block:'nearest'})}
nv.addEventListener('scroll',chk,{passive:true});addEventListener('resize',chk);chk();
setTimeout(()=>{const m=nv.scrollWidth-nv.clientWidth;if(m>2&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const d=document.documentElement.dir==='rtl'?-1:1;nv.scrollBy({left:d*80,behavior:'smooth'});setTimeout(()=>nv.scrollBy({left:-d*80,behavior:'smooth'}),750)}},1000);
const IMG='assets/img/',LOGO_AR=IMG+'logo-ar-light.png',LOGO_EN=IMG+'logo-en-light.png';
const PAGES={about:'من نحن',services:'خدماتنا',products:'منتجاتنا',showroom:'أعمالنا',clients:'عملاؤنا',contact:'تواصل معنا'};
const BRAND='مصنع لحظات للشاشات الدعائية';
const INITIAL_TITLE=document.title;
const tr=t=>T[t]||(/^صورة (\d+)$/.test(t)?'Photo '+RegExp.$1:null);
const tn=[];const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let nd;
while(nd=tw.nextNode()){if(nd.parentNode.closest('script,style,svg,#lang'))continue;const t=nd.nodeValue.trim();if(!t)continue;const e=tr(t);tn.push([nd,nd.nodeValue,e?nd.nodeValue.replace(t,e):nd.nodeValue])}
const LB=$('#lang');
function setLang(l){const en=l==='en';document.documentElement.lang=l;document.documentElement.dir=en?'ltr':'rtl';
tn.forEach(x=>x[0].nodeValue=en?x[2]:x[1]);nv.scrollLeft=0;
document.querySelectorAll('img[alt]').forEach(i=>{if(i.closest('.logo')||i.classList.contains('flogo'))return;const ar=i.dataset.altAr||i.alt;i.dataset.altAr=ar;i.alt=en?(T[ar]||ar):ar});
document.querySelectorAll('[aria-label]:not(#lang)').forEach(i=>{const ar=i.dataset.ariaAr||i.getAttribute('aria-label');i.dataset.ariaAr=ar;i.setAttribute('aria-label',en?(T[ar]||ar):ar)});
document.querySelectorAll('.logo img,.flogo').forEach(i=>{i.src=en?LOGO_EN:LOGO_AR;i.alt=en?'Moments Media':'لحظات ميديا'});
  document.title=en?(T[INITIAL_TITLE]||T[BRAND]):INITIAL_TITLE;
  LB.textContent=en?'عربي':'EN';LB.setAttribute('aria-label',en?'التبديل إلى العربية':'Switch to English');
  chk();document.documentElement.dispatchEvent(new Event('langchange'));try{localStorage.setItem('lng',l)}catch(e){}}
LB.addEventListener('click',()=>setLang(document.documentElement.lang==='ar'?'en':'ar'));
try{if(localStorage.getItem('lng')==='en')setLang('en')}catch(e){}
document.addEventListener('pointermove',e=>{const c=e.target.closest('.g');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:0,rootMargin:'0px 0px -3% 0px'});document.querySelectorAll('main > section, main > h2, main > .g, main .grid:not(#all) > *, .detail-point, .gallery-group').forEach((el,i)=>{el.classList.add('reveal-on-scroll');el.style.setProperty('--reveal-delay',`${Math.min(i%5,4)*55}ms`);io.observe(el)})}
