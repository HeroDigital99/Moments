(() => {
  const videos = [...document.querySelectorAll('.video-frame video')];
  videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'metadata';
  });
  if (!videos.length) return;
  const playIfVisible = video => {
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (isIntersecting) playIfVisible(target);
        else target.pause();
      });
    }, {threshold: 0.35});
    videos.forEach(video => observer.observe(video));
  } else {
    videos.forEach(playIfVisible);
  }
})();
