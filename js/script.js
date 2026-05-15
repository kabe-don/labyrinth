/**
 * script.js – Homepage Logic (Relative Paths)
 * ------------------------------------------------------------------
 * This script powers the main homepage of the Labyrinth gaming website.
 * It handles:
 *   - Splash screen display (once per session)
 *   - Rendering the "Top Rated" cards from a curated list
 *   - Building the dynamic "All Games" list with hover preview
 *   - Hero carousel with auto‑advancing video slides
 *   - Hash‑based page navigation (About vs All Games)
 *   - Scroll‑triggered header styling
 *
 * All asset paths are relative to the root folder of the website
 * (e.g., "assets/img/…", "global_pages/game/…"), because the script
 * is loaded from the homepage (index.html). No '../' encoding is needed.
 *
 * Dependencies:
 *   - Global arrays: GAMES_CATALOG (full game data), TOP_RATED_GAMES (ids)
 *   - DOM elements with specific IDs (defined in HTML)
 * ------------------------------------------------------------------
 */

(function() {
  // =========================================================================
  // 1. SPLASH SCREEN
  //    Shows a branded loading screen only once per browser session.
  //    Uses sessionStorage to remember if it has already been shown.
  // =========================================================================
  const splashScreen = document.getElementById('splashScreen');
  if (!sessionStorage.getItem('splashShown')) {
    // First visit in this session → store flag and schedule fade‑out
    sessionStorage.setItem('splashShown', 'true');
    window.addEventListener('load', () => {
      // Wait 2.5 seconds after full load, then add .hidden to trigger CSS transition
      setTimeout(() => splashScreen.classList.add('hidden'), 2500);
    });
  } else {
    // Splash already seen → hide immediately (no animation)
    splashScreen.classList.add('hidden');
  }

  // =========================================================================
  // 2. PLATFORM ICONS
  //    A lookup table that maps short platform keys (win, mac, ps, xbox, ns)
  //    to the corresponding <img> tags. Used across the page for consistency.
  // =========================================================================
  const platformIcons = {
    win: '<img src="assets/img/platforms/win.png" alt="Windows" class="platform-icon">',
    mac: '<img src="assets/img/platforms/mac.png" alt="Mac" class="platform-icon">',
    ps: '<img src="assets/img/platforms/ps.png" alt="PlayStation" class="platform-icon">',
    xbox: '<img src="assets/img/platforms/xbox.png" alt="Xbox" class="platform-icon">',
    ns: '<img src="assets/img/platforms/ns.png" alt="Nintendo Switch" class="platform-icon">'
  };

  // =========================================================================
  // 3. TOP RATED CARDS
  //    Reads the TOP_RATED_GAMES array (game IDs) and matches them against
  //    GAMES_CATALOG to populate the "Top Rated" grid on the homepage.
  //    Each card is a clickable link to the game's detail page.
  // =========================================================================
  const topRatedGrid = document.querySelector('.top-rated-grid');
  if (topRatedGrid && typeof TOP_RATED_GAMES !== 'undefined' && typeof GAMES_CATALOG !== 'undefined') {
    // Map IDs to actual game objects, filtering out any missing entries
    const topGames = TOP_RATED_GAMES.map(id => GAMES_CATALOG.find(g => g.id === id)).filter(g => g);
    // Build HTML for each card using game data
    topRatedGrid.innerHTML = topGames.map(game => `
      <a href="global_pages/game/${game.id}.html" class="top-rated-card">
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

  // =========================================================================
  // 4. ALL GAMES LIST & PREVIEW PANEL
  //    Dynamically generates the full game list in the "All Games" section.
  //    Hovering over an item updates a sticky preview panel on the right.
  // =========================================================================
  let activeGameId = null;        // Currently hovered / selected game ID
  let hoverTimeout = null;        // Debounce timer for hover events

  /**
   * renderGameList()
   * Clears and rebuilds the game list (<a> items) from GAMES_CATALOG.
   * Each item includes a thumbnail, title, tags, release date, and platforms.
   * Mouseenter events trigger a short debounce before updating the preview.
   */
  function renderGameList() {
    const listEl = document.getElementById('gameListAll');
    if (!listEl) return;
    listEl.innerHTML = '';  // Clear previous content

    GAMES_CATALOG.forEach(game => {
      // Create the main item wrapper (an anchor linking to the game page)
      const item = document.createElement('a');
      item.className = 'game-item';
      item.href = `global_pages/game/${game.id}.html`;
      item.dataset.gameId = game.id;

      // Thumbnail container
      const thumbDiv = document.createElement('div');
      thumbDiv.className = 'game-thumb';
      const thumbImg = document.createElement('img');
      thumbImg.src = game.thumb;
      thumbImg.alt = game.title;
      thumbImg.className = 'game-thumb-img';
      thumbImg.loading = 'lazy';
      thumbDiv.appendChild(thumbImg);

      // Info container: title, tags, meta
      const info = document.createElement('div');
      info.className = 'game-info';
      info.innerHTML = `
        <div class="game-title">${game.title}</div>
        <div class="game-tags">
          ${game.tags.slice(0, 3).map(t => `<span class="game-tag">${t}</span>`).join('')}
        </div>
        <div class="game-meta">
          <span class="game-release">${game.releaseDate}</span>
          <div class="platform-icons">
            ${game.platforms.map(p => platformIcons[p] || '').join('')}
          </div>
        </div>
      `;

      item.appendChild(thumbDiv);
      item.appendChild(info);

      // Hover handling with a 100ms debounce – prevents rapid flickering
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

  /**
   * setActiveGame(gameId)
   * Marks the given game as active in the list and updates the preview.
   * Adds a brief highlight animation to the preview panel.
   */
  function setActiveGame(gameId) {
    if (activeGameId === gameId) return; // Already active
    const listEl = document.getElementById('gameListAll');
    // Remove active class from all items
    listEl.querySelectorAll('.game-item').forEach(el => el.classList.remove('active'));
    const target = listEl.querySelector(`.game-item[data-game-id="${gameId}"]`);
    if (target) {
      target.classList.add('active');
      activeGameId = gameId;
      updatePreview(gameId);
      // Trigger a highlight flash on the preview panel
      const panel = document.getElementById('previewPanelAll');
      if (panel) {
        panel.classList.add('highlight');
        setTimeout(() => panel.classList.remove('highlight'), 600);
      }
    }
  }

  /**
   * updatePreview(gameId)
   * Fills the right‑side preview panel with the selected game's details.
   * Adds a fade‑out/in transition via a CSS class to make it feel smooth.
   * The preview gallery thumbnails are clickable to select a screenshot.
   */
  function updatePreview(gameId) {
    const game = GAMES_CATALOG.find(g => g.id === gameId);
    if (!game) return;
    const contentEl = document.getElementById('previewContentAll');
    if (!contentEl) return;

    // Start fading out current content
    contentEl.classList.add('fading');
    setTimeout(() => {
      // Replace inner HTML with new game data
      contentEl.innerHTML = `
        <div class="preview-title">${game.title}</div>
        <div class="preview-review">⭐ ${game.review}</div>
        <div class="preview-tags">
          ${game.tags.map(t => `<span class="preview-tag">${t}</span>`).join('')}
        </div>
        <div class="preview-description">${game.description}</div>
        <div class="preview-release">📅 ${game.releaseDate}</div>
        <div class="preview-gallery">
          ${game.gallery.map((imgSrc, i) => `
            <div class="preview-gallery-thumb${i === 0 ? ' active' : ''}">
              <img src="${imgSrc}" alt="Screenshot ${i + 1}" class="preview-gallery-img" loading="lazy">
            </div>
          `).join('')}
        </div>
      `;
      // Remove fading class to fade new content in
      contentEl.classList.remove('fading');

      // Attach click handlers to gallery thumbnails: highlight the selected one
      contentEl.querySelectorAll('.preview-gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
          contentEl.querySelectorAll('.preview-gallery-thumb').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }, 150); // Delay matches the CSS transition duration
  }

  // Build the initial list
  renderGameList();

  // =========================================================================
  // 5. HERO CAROUSEL
  //    Creates video‑backed slides for up to 8 games (first 8 from catalog).
  //    Includes auto‑advance every 5 seconds and manual arrow/dot navigation.
  // =========================================================================
  const heroSlidesData = GAMES_CATALOG.slice(0, 8);  // Limit to first 8 games
  const heroSlidesContainer = document.getElementById('heroSlides');
  const heroDotsContainer = document.getElementById('heroDots');
  let currentSlide = 0;

  function buildHeroCarousel() {
    if (!heroSlidesContainer || !heroDotsContainer) return;
    heroSlidesContainer.innerHTML = '';
    heroDotsContainer.innerHTML = '';

    heroSlidesData.forEach((game, idx) => {
      // Create slide div
      const slideDiv = document.createElement('div');
      slideDiv.className = `hero__slide ${idx === 0 ? 'hero__slide--active' : ''}`;
      slideDiv.dataset.index = idx;

      // Determine video source: use heroVideo if available, fallback to regular video
      const videoSrc = game.heroVideo || game.video;

      // Build slide inner HTML: video background, overlay, text content
      slideDiv.innerHTML = `
        <video class="hero__slide-video" autoplay muted loop playsinline>
          <source src="${videoSrc}" type="video/mp4">
        </video>
        <div class="hero__slide-overlay"></div>
        <div class="hero__slide-content">
          <h1 class="hero__slide-title">
            ${game.titleWhite || game.title.split(' ')[0]}<br>
            <span class="hero__slide-title-accent">
              ${game.titleGradient || (game.title.split(' ').slice(1).join(' ') || game.title)}
            </span>
          </h1>
          <p class="hero__slide-desc">${game.description.substring(0, 100)}...</p>
          <div class="hero__slide-meta">
            <span class="hero__badge">${game.review}</span>
            <span class="hero__year">${game.releaseDate.split(' ')[2] || game.releaseDate}</span>
          </div>
          <a href="global_pages/game/${game.id}.html" class="hero__btn">DETAILS →</a>
        </div>
      `;
      heroSlidesContainer.appendChild(slideDiv);

      // Create corresponding navigation dot
      const dot = document.createElement('button');
      dot.className = `hero__dot ${idx === 0 ? 'hero__dot--active' : ''}`;
      dot.dataset.slide = idx;
      dot.addEventListener('click', () => goToSlide(idx));
      heroDotsContainer.appendChild(dot);
    });
  }

  /**
   * goToSlide(index)
   * Updates the active state of slides and dots to display the chosen index.
   */
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

  // Wire up next/prev buttons
  const nextBtn = document.getElementById('heroNext');
  const prevBtn = document.getElementById('heroPrev');
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide((currentSlide + 1) % heroSlidesData.length));
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide((currentSlide - 1 + heroSlidesData.length) % heroSlidesData.length));

  // Auto‑advance every 5 seconds
  setInterval(() => goToSlide((currentSlide + 1) % heroSlidesData.length), 5000);

  // =========================================================================
  // 6. PAGE NAVIGATION (Hash‑based)
  //    Supports navigation between "All Games" (#all) and "About" (#about)
  //    without page reload. Uses history.replaceState to update the URL.
  // =========================================================================
  /**
   * navigateTo(pageKey, skipScroll)
   * Shows the corresponding page section, updates the game list if necessary,
   * and optionally scrolls to the section.
   */
  function navigateTo(pageKey, skipScroll = false) {
    // Hide all sections, then show the target one
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(`page-${pageKey}`);
    if (section) section.classList.add('active');

    // If navigating to About, clear the search input and dropdown
    if (pageKey === 'about') {
      const searchInput = document.getElementById('globalSearch');
      if (searchInput) searchInput.value = '';
      const dropdown = document.getElementById('searchDropdown');
      if (dropdown) dropdown.classList.remove('show');
    }

    // Reset any active game state when leaving the "All Games" view
    activeGameId = null;
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const contentEl = document.getElementById('previewContentAll');
    if (contentEl && pageKey !== 'about') {
      contentEl.innerHTML = '<div class="preview-title">Select a Game</div><p style="color:var(--text-muted);">Hover over a game to see details</p>';
    }
    const listEl = document.getElementById('gameListAll');
    if (listEl) listEl.querySelectorAll('.game-item').forEach(el => el.classList.remove('active'));

    // Smooth scroll to the section unless we are restoring initial hash
    if (section && !skipScroll) section.scrollIntoView({ behavior: 'smooth' });

    // Update URL hash without reloading the page
    history.replaceState(null, '', `#${pageKey}`);
  }

  // Listen for hash changes (e.g., user clicks a link with #about)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    navigateTo(hash === 'about' ? 'about' : 'all', true);
  });

  // On initial load, determine which section to show based on the URL hash
  const initialHash = window.location.hash.replace('#', '');
  navigateTo(initialHash === 'about' ? 'about' : 'all', true);

  // =========================================================================
  // 7. LOGO CLICK – SCROLL TO TOP
  //    If already on the homepage, clicking the logo smoothly scrolls to top.
  //    (Otherwise the normal link navigation occurs.)
  // =========================================================================
  const logoTop = document.getElementById('logoTop');
  if (logoTop) {
    logoTop.addEventListener('click', (e) => {
      const path = window.location.pathname;
      // Check if we are on the homepage (index.html or root)
      if (path.endsWith('index.html') || path === '/' || path === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // =========================================================================
  // 8. HEADER SCROLL EFFECT
  //    Adds/removes the .scrolled class to the fixed header when the page
  //    is scrolled more than 20px, enhancing readability.
  // =========================================================================
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  });
})();