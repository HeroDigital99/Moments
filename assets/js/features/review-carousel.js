(() => {
  const root = document.getElementById('client-review-gallery');
  if (!root) return;

  const label = (ar, en) => document.documentElement.lang === 'en' ? en : ar;
  const setup = () => {
    const gallery = root.querySelector('.gallery-group');
    const track = gallery && gallery.querySelector('.photo-grid');
    if (!gallery || !track || gallery.dataset.carouselReady) return;

    gallery.dataset.carouselReady = 'true';
    gallery.classList.add('review-carousel');
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-roledescription', 'carousel');
    gallery.setAttribute('aria-label', label('معرض آراء العملاء', 'Customer reviews carousel'));
    track.classList.add('review-track');
    track.setAttribute('tabindex', '0');
    track.setAttribute('aria-label', label('اسحب أو مرر أفقيًا لاستعراض الآراء', 'Scroll horizontally to browse reviews'));

    const heading = gallery.querySelector('.gallery-heading');
    const controls = document.createElement('div');
    controls.className = 'review-carousel-controls';
    controls.innerHTML = `<button class="review-arrow review-prev" type="button" aria-label="${label('الرأي السابق','Previous review')}" title="${label('السابق','Previous')}">‹</button><button class="review-arrow review-next" type="button" aria-label="${label('الرأي التالي','Next review')}" title="${label('التالي','Next')}">›</button>`;
    heading.append(controls);

    const progress = document.createElement('div');
    progress.className = 'review-carousel-progress';
    progress.setAttribute('aria-hidden', 'true');
    progress.innerHTML = '<span></span>';
    gallery.append(progress);

    const delay = 4200;
    let timer = 0;
    let resumeTimer = 0;
    let paused = false;
    const cardStep = () => {
      const card = track.querySelector('.photo-tile');
      if (!card) return 320;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 20;
      return card.getBoundingClientRect().width + gap;
    };
    const restartProgress = () => {
      const bar = progress.firstElementChild;
      bar.style.animation = 'none';
      void bar.offsetWidth;
      bar.style.animation = `reviewProgress ${delay}ms linear forwards`;
    };
    const stop = () => {
      clearTimeout(timer);
      progress.firstElementChild.style.animationPlayState = 'paused';
    };
    const move = direction => {
      const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
      const target = direction > 0
        ? (track.scrollLeft >= maximum - cardStep() * .55 ? 0 : track.scrollLeft + cardStep())
        : (track.scrollLeft <= cardStep() * .55 ? maximum : track.scrollLeft - cardStep());
      track.scrollTo({left: target, behavior: 'smooth'});
    };
    const schedule = () => {
      clearTimeout(timer);
      if (paused || document.hidden) return;
      restartProgress();
      timer = setTimeout(() => {
        move(1);
        schedule();
      }, delay);
    };
    const pause = () => { paused = true; stop(); clearTimeout(resumeTimer); };
    const resumeSoon = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; schedule(); }, 4800);
    };

    gallery.querySelector('.review-prev').addEventListener('click', () => { move(-1); pause(); resumeSoon(); });
    gallery.querySelector('.review-next').addEventListener('click', () => { move(1); pause(); resumeSoon(); });
    gallery.addEventListener('pointerenter', pause);
    gallery.addEventListener('pointerleave', resumeSoon);
    gallery.addEventListener('focusin', pause);
    gallery.addEventListener('focusout', event => { if (!gallery.contains(event.relatedTarget)) resumeSoon(); });
    track.addEventListener('touchstart', pause, {passive: true});
    track.addEventListener('touchend', resumeSoon, {passive: true});
    track.addEventListener('wheel', pause, {passive: true});
    track.addEventListener('scroll', () => {
      if (!paused) restartProgress();
    }, {passive: true});
    document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); else { paused = false; schedule(); } });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) pause();
    else schedule();
  };

  const observer = new MutationObserver(setup);
  observer.observe(root, {childList: true, subtree: true});
  setup();
})();
