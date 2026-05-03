// js/search.js – Global search using GAMES_CATALOG
(function() {
  const searchInput = document.getElementById('globalSearch');
  const searchDropdown = document.getElementById('searchDropdown');
  if (!searchInput || !searchDropdown) return;

  const isGamePage = window.location.pathname.includes('/game/');
  const imgBase = isGamePage ? '../img/games/' : 'img/games/';
  const linkBase = isGamePage ? '' : 'game/';

  function showDropdown(results) {
    searchDropdown.innerHTML = '';
    if (!results.length) {
      searchDropdown.classList.remove('show');
      return;
    }
    results.forEach(game => {
      const item = document.createElement('div');
      item.className = 'search-dropdown-item';
      item.innerHTML = `
        <div class="game-thumb-small">
          <img src="${imgBase}${game.thumb.split('/').pop()}" alt="${game.title}" class="game-thumb-small-img">
        </div>
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