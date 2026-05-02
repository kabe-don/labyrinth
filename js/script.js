(function() {
  /* ---------- splash screen ---------- */
  const splashScreen = document.getElementById('splashScreen');
  if (!sessionStorage.getItem('splashShown')) {
    sessionStorage.setItem('splashShown', 'true');
    window.addEventListener('load', () => {
      setTimeout(() => splashScreen.classList.add('hidden'), 2500);
    });
  } else {
    splashScreen.classList.add('hidden');
  }

  /* ---------- game data (platforms corrected) ---------- */
  const games = [
    {
      id: 'rdr2',
      title: 'Red Dead Redemption 2',
      tags: ['Action', 'Adventure', 'Open World'],
      description: 'America, 1899. The end of the Wild West era has begun.',
      review: 'Very Positive',
      releaseDate: 'Oct 26, 2018',
      platforms: ['win', 'ps', 'xbox'],
      thumb: 'img/games/rdr2-thumb.jpg',
      topThumb: 'img/games/rdr2-thumb_tall.jpg',
      gallery: ['img/games/rdr2-1.jpg', 'img/games/rdr2-2.jpg', 'img/games/rdr2-3.jpg', 'img/games/rdr2-4.jpg'],
      category: 'single'
    },
    {
      id: 'stardew',
      title: 'Stardew Valley',
      tags: ['RPG', 'Simulation', 'Cozy'],
      description: 'Inherited an old farm plot. Turn fields into a thriving home.',
      review: 'Overwhelmingly Positive',
      releaseDate: 'Feb 26, 2016',
      platforms: ['win', 'mac', 'ns', 'ps', 'xbox'],
      thumb: 'img/games/sv-thumb.jpg',
      topThumb: 'img/games/sv-thumb_tall.jpg',
      gallery: ['img/games/sv-1.jpg', 'img/games/sv-2.jpg', 'img/games/sv-3.jpg', 'img/games/sv-4.jpg'],
      category: 'single'
    },
    {
      id: 'itt',
      title: 'It Takes Two',
      tags: ['Co-op', 'Adventure', 'Story Rich'],
      description: 'A fun emotional co‑op adventure. Cody and May, turned into tiny dolls, must work together.',
      review: 'Overwhelmingly Positive',
      releaseDate: 'Mar 26, 2021',
      platforms: ['win', 'ns', 'ps', 'xbox',],
      thumb: 'img/games/itt-thumb.jpg',
      topThumb: 'img/games/itt-thumb_tall.jpg',
      gallery: ['img/games/itt-1.jpg', 'img/games/itt-2.jpg', 'img/games/itt-3.jpg', 'img/games/itt-4.jpg'],
      category: 'multi'
    },
    {
      id: 'graveyard',
      title: 'Graveyard Keeper',
      tags: ['RPG', 'Simulation', 'Dark Humor'],
      description: 'Build and manage a medieval graveyard while facing ethical dilemmas.',
      review: 'Very Positive',
      releaseDate: 'Aug 15, 2018',
      platforms: ['win', 'mac', 'ns', 'ps', 'xbox'],
      thumb: 'img/games/gk-thumb.jpg',
      topThumb: 'img/games/gk-thumb_tall.jpg',
      gallery: ['img/games/gk-1.jpg', 'img/games/gk-2.jpg', 'img/games/gk-3.jpg', 'img/games/gk-4.jpg'],
      category: 'single'
    },
    {
      id: 'alittle',
      title: 'A Little to the Left',
      tags: ['Puzzle', 'Cozy', 'Strategy'],
      description: 'Sort, stack, and organize household items. Watch out for a mischievous cat!',
      review: 'Very Positive',
      releaseDate: 'Nov 8, 2022',
      platforms: ['win', 'mac', 'ns', 'ps', 'xbox'],
      thumb: 'img/games/alttl-thumb.jpg',
      topThumb: 'img/games/alttl-thumb_tall.jpg',
      gallery: ['img/games/alttl-1.png', 'img/games/alttl-2.png', 'img/games/alttl-3.jpg', 'img/games/alttl-4.jpg'],
      category: 'single'
    },
    {
      id: 'picopark',
      title: 'Pico Park',
      tags: ['Multiplayer', 'Puzzle', 'Cute'],
      description: 'Work together with friends to solve puzzles in this charming cooperative game.',
      review: 'Very Positive',
      releaseDate: 'May 7, 2021',
      platforms: ['win', 'mac', 'ns', 'ps', 'xbox'],
      thumb: 'img/games/pp-thumb.jpg',
      topThumb: 'img/games/pp-thumb_tall.jpg',
      gallery: ['img/games/pp-1.jpg', 'img/games/pp-2.jpg', 'img/games/pp-3.jpg', 'img/games/pp-4.jpg'],
      category: 'multi'
    },
    {
      id: 'cod',
      title: 'Call of Duty®: Black Ops III',
      tags: ['FPS', 'Multiplayer', 'Action'],
      description: 'A dark, twisted future where lines blur between humanity and military robotics.',
      review: 'Very Positive',
      releaseDate: 'Nov 6, 2015',
      platforms: ['win', 'ps', 'xbox'],
      thumb: 'img/games/bo3-thumb.jpg',
      topThumb: 'img/games/bo3-thumb_tall.jpg',
      gallery: ['img/games/bo3-1.jpg', 'img/games/bo3-2.jpg', 'img/games/bo3-3.jpg', 'img/games/bo3-4.jpg'],
      category: 'multi'
    },
    {
      id: 'sts2',
      title: 'Slay the Spire II',
      tags: ['Roguelike', 'Deckbuilding', 'Strategy'],
      description: 'The ultimate roguelike deckbuilder returns. New perils demand sharper strategies.',
      review: 'Overwhelmingly Positive',
      releaseDate: 'Mar 6, 2026',
      platforms: ['win', 'mac'],
      thumb: 'img/games/sts2-thumb.jpg',
      topThumb: 'img/games/sts2-thumb_tall.jpg',
      gallery: ['img/games/sts2-1.jpg', 'img/games/sts2-2.jpg', 'img/games/sts2-3.jpg', 'img/games/sts2-4.jpg'],
      category: 'multi'
    }
  ];

  /* ---------- PNG platform icons ---------- */
  const platformIcons = {
    win: '<img src="img/platforms/win.png" alt="Windows" class="platform-icon">',
    mac: '<img src="img/platforms/mac.png" alt="Mac" class="platform-icon">',
    ps:  '<img src="img/platforms/ps.png" alt="PlayStation" class="platform-icon">',
    xbox:'<img src="img/platforms/xbox.png" alt="Xbox" class="platform-icon">',
    ns:  '<img src="img/platforms/ns.png" alt="Nintendo Switch" class="platform-icon">'
  };

  const state = {
    all: { activeGameId: null, hoverTimeout: null }
  };
  let currentPage = 'all';

  /* ---------- render game list ---------- */
  function renderGameList() {
    const listEl = document.getElementById('gameListAll');
    if (!listEl) return;
    listEl.innerHTML = '';
    games.forEach(game => {
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
        if (state.all.hoverTimeout) clearTimeout(state.all.hoverTimeout);
        state.all.hoverTimeout = setTimeout(() => setActiveGame(game.id), 100);
      });
      item.addEventListener('mouseleave', () => {
        if (state.all.hoverTimeout) clearTimeout(state.all.hoverTimeout);
      });
      listEl.appendChild(item);
    });
  }

  function setActiveGame(gameId) {
    if (state.all.activeGameId === gameId) return;
    const listEl = document.getElementById('gameListAll');
    listEl.querySelectorAll('.game-item').forEach(el => el.classList.remove('active'));
    const target = listEl.querySelector(`.game-item[data-game-id="${gameId}"]`);
    if (target) {
      target.classList.add('active');
      state.all.activeGameId = gameId;
      updatePreview(gameId);
      const panel = document.getElementById('previewPanelAll');
      if (panel) {
        panel.classList.add('highlight');
        setTimeout(() => panel.classList.remove('highlight'), 600);
      }
    }
  }

  function updatePreview(gameId) {
    const game = games.find(g => g.id === gameId);
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
              <img src="${c}" alt="Screenshot ${i+1}" class="preview-gallery-img">
            </div>`).join('')}
        </div>`;
      contentEl.classList.remove('fading');
      contentEl.querySelectorAll('.preview-gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', function () {
          contentEl.querySelectorAll('.preview-gallery-thumb').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }, 150);
  }

  function navigateTo(pageKey, skipScroll = false) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(`page-${pageKey}`);
    if (section) section.classList.add('active');
    currentPage = pageKey;
    if (pageKey === 'about') {
      document.getElementById('globalSearch').value = '';
      document.getElementById('searchDropdown').classList.remove('show');
    }
    state.all.activeGameId = null;
    if (state.all.hoverTimeout) clearTimeout(state.all.hoverTimeout);
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
    if (hash === 'about') navigateTo('about');
    else navigateTo('all');
  });

  const initialHash = window.location.hash.replace('#', '');
  if (initialHash === 'about') navigateTo('about');
  else navigateTo('all', true);

  renderGameList();

  /* logo scroll to top (if on same page) */
  document.getElementById('logoTop').addEventListener('click', function(e) {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  /* hero carousel */
  let currentSlide = 0;
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('hero__slide--active'));
    dots.forEach(d => d.classList.remove('hero__dot--active'));
    currentSlide = index;
    slides[currentSlide].classList.add('hero__slide--active');
    dots[currentSlide].classList.add('hero__dot--active');
  }
  document.getElementById('heroNext').addEventListener('click', () => goToSlide((currentSlide + 1) % slides.length));
  document.getElementById('heroPrev').addEventListener('click', () => goToSlide((currentSlide - 1 + slides.length) % slides.length));
  dots.forEach(d => d.addEventListener('click', () => goToSlide(parseInt(d.dataset.slide))));
  setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

  window.addEventListener('scroll', () => document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20));
})();