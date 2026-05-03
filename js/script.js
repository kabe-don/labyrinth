// js/script.js – Homepage logic (splash, hero carousel, dynamic sections)
(function() {
  // ---------- Splash Screen ----------
  const splashScreen = document.getElementById('splashScreen');
  if (!sessionStorage.getItem('splashShown')) {
    sessionStorage.setItem('splashShown', 'true');
    window.addEventListener('load', () => {
      setTimeout(() => splashScreen.classList.add('hidden'), 2500);
    });
  } else {
    splashScreen.classList.add('hidden');
  }

  // ---------- Platform icons helper ----------
  const platformIcons = {
    win: '<img src="img/platforms/win.png" alt="Windows" class="platform-icon">',
    mac: '<img src="img/platforms/mac.png" alt="Mac" class="platform-icon">',
    ps: '<img src="img/platforms/ps.png" alt="PlayStation" class="platform-icon">',
    xbox: '<img src="img/platforms/xbox.png" alt="Xbox" class="platform-icon">',
    ns: '<img src="img/platforms/ns.png" alt="Nintendo Switch" class="platform-icon">'
  };

  // ---------- Render Top Rated & Trending (custom selection) ----------
  const topRatedGrid = document.querySelector('.top-rated-grid');
  if (topRatedGrid && typeof TOP_RATED_GAMES !== 'undefined' && typeof GAMES_CATALOG !== 'undefined') {
    const topGames = TOP_RATED_GAMES.map(id => GAMES_CATALOG.find(g => g.id === id)).filter(g => g);
    topRatedGrid.innerHTML = topGames.map(game => `
      <a href="game/${game.id}.html" class="top-rated-card">
        <div class="top-rated-card__thumb">
          <img src="${game.topThumb}" alt="${game.title}" class="top-rated-card__img" loading="lazy">
        </div>
        <div class="top-rated-card__body">
          <span class="top-rated-card__title">${game.title}</span>
          <span class="top-rated-card__review">${game.review}</span>
          <div class="top-rated-card__meta">
            <span class="top-rated-card__price">${game.releaseDate}</span>
            <div class="top-rated-card__platforms">
              ${game.platforms.map(p => platformIcons[p] || '').join('')}
            </div>
          </div>
        </div>
      </a>
    `).join('');
  }

  // ---------- Render All Games List & Preview Panel ----------
  let activeGameId = null;
  let hoverTimeout = null;

  function renderGameList() {
    const listEl = document.getElementById('gameListAll');
    if (!listEl) return;
    listEl.innerHTML = '';
    GAMES_CATALOG.forEach(game => {
      const item = document.createElement('a');
      item.className = 'game-item';
      item.href = `game/${game.id}.html`;
      item.dataset.gameId = game.id;
      const thumbDiv = document.createElement('div');
      thumbDiv.className = 'game-thumb';
      const thumbImg = document.createElement('img');
      thumbImg.src = game.thumb;
      thumbImg.alt = game.title;
      thumbImg.className = 'game-thumb-img';
      thumbImg.loading = 'lazy';
      thumbDiv.appendChild(thumbImg);
      const info = document.createElement('div');
      info.className = 'game-info';
      info.innerHTML = `
        <div class="game-title">${game.title}</div>
        <div class="game-tags">${game.tags.slice(0,3).map(t => `<span class="game-tag">${t}</span>`).join('')}</div>
        <div class="game-meta">
          <span class="game-release">${game.releaseDate}</span>
          <div class="platform-icons">${game.platforms.map(p => platformIcons[p] || '').join('')}</div>
        </div>`;
      item.appendChild(thumbDiv);
      item.appendChild(info);
      item.addEventListener('mouseenter', () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => setActiveGame(game.id), 100);
      });
      item.addEventListener('mouseleave', () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
      });
      listEl.appendChild(item);
    });
  }

  function setActiveGame(gameId) {
    if (activeGameId === gameId) return;
    const listEl = document.getElementById('gameListAll');
    listEl.querySelectorAll('.game-item').forEach(el => el.classList.remove('active'));
    const target = listEl.querySelector(`.game-item[data-game-id="${gameId}"]`);
    if (target) {
      target.classList.add('active');
      activeGameId = gameId;
      updatePreview(gameId);
      const panel = document.getElementById('previewPanelAll');
      if (panel) {
        panel.classList.add('highlight');
        setTimeout(() => panel.classList.remove('highlight'), 600);
      }
    }
  }

  function updatePreview(gameId) {
    const game = GAMES_CATALOG.find(g => g.id === gameId);
    if (!game) return;
    const contentEl = document.getElementById('previewContentAll');
    if (!contentEl) return;
    contentEl.classList.add('fading');
    setTimeout(() => {
      contentEl.innerHTML = `
        <div class="preview-title">${game.title}</div>
        <div class="preview-review">⭐ ${game.review}</div>
        <div class="preview-tags">${game.tags.map(t => `<span class="preview-tag">${t}</span>`).join('')}</div>
        <div class="preview-description">${game.description}</div>
        <div class="preview-release">📅 ${game.releaseDate}</div>
        <div class="preview-gallery">
          ${game.gallery.map((c,i) => `
            <div class="preview-gallery-thumb${i===0?' active':''}">
              <img src="${c}" alt="Screenshot ${i+1}" class="preview-gallery-img" loading="lazy">
            </div>`).join('')}
        </div>`;
      contentEl.classList.remove('fading');
      contentEl.querySelectorAll('.preview-gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
          contentEl.querySelectorAll('.preview-gallery-thumb').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }, 150);
  }

  renderGameList();

  // ---------- Hero Carousel (dynamic from GAMES_CATALOG) ----------
  const heroSlidesData = GAMES_CATALOG.slice(0,8);
  const heroSlidesContainer = document.getElementById('heroSlides');
  const heroDotsContainer = document.getElementById('heroDots');
  let currentSlide = 0;

  function buildHeroCarousel() {
    if (!heroSlidesContainer || !heroDotsContainer) {
      console.error('Hero containers missing');
      return;
    }
    heroSlidesContainer.innerHTML = '';
    heroDotsContainer.innerHTML = '';
    heroSlidesData.forEach((game, idx) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = `hero__slide ${idx === 0 ? 'hero__slide--active' : ''}`;
      slideDiv.dataset.index = idx;
      // Use heroVideo or fallback to video
      const videoSrc = game.heroVideo || game.video;
      slideDiv.innerHTML = `
        <video class="hero__slide-video" autoplay muted loop playsinline>
          <source src="${videoSrc}" type="video/mp4">
        </video>
        <div class="hero__slide-overlay"></div>
        <div class="hero__slide-content">
          <h1 class="hero__slide-title">${game.title.split(' ')[0]}<br><span class="hero__slide-title-accent">${game.title.split(' ').slice(1).join(' ') || game.title}</span></h1>
          <p class="hero__slide-desc">${game.description.substring(0, 100)}...</p>
          <div class="hero__slide-meta"><span class="hero__badge">${game.review}</span><span class="hero__year">${game.releaseDate.split(' ')[2] || game.releaseDate}</span></div>
          <a href="game/${game.id}.html" class="hero__btn">DETAILS →</a>
        </div>
      `;
      heroSlidesContainer.appendChild(slideDiv);

      const dot = document.createElement('button');
      dot.className = `hero__dot ${idx === 0 ? 'hero__dot--active' : ''}`;
      dot.dataset.slide = idx;
      dot.addEventListener('click', () => goToSlide(idx));
      heroDotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__dot');
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('hero__slide--active'));
    dots.forEach(d => d.classList.remove('hero__dot--active'));
    currentSlide = index;
    slides[currentSlide]?.classList.add('hero__slide--active');
    dots[currentSlide]?.classList.add('hero__dot--active');
  }

  buildHeroCarousel();
  const nextBtn = document.getElementById('heroNext');
  const prevBtn = document.getElementById('heroPrev');
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide((currentSlide + 1) % heroSlidesData.length));
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide((currentSlide - 1 + heroSlidesData.length) % heroSlidesData.length));
  setInterval(() => goToSlide((currentSlide + 1) % heroSlidesData.length), 5000);

  // ---------- Navigation between "All Games" and "About" ----------
  function navigateTo(pageKey, skipScroll = false) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(`page-${pageKey}`);
    if (section) section.classList.add('active');
    if (pageKey === 'about') {
      const searchInput = document.getElementById('globalSearch');
      if (searchInput) searchInput.value = '';
      const dropdown = document.getElementById('searchDropdown');
      if (dropdown) dropdown.classList.remove('show');
    }
    activeGameId = null;
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const contentEl = document.getElementById('previewContentAll');
    if (contentEl && pageKey !== 'about') {
      contentEl.innerHTML = '<div class="preview-title">Select a Game</div><p style="color:var(--text-muted);">Hover over a game to see details</p>';
    }
    const listEl = document.getElementById('gameListAll');
    if (listEl) listEl.querySelectorAll('.game-item').forEach(el => el.classList.remove('active'));
    if (section && !skipScroll) section.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `#${pageKey}`);
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    navigateTo(hash === 'about' ? 'about' : 'all', true);
  });
  const initialHash = window.location.hash.replace('#', '');
  navigateTo(initialHash === 'about' ? 'about' : 'all', true);

  // Logo scroll to top (only on homepage)
  const logoTop = document.getElementById('logoTop');
  if (logoTop) {
    logoTop.addEventListener('click', (e) => {
      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Sticky header
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  });
})();