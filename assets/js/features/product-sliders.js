(() => {
  const catalog = document.getElementById('all');
  if (!catalog) return;

  const groupForPage = {
    'product-vertical.html': 'products-vertical',
    'product-portable.html': 'products-portable',
    'product-horizontal.html': 'products-horizontal'
  };
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const say = (ar, en) => document.documentElement.lang === 'en' ? en : ar;
  const pauseMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const init = async () => {
    const cards = Array.from(catalog.querySelectorAll('.product-card'));
    if (!cards.length) return;
    let manifest = window.MOMENTS_MANIFEST || null;
    if (!manifest) {
      try {
        const response = await fetch('assets/data/manifest.json', {cache: 'no-store'});
        if (response.ok) manifest = await response.json();
      } catch (_) { /* Existing product images still provide a safe one-slide fallback. */ }
    }

    const products = cards.map((card, index) => {
      const page = card.getAttribute('href').split('/').pop();
      const image = card.querySelector('.product-image img');
      const titleAr = image?.alt || card.querySelector('h3')?.textContent.trim() || '';
      const titleEn = (typeof T !== 'undefined' && T[titleAr]) || titleAr;
      const hero = image ? {src: image.getAttribute('src'), altAr: titleAr, altEn: titleEn} : null;
      const groupKey = groupForPage[page];
      const galleryItems = groupKey && manifest?.groups?.[groupKey]?.items || [];
      const slides = galleryItems.map(item => ({
        src: item.src,
        altAr: item.altAr || titleAr,
        altEn: item.altEn || titleEn
      }));
      if (hero && !slides.some(item => item.src === hero.src)) slides.unshift(hero);
      if (!slides.length && hero) slides.push(hero);
      return {card, page, titleAr, titleEn, slides, index};
    });

    catalog.classList.add('product-showcase-list');
    catalog.innerHTML = products.map(product => {
      const {page, titleAr, titleEn, slides, index} = product;
      const imageSlides = slides.map((slide, slideIndex) => `
        <figure class="product-showcase-slide" data-slide="${slideIndex}" data-alt-ar="${escapeHTML(slide.altAr)}" data-alt-en="${escapeHTML(slide.altEn)}" aria-hidden="${slideIndex === 0 ? 'false' : 'true'}">
          <img src="${escapeHTML(slide.src)}" alt="${escapeHTML(document.documentElement.lang === 'en' ? slide.altEn : slide.altAr)}" loading="lazy" decoding="async">
        </figure>`).join('');
      const dots = slides.length > 1 ? slides.map((_, dotIndex) => `<button class="product-slide-dot${dotIndex === 0 ? ' is-active' : ''}" type="button" data-to="${dotIndex}" aria-label="${escapeHTML(say(`الصورة ${dotIndex + 1}`, `Image ${dotIndex + 1}`))}" aria-current="${dotIndex === 0 ? 'true' : 'false'}"></button>`).join('') : '';
      const arrows = `<button class="product-slide-arrow product-slide-prev" type="button" aria-label="${escapeHTML(say('الصورة السابقة','Previous image'))}" ${slides.length < 2 ? 'disabled' : ''}><span aria-hidden="true">‹</span></button><button class="product-slide-arrow product-slide-next" type="button" aria-label="${escapeHTML(say('الصورة التالية','Next image'))}" ${slides.length < 2 ? 'disabled' : ''}><span aria-hidden="true">›</span></button>`;
      return `
        <section class="product-showcase g" data-product-page="${escapeHTML(page)}" data-title-ar="${escapeHTML(titleAr)}" data-title-en="${escapeHTML(titleEn)}" aria-label="${escapeHTML(titleAr)}">
          <div class="product-showcase-heading">
            <span class="product-showcase-index">${String(index + 1).padStart(2, '0')} / ${String(products.length).padStart(2, '0')}</span>
            <h2>${escapeHTML(document.documentElement.lang === 'en' ? titleEn : titleAr)}</h2>
            <a class="btn product-detail-cta" href="${escapeHTML(page)}">${escapeHTML(say('تفاصيل المنتج','Product details'))}<span aria-hidden="true">←</span></a>
          </div>
          <div class="product-slider" data-slide-count="${slides.length}" role="region" aria-roledescription="carousel" aria-label="${escapeHTML(titleAr)}">
            <div class="product-slider-viewport"><div class="product-slider-track">${imageSlides}</div></div>
            ${arrows}
          </div>
          <div class="product-slider-footer">
            <span class="product-slider-count" aria-live="polite">01 / ${String(slides.length).padStart(2, '0')}</span>
            <div class="product-slider-dots" role="group" aria-label="${escapeHTML(say('اختيار الصورة','Choose an image'))}">${dots}</div>
            <a class="btn p product-quote-cta" href="contact.html">${escapeHTML(say('اطلب عرض سعر','Request a quote'))}</a>
          </div>
        </section>`;
    }).join('');

    const sliders = Array.from(catalog.querySelectorAll('.product-slider'));
    const updateLanguage = () => {
      const english = document.documentElement.lang === 'en';
      catalog.querySelectorAll('.product-showcase').forEach(section => {
        const ar = section.dataset.titleAr;
        const en = section.dataset.titleEn;
        section.querySelector('.product-showcase-heading h2').textContent = english ? en : ar;
        section.setAttribute('aria-label', english ? en : ar);
        section.querySelector('.product-slider').setAttribute('aria-label', english ? en : ar);
        section.querySelectorAll('.product-showcase-slide').forEach(slide => { const img = slide.querySelector('img'); img.alt = english ? (slide.dataset.altEn || en) : (slide.dataset.altAr || ar); });
        section.querySelectorAll('.product-slide-dot').forEach((dot, i) => dot.setAttribute('aria-label', say(`الصورة ${i + 1}`, `Image ${i + 1}`)));
        section.querySelector('.product-detail-cta').firstChild.textContent = say('تفاصيل المنتج','Product details');
        section.querySelector('.product-quote-cta').textContent = say('اطلب عرض سعر','Request a quote');
      });
    };

    sliders.forEach(slider => {
      const track = slider.querySelector('.product-slider-track');
      const slides = Array.from(track.children);
      const count = slides.length;
      const section = slider.closest('.product-showcase');
      const countOutput = section.querySelector('.product-slider-count');
      const dots = Array.from(section.querySelectorAll('.product-slide-dot'));
      const previous = section.querySelector('.product-slide-prev');
      const next = section.querySelector('.product-slide-next');
      let index = 0;
      let timer = 0;
      let visible = false;
      let hovered = false;
      let focused = false;
      const paint = () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((slide, slideIndex) => slide.setAttribute('aria-hidden', slideIndex === index ? 'false' : 'true'));
        countOutput.textContent = `${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle('is-active', dotIndex === index);
          dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
        });
      };
      const step = direction => { index = (index + direction + count) % count; paint(); };
      const schedule = () => {
        clearTimeout(timer);
        if (count < 2 || !visible || hovered || focused || pauseMotion() || document.hidden) return;
        timer = setTimeout(() => { step(1); schedule(); }, 5200);
      };
      previous?.addEventListener('click', () => { step(-1); schedule(); });
      next?.addEventListener('click', () => { step(1); schedule(); });
      dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => { index = dotIndex; paint(); schedule(); }));
      slider.addEventListener('pointerenter', () => { hovered = true; schedule(); });
      slider.addEventListener('pointerleave', () => { hovered = false; schedule(); });
      slider.addEventListener('focusin', () => { focused = true; schedule(); });
      slider.addEventListener('focusout', event => {
        if (!slider.contains(event.relatedTarget)) { focused = false; schedule(); }
      });
      paint();
      slider._setVisible = value => { visible = value; schedule(); };
      slider._wake = () => schedule();
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target._setVisible(entry.isIntersecting)), {threshold: 0.2});
      sliders.forEach(slider => observer.observe(slider));
    } else sliders.forEach(slider => slider._setVisible(true));

    document.addEventListener('visibilitychange', () => sliders.forEach(slider => slider._wake()));
    new MutationObserver(updateLanguage).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
    updateLanguage();
  };

  init().catch(error => console.error('Product sliders could not be initialized:', error));
})();
