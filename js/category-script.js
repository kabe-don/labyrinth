(function() {
  /* ========== DETECT CATEGORY ========== */
  const category = document.body.dataset.category || 'singleplayer';
  const isMultiplayer = category === 'multiplayer';

  /* ========== SHARED SEARCH DATA ========== */
  const games = [
    { id:'rdr2', title:'Red Dead Redemption 2', thumb:'img/games/rdr2-thumb.jpg', releaseDate:'Oct 26, 2018', tags:['Action','Adventure','Open World'] },
    { id:'stardew', title:'Stardew Valley', thumb:'img/games/sv-thumb.jpg', releaseDate:'Feb 26, 2016', tags:['RPG','Simulation','Cozy'] },
    { id:'itt', title:'It Takes Two', thumb:'img/games/itt-thumb.jpg', releaseDate:'Mar 26, 2021', tags:['Co-op','Adventure','Story Rich'] },
    { id:'graveyard', title:'Graveyard Keeper', thumb:'img/games/gk-thumb.jpg', releaseDate:'Aug 15, 2018', tags:['RPG','Simulation','Dark Humor'] },
    { id:'alittle', title:'A Little to the Left', thumb:'img/games/alttl-thumb.jpg', releaseDate:'Nov 8, 2022', tags:['Puzzle','Cozy','Strategy'] },
    { id:'picopark', title:'Pico Park', thumb:'img/games/pp-thumb.jpg', releaseDate:'May 7, 2021', tags:['Multiplayer','Puzzle','Cute'] },
    { id:'cod', title:'Call of Duty: Black Ops III', thumb:'img/games/bo3-thumb.jpg', releaseDate:'Nov 6, 2015', tags:['FPS','Multiplayer','Action'] },
    { id:'sts2', title:'Slay the Spire II', thumb:'img/games/sts2-thumb.jpg', releaseDate:'Mar 6, 2026', tags:['Roguelike','Deckbuilding','Strategy'] }
  ];

  /* ========== SLIDE DATA (matching dedicated game pages) ========== */
  const allSlides = {
    singleplayer: [
      {
        cover: 'img/sp img/sv cover.jpg',
        bg: 'img/games/sv-cover.jpg',
        video: 'game_trailer/sp vid/sv vid.mp4',
        description: 'Stardew Valley is a relaxing farming simulation where you inherit an old farm and work to restore it. Grow crops, raise animals, fish, mine, and build relationships with the townspeople of Pelican Town. The game has no strict time pressure, letting you play at your own pace and choose your own goals.',
        developer: 'ConcernedApe',
        publisher: 'ConcernedApe',
        date: 'February 27, 2016',
        stars: '★★★★★',
        rating: '4.9 / 5',
        duration: 35000
      },
      {
        cover: 'img/games/rdr2-thumb.jpg',
        bg: 'img/games/rdr2-thumb.jpg',
        video: 'game_trailer/sp vid/rdr2 vid.mp4',
        description: 'Red Dead Redemption 2 is an epic action‑adventure game set in the rugged landscapes of America during the decline of the Wild West. Players step into the role of Arthur Morgan, a loyal member of the Van der Linde gang, as he navigates a world filled with conflict, survival, and personal struggles.',
        developer: 'Rockstar Games',
        publisher: 'Rockstar Games',
        date: 'October 26, 2018',
        stars: '★★★★☆',
        rating: '4.6 / 5',
        duration: 24000
      },
      {
        cover: 'img/games/alttl-thumb.jpg',
        bg: 'img/games/alttl-cover.jpg',
        video: 'game_trailer/sp vid/alttl vid.mp4',
        description: 'A Little to the Left is a cozy puzzle game centered around organizing everyday household objects into satisfying arrangements. Players solve intuitive yet clever puzzles by sorting, stacking, and aligning items in visually pleasing ways. With its relaxing atmosphere, charming art style, and light humor, the game offers a calming experience that rewards attention to detail.',
        developer: 'Max Inferno',
        publisher: 'Secret Mode',
        date: 'November 8, 2022',
        stars: '★★★★☆',
        rating: '4.0 / 5',
        duration: 31000
      },
      {
        cover: 'img/games/gk-thumb.jpg',
        bg: 'img/games/gk-thumb.jpg',
        video: 'game_trailer/sp vid/gk vid.mp4',
        description: 'Graveyard Keeper is a dark, medieval management game where you run and improve a graveyard while trying to find a way back home. You bury bodies, craft items, farm, and interact with villagers. The game features a large technology tree and interconnected systems that unlock over time.',
        developer: 'Lazy Bear Games',
        publisher: 'tinyBuild',
        date: 'August 15, 2018',
        stars: '★★★★☆',
        rating: '4.3 / 5',
        duration: 30000
      }
    ],
    multiplayer: [
      {
        cover: 'img/games/sts2-thumb.jpg',
        bg: 'img/games/sts2-cover.jpg',
        video: 'game_trailer/mp vid/sts2 vid.mp4',
        description: 'Slay the Spire II is a strategic deck‑building roguelike game where players climb a mysterious tower filled with enemies, treasures, and challenges. Each run is unique, requiring players to adapt their strategy based on the cards they collect. The sequel expands on the original with new mechanics, characters, and multiplayer elements.',
        developer: 'MegaCrit',
        publisher: 'MegaCrit',
        date: 'March 6, 2026',
        stars: '★★★★☆',
        rating: '4.5 / 5',
        duration: 33000
      },
      {
        cover: 'img/games/itt-thumb.jpg',
        bg: 'img/games/itt-cover.jpg',
        video: 'game_trailer/mp vid/itt vid.mp4',
        description: 'It Takes Two is a genre-bending, co-op only platform adventure developed by Hazelight Studios. The game follows the clashing couple Cody and May, who are magically transformed into dolls and trapped in a fantastical world. To mend their fractured relationship and return home, they must navigate a whimsical, ever-changing world where literally every level introduces a brand new gameplay mechanic.',
        developer: 'Hazelight Studios',
        publisher: 'Electronic Arts',
        date: 'March 25, 2021',
        stars: '★★★★★',
        rating: '4.8 / 5',
        duration: 38000
      },
      {
        cover: 'img/mp img/pp cover.jpg',
        bg: 'img/games/pp-thumb.jpg',
        video: 'game_trailer/mp vid/pp vid.mp4',
        description: 'Pico Park is a fun cooperative puzzle game where players must work together to complete levels. Each stage requires teamwork, communication, and coordination to solve challenges. The game supports local and online multiplayer, making it ideal for friends. Its simple design hides surprisingly tricky puzzles that become more complex as you progress.',
        developer: 'TECOPARK',
        publisher: 'TECOPARK',
        date: 'May 7, 2021',
        stars: '★★★★☆',
        rating: '4.5 / 5',
        duration: 38000
      },
      {
        cover: 'img/games/bo3-thumb.jpg',
        bg: 'img/games/bo3-cover.jpg',
        video: 'game_trailer/mp vid/cod vid.mp4',
        description: 'Call of Duty: Black Ops III is a futuristic military shooter set in 2065, where cybernetic enhancements and robotic warfare have redefined the battlefield. It is best known for its momentum‑based movement system, allowing fluid wall‑running, sliding, and thrust‑jumping.',
        developer: 'Treyarch',
        publisher: 'Activision',
        date: 'November 6, 2015',
        stars: '★★★★☆',
        rating: '4.7 / 5',
        duration: 38000
      }
    ]
  };

  const slides = allSlides[category] || allSlides.singleplayer;
  let currentSlide = 0;
  let autoAdvanceTimer = null;
  let isExpanded = false;
  let userInteracted = false;
  let videoLoopFrame = null;

  const slideCover = document.getElementById('slideCover');
  const slideDescription = document.getElementById('slideDescription');
  const slideMeta = document.getElementById('slideMeta');
  const slideStars = document.getElementById('slideStars');
  const slideRatingText = document.getElementById('slideRatingText');
  const slideVideo = document.getElementById('slideVideo');
  const slideRight = document.getElementById('slideRight');
  const heroBgImage = document.getElementById('heroBgImage');
  const dots = document.querySelectorAll('.dot');

  const videoOverlay = document.getElementById('videoOverlay');
  const videoOverlayContainer = document.getElementById('videoOverlayContainer');
  const videoOverlayClose = document.getElementById('videoOverlayClose');

  // ---------- VOLUME FIX ----------
  slideVideo.volume = 0.5;

  /* ---------- TIMER MGMT ---------- */
  function clearAutoAdvance() {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
  }

  function startAutoAdvance() {
    clearAutoAdvance();
    if (isExpanded) return;
    const duration = slides[currentSlide].duration;
    autoAdvanceTimer = setTimeout(() => {
      try { nextSlide(); } catch (err) { console.error(err); }
    }, duration);
  }

  /* ---------- UNMUTE AFTER INTERACTION ---------- */
  function enableAudio() {
    if (userInteracted) return;
    userInteracted = true;
    slideVideo.muted = false;
    slideVideo.play().catch(() => {});
  }

  document.addEventListener('click', enableAudio, { once: true });
  document.addEventListener('keydown', enableAudio, { once: true });
  document.addEventListener('touchstart', enableAudio, { once: true });

  /* ---------- VIDEO LOOP ---------- */
  function videoLoopTick() {
    if (isExpanded) {
      videoLoopFrame = requestAnimationFrame(videoLoopTick);
      return;
    }
    if (slideVideo.duration && slideVideo.currentTime >= slideVideo.duration - 0.25) {
      slideVideo.currentTime = 0;
      slideVideo.play().catch(() => {});
    }
    videoLoopFrame = requestAnimationFrame(videoLoopTick);
  }

  function startVideoLoop() {
    stopVideoLoop();
    videoLoopFrame = requestAnimationFrame(videoLoopTick);
  }

  function stopVideoLoop() {
    if (videoLoopFrame) {
      cancelAnimationFrame(videoLoopFrame);
      videoLoopFrame = null;
    }
  }

  /* ---------- EXPAND / COLLAPSE VIDEO ---------- */
  function expandVideo() {
    if (isExpanded) return;
    isExpanded = true;
    enableAudio();
    clearAutoAdvance();
    stopVideoLoop();
    slideRight.classList.add('has-video-expanded');
    videoOverlayContainer.appendChild(slideVideo);
    slideVideo.controls = true;
    slideVideo.muted = false;
    slideVideo.volume = 0.5;  // ensure half volume
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
    slideVideo.volume = 0.5;
    startAutoAdvance();
    startVideoLoop();
    slideVideo.play().catch(() => {});
  }

  slideVideo.addEventListener('click', expandVideo);
  document.getElementById('videoPlaceholder').addEventListener('click', expandVideo);

  videoOverlayClose.addEventListener('click', (e) => {
    e.stopPropagation();
    collapseVideo();
  });

  videoOverlay.addEventListener('click', (e) => {
    if (e.target === videoOverlay) collapseVideo();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isExpanded) collapseVideo();
  });

  /* ---------- SLIDE LOGIC ---------- */
  function updateSlide(index) {
    if (isExpanded) collapseVideo();
    const slide = slides[index];
    slideCover.src = slide.cover;
    slideDescription.textContent = slide.description;
    slideMeta.innerHTML = `<strong>Developer:</strong> ${slide.developer}<br><strong>Publisher:</strong> ${slide.publisher}<br><strong>Release Date:</strong> ${slide.date}`;
    slideStars.textContent = slide.stars;
    slideRatingText.textContent = slide.rating;
    heroBgImage.style.backgroundImage = `url('${slide.bg}')`;

    stopVideoLoop();
    slideVideo.loop = false;
    slideVideo.autoplay = true;
    slideVideo.controls = false;
    slideVideo.muted = !userInteracted;
    slideVideo.volume = 0.5;   // keep volume at half

    // Clean and reload video source
    slideVideo.removeAttribute('src');
    while (slideVideo.firstChild) {
      slideVideo.removeChild(slideVideo.firstChild);
    }
    const source = document.createElement('source');
    source.src = slide.video;
    source.type = 'video/mp4';
    slideVideo.appendChild(source);
    slideVideo.load();

    startVideoLoop();
    try {
      const playPromise = slideVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name === 'NotAllowedError' && !userInteracted) {
            slideVideo.muted = true;
            return slideVideo.play();
          }
        }).catch(() => {});
      }
    } catch (err) {}

    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentSlide = index;
    startAutoAdvance();
  }

  function nextSlide() { updateSlide((currentSlide + 1) % slides.length); }
  function prevSlide() { updateSlide((currentSlide - 1 + slides.length) % slides.length); }

  document.getElementById('nextBtn').addEventListener('click', () => { enableAudio(); nextSlide(); });
  document.getElementById('prevBtn').addEventListener('click', () => { enableAudio(); prevSlide(); });
  dots.forEach(dot => dot.addEventListener('click', () => { enableAudio(); updateSlide(parseInt(dot.dataset.index)); }));

  /* ---------- HEADER: scroll effect ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---------- HEADER: logo scroll to top ---------- */
  const logo = document.getElementById('logoTop');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- HEADER: search dropdown ---------- */
  const searchInput = document.getElementById('globalSearch');
  const searchDropdown = document.getElementById('searchDropdown');

  function showSearchDropdown(results) {
    searchDropdown.innerHTML = '';
    if (!results || results.length === 0) {
      searchDropdown.classList.remove('show');
      return;
    }
    results.forEach(game => {
      const item = document.createElement('div');
      item.className = 'search-dropdown-item';
      item.innerHTML = `
        <div class="game-thumb-small">
          <img src="${game.thumb}" alt="${game.title}" class="game-thumb-small-img">
        </div>
        <span class="game-title-small">${game.title}</span>
        <span class="game-price-small">${game.releaseDate}</span>   <!-- show release date now -->
      `;
      item.addEventListener('click', () => {
        window.location.href = `game/${game.id}.html`;
      });
      searchDropdown.appendChild(item);
    });
    searchDropdown.classList.add('show');
  }

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    if (!query) {
      searchDropdown.classList.remove('show');
      return;
    }
    const matches = games.filter(g =>
      g.title.toLowerCase().includes(query) ||
      g.tags.some(t => t.toLowerCase().includes(query))
    );
    showSearchDropdown(matches);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-search')) {
      searchDropdown.classList.remove('show');
    }
  });

  // Initialize
  updateSlide(0);
})();