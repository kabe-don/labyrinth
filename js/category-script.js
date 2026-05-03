// js/category-script.js – Category slideshow (singleplayer / multiplayer)
(function() {
  const category = document.body.dataset.category || 'singleplayer';
  const gamesInCategory = GAMES_CATALOG.filter(g => g.category === (category === 'singleplayer' ? 'single' : 'multi'));
  const slides = gamesInCategory;

  let currentSlide = 0;
  let autoAdvanceTimer = null;
  let isExpanded = false;
  let userInteracted = false;
  let videoLoopFrame = null;

  const slideLeft = document.getElementById('slideLeft');
  const slideCover = document.getElementById('slideCover');
  const slideDescription = document.getElementById('slideDescription');
  const slideMeta = document.getElementById('slideMeta');
  const slideStars = document.getElementById('slideStars');
  const slideRatingText = document.getElementById('slideRatingText');
  const slideVideo = document.getElementById('slideVideo');
  const slideRight = document.getElementById('slideRight');
  const heroBgImage = document.getElementById('heroBgImage');
  const dotsContainer = document.getElementById('slideshowDots');

  const videoOverlay = document.getElementById('videoOverlay');
  const videoOverlayContainer = document.getElementById('videoOverlayContainer');
  const videoOverlayClose = document.getElementById('videoOverlayClose');

  function buildDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.dataset.index = idx;
      dot.addEventListener('click', () => {
        enableAudio();
        updateSlide(idx);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function clearAutoAdvance() {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }

  function startAutoAdvance() {
    clearAutoAdvance();
    if (isExpanded) return;
    const duration = slides[currentSlide].duration || 30000;
    autoAdvanceTimer = setTimeout(() => nextSlide(), duration);
  }

  function enableAudio() {
    if (userInteracted) return;
    userInteracted = true;
    slideVideo.muted = false;
    slideVideo.play().catch(() => {});
  }

  function videoLoopTick() {
    if (isExpanded) { videoLoopFrame = requestAnimationFrame(videoLoopTick); return; }
    if (slideVideo.duration && slideVideo.currentTime >= slideVideo.duration - 0.25) {
      slideVideo.currentTime = 0;
      slideVideo.play().catch(() => {});
    }
    videoLoopFrame = requestAnimationFrame(videoLoopTick);
  }
  function startVideoLoop() { stopVideoLoop(); videoLoopFrame = requestAnimationFrame(videoLoopTick); }
  function stopVideoLoop() { if (videoLoopFrame) cancelAnimationFrame(videoLoopFrame); }

  function expandVideo() {
    if (isExpanded) return;
    isExpanded = true;
    clearAutoAdvance();
    stopVideoLoop();
    slideRight.classList.add('has-video-expanded');
    videoOverlayContainer.appendChild(slideVideo);
    slideVideo.controls = true;
    slideVideo.muted = false;
    slideVideo.play().catch(() => {});
    videoOverlay.classList.add('active');
  }
  function collapseVideo() {
    if (!isExpanded) return;
    isExpanded = false;
    videoOverlay.classList.remove('active');
    slideRight.insertBefore(slideVideo, slideRight.firstChild);
    slideRight.classList.remove('has-video-expanded');
    slideVideo.controls = false;
    slideVideo.muted = !userInteracted;
    startAutoAdvance();
    startVideoLoop();
    slideVideo.play().catch(() => {});
  }

  slideVideo.addEventListener('click', expandVideo);
  const videoPlaceholder = document.getElementById('videoPlaceholder');
  if (videoPlaceholder) videoPlaceholder.addEventListener('click', expandVideo);
  videoOverlayClose.addEventListener('click', (e) => { e.stopPropagation(); collapseVideo(); });
  videoOverlay.addEventListener('click', (e) => { if (e.target === videoOverlay) collapseVideo(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isExpanded) collapseVideo(); });

  function updateSlide(index) {
    if (isExpanded) collapseVideo();
    const slide = slides[index];
    slideCover.src = slide.categoryThumb || slide.topThumb;
    slideDescription.textContent = slide.description;
    slideMeta.innerHTML = `<strong>Developer:</strong> ${slide.developer}<br><strong>Publisher:</strong> ${slide.publisher}<br><strong>Release Date:</strong> ${slide.releaseDate}`;
    slideStars.textContent = slide.stars;
    slideRatingText.textContent = `${slide.rating} / 5`;
    heroBgImage.style.backgroundImage = `url('${slide.bgImage || slide.topThumb}')`;

    // ========== MAKE LEFT PANEL CLICKABLE ==========
    if (slideLeft) {
      slideLeft.style.cursor = 'pointer';
      // Remove any previous listener by assigning a new onclick
      slideLeft.onclick = () => {
        window.location.href = `game/${slide.id}.html`;
      };
    }

    stopVideoLoop();
    slideVideo.loop = false;
    slideVideo.autoplay = true;
    slideVideo.controls = false;
    slideVideo.muted = !userInteracted;
    const source = document.createElement('source');
    source.src = slide.video;
    source.type = 'video/mp4';
    slideVideo.innerHTML = '';
    slideVideo.appendChild(source);
    slideVideo.load();
    startVideoLoop();
    slideVideo.play().catch(() => {});

    document.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentSlide = index;
    startAutoAdvance();
  }

  function nextSlide() { updateSlide((currentSlide + 1) % slides.length); }
  function prevSlide() { updateSlide((currentSlide - 1 + slides.length) % slides.length); }

  document.getElementById('nextBtn').addEventListener('click', () => { enableAudio(); nextSlide(); });
  document.getElementById('prevBtn').addEventListener('click', () => { enableAudio(); prevSlide(); });

  buildDots();
  updateSlide(0);

  window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
  });

  // Make category heading clickable (reload same page)
  const categoryHeading = document.getElementById('categoryHeading');
  if (categoryHeading) {
    categoryHeading.style.cursor = 'pointer';
    categoryHeading.addEventListener('click', () => {
      window.location.href = window.location.href;
    });
  }
})();