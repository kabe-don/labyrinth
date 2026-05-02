(function() {
  const games = [
    { id:'rdr2', title:'Red Dead Redemption 2', thumb:'rdr2-thumb.jpg', releaseDate:'Oct 26, 2018', tags:['Action','Adventure','Open World'] },
    { id:'stardew', title:'Stardew Valley', thumb:'sv-thumb.jpg', releaseDate:'Feb 26, 2016', tags:['RPG','Simulation','Cozy'] },
    { id:'itt', title:'It Takes Two', thumb:'itt-thumb.jpg', releaseDate:'Mar 26, 2021', tags:['Co-op','Adventure','Story Rich'] },
    { id:'graveyard', title:'Graveyard Keeper', thumb:'gk-thumb.jpg', releaseDate:'Aug 15, 2018', tags:['RPG','Simulation','Dark Humor'] },
    { id:'alittle', title:'A Little to the Left', thumb:'alttl-thumb.jpg', releaseDate:'Nov 8, 2022', tags:['Puzzle','Cozy','Strategy'] },
    { id:'picopark', title:'Pico Park', thumb:'pp-thumb.jpg', releaseDate:'May 7, 2021', tags:['Multiplayer','Puzzle','Cute'] },
    { id:'cod', title:'Call of Duty®: Black Ops III', thumb:'bo3-thumb.jpg', releaseDate:'Nov 6, 2015', tags:['FPS','Multiplayer','Action'] },
    { id:'sts2', title:'Slay the Spire II', thumb:'sts2-thumb.jpg', releaseDate:'Mar 6, 2026', tags:['Roguelike','Deckbuilding','Strategy'] }
  ];

  const searchInput = document.getElementById('globalSearch');
  const searchDropdown = document.getElementById('searchDropdown');

  const isGamePage = window.location.pathname.includes('/game/');
  const imgBase = isGamePage ? '../img/games/' : 'img/games/';
  const linkBase = isGamePage ? '' : 'game/';

  function showDropdown(results) {
    searchDropdown.innerHTML = '';
    if (!results.length) { searchDropdown.classList.remove('show'); return; }
    results.forEach(g => {
      const item = document.createElement('div');
      item.className = 'search-dropdown-item';
      item.innerHTML = `<div class="game-thumb-small"><img src="${imgBase}${g.thumb}" alt="${g.title}" class="game-thumb-small-img"></div><span class="game-title-small">${g.title}</span><span class="game-price-small">${g.releaseDate}</span>`;
      item.addEventListener('click', () => {
        window.location.href = `${linkBase}${g.id}.html`;
      });
      searchDropdown.appendChild(item);
    });
    searchDropdown.classList.add('show');
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) { searchDropdown.classList.remove('show'); return; }
    const matches = games.filter(g => g.title.toLowerCase().includes(query) || g.tags.some(t => t.toLowerCase().includes(query)));
    showDropdown(matches);
  });

  document.addEventListener('click', e => { if (!e.target.closest('.nav-search')) searchDropdown.classList.remove('show'); });
})();