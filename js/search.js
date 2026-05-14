// js/search.js – Global search (relative paths)
(function() {
  const searchInput = document.getElementById('globalSearch');
  const searchDropdown = document.getElementById('searchDropdown');
  if (!searchInput || !searchDropdown) return;

  // Determine base path depending on current location
  const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  const isGlobalPage = window.location.pathname.includes('/global_pages/') && !window.location.pathname.includes('/game/');
  const isGamePage = window.location.pathname.includes('/game/');

  let imgBase = '';
  let linkBase = '';

  if (isRoot) {
    imgBase = 'assets/img/games/';
    linkBase = 'global_pages/game/';
  } else if (isGlobalPage) {
    imgBase = '../assets/img/games/';
    linkBase = 'game/';
  } else if (isGamePage) {
    imgBase = '../../assets/img/games/';
    linkBase = '';
  } else {
    imgBase = '../assets/img/games/';
    linkBase = 'game/';
  }

  function showDropdown(results) {
    searchDropdown.innerHTML = '';
    if (!results.length) {
      searchDropdown.classList.remove('show');
      return;
    }
    results.forEach(game => {
      const item = document.createElement('div');
      item.className = 'search-dropdown-item';
      const thumbFile = game.thumb.split('/').pop();
      item.innerHTML = `
        <div class="game-thumb-small"><img src="${imgBase}${thumbFile}" alt="${game.title}" class="game-thumb-small-img"></div>
        <span class="game-title-small">${game.title}</span>
        <span class="game-price-small">${game.releaseDate}</span>
      `;
      item.addEventListener('click', () => {
        window.location.href = `${linkBase}${game.id}.html`;
      });
      searchDropdown.appendChild(item);
    });
    searchDropdown.classList.add('show');
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      searchDropdown.classList.remove('show');
      return;
    }
    const matches = GAMES_CATALOG.filter(g =>
      g.title.toLowerCase().includes(query) ||
      g.tags.some(t => t.toLowerCase().includes(query))
    );
    showDropdown(matches);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-search')) searchDropdown.classList.remove('show');
  });
})();