/**
 * search.js – Global Search (Relative Paths)
 * ------------------------------------------------------------------
 * This script adds live search functionality to the header search box.
 * It listens for user input, filters the global GAMES_CATALOG array,
 * and displays a dropdown with matching games.
 *
 * Because the search box appears on multiple pages (homepage, category
 * pages, game detail pages), the script needs to calculate the correct
 * relative paths for both the game thumbnail images and the detail page
 * links.  It does this by examining the current URL structure.
 *
 * Key features:
 *   - Determines base paths based on whether the page is the root,
 *     inside /global_pages/ (but not a game page), or inside /game/.
 *   - Filters games by title and tags (case‑insensitive).
 *   - Renders a dropdown list with thumbnail, title, and release date.
 *   - Clicking an item navigates to the game detail page.
 *   - Hides dropdown when clicking outside the search area.
 * ------------------------------------------------------------------
 */

(function() {
  // DOM references – if either is missing (e.g., on pages without search), exit early
  const searchInput = document.getElementById('globalSearch');
  const searchDropdown = document.getElementById('searchDropdown');
  if (!searchInput || !searchDropdown) return;

  // ---------------------------------------------------------------------------
  // 1. Determine base paths for images and links based on the current page
  // ---------------------------------------------------------------------------

  const isRoot      = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  const isGlobalPage = window.location.pathname.includes('/global_pages/') && !window.location.pathname.includes('/game/');
  const isGamePage  = window.location.pathname.includes('/game/');

  let imgBase  = '';   // Folder prefix for game thumbnails (e.g., "assets/img/games/")
  let linkBase = '';   // Folder prefix for the game detail page URL (e.g., "global_pages/game/")

  if (isRoot) {
    // Homepage (root or index.html) – assets and pages are one level down
    imgBase  = 'assets/img/games/';
    linkBase = 'global_pages/game/';
  } else if (isGlobalPage) {
    // Inside a global_pages folder (e.g., /global_pages/about.html)
    // Need to go up one level to reach the root's assets and game pages
    imgBase  = '../assets/img/games/';
    linkBase = 'game/';          // game pages are in global_pages/game/
  } else if (isGamePage) {
    // Inside a game detail page (e.g., /global_pages/game/abc.html)
    // Need to go up two levels to reach root's assets, and game page is in same folder
    imgBase  = '../../assets/img/games/';
    linkBase = '';               // same directory, no prefix needed
  } else {
    // Fallback for any other structure (e.g., category pages)
    // Most other pages are one level deep inside a subfolder, similar to global_pages
    imgBase  = '../assets/img/games/';
    linkBase = 'game/';
  }

  // ---------------------------------------------------------------------------
  // 2. showDropdown(results)
  //    Renders the search results as a list of clickable items.
  //    Hides the dropdown if no results are found.
  // ---------------------------------------------------------------------------
  function showDropdown(results) {
    // Clear any previous content
    searchDropdown.innerHTML = '';

    if (!results.length) {
      searchDropdown.classList.remove('show');
      return;
    }

    results.forEach(game => {
      const item = document.createElement('div');
      item.className = 'search-dropdown-item';

      // Extract just the filename from the game.thumb path (e.g., "game.jpg")
      // because we will manually prefix the correct folder path.
      const thumbFile = game.thumb.split('/').pop();

      // Build the HTML structure: thumbnail, title, release date
      item.innerHTML = `
        <div class="game-thumb-small">
          <img src="${imgBase}${thumbFile}" alt="${game.title}" class="game-thumb-small-img">
        </div>
        <span class="game-title-small">${game.title}</span>
        <span class="game-price-small">${game.releaseDate}</span>
      `;

      // Clicking the item navigates to the game detail page
      item.addEventListener('click', () => {
        window.location.href = `${linkBase}${game.id}.html`;
      });

      searchDropdown.appendChild(item);
    });

    // Show the dropdown
    searchDropdown.classList.add('show');
  }

  // ---------------------------------------------------------------------------
  // 3. Search input event listener
  //    Fires on every keystroke (input event).
  //    Trims the query, filters GAMES_CATALOG, and calls showDropdown.
  // ---------------------------------------------------------------------------
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    // If the field is empty, hide the dropdown and stop
    if (!query) {
      searchDropdown.classList.remove('show');
      return;
    }

    // Filter the global game catalogue by title or any tag (case‑insensitive)
    const matches = GAMES_CATALOG.filter(g =>
      g.title.toLowerCase().includes(query) ||
      g.tags.some(t => t.toLowerCase().includes(query))
    );

    showDropdown(matches);
  });

  // ---------------------------------------------------------------------------
  // 4. Close dropdown when clicking outside the search component
  //    Uses event delegation on the document: if the click target is not
  //    inside an element with class 'nav-search', the dropdown is hidden.
  // ---------------------------------------------------------------------------
  document.addEventListener('click', e => {
    // closest() checks if the clicked element or any ancestor has the class
    if (!e.target.closest('.nav-search')) {
      searchDropdown.classList.remove('show');
    }
  });
})();