/**
 * category-script.js – Category Slideshow & Video Overlay Controller
 * ------------------------------------------------------------------
 * This script powers the hero slideshow on category pages (e.g., Singleplayer, Multiplayer).
 * It dynamically populates slide content from a global GAMES_CATALOG array,
 * handles video playback with an infinite loop, full‑screen expansion overlay,
 * and automatic slide advancement.
 *
 * Path handling: Because many file names contain spaces or special characters,
 * a fixPath() function prepends '../' and applies encodeURI() to avoid broken URLs
 * when this script runs from a subdirectory (e.g., /category/).
 *
 * The video loops seamlessly using requestAnimationFrame instead of the native
 * loop attribute, allowing a smoother restart when the video is near its end.
 * Audio is initially muted until the user interacts (clicking arrows or dots),
 * complying with browser autoplay policies.
 *
 * The overlay expansion moves the <video> element into a full‑screen container,
 * adds controls, and unmutes it. Collapsing returns the video to the slideshow.
 */

(function() {
  // ---------------------------------------------------------------------------
  // 1. Initialization – determine category and filter the game catalogue
  // ---------------------------------------------------------------------------

  // Read the data-category attribute from <body>.
  // This value is set by the server or static HTML: "singleplayer" or "multiplayer".
  const category = document.body.dataset.category || 'singleplayer';

  // GAMES_CATALOG is defined globally (in data/catalog.js or similar).
  // Map the UI category names to the internal keys used in the catalog:
  // "singleplayer" → "single"  |  "multiplayer" → "multi"
  const gamesInCategory = GAMES_CATALOG.filter(g =>
    g.category === (category === 'singleplayer' ? 'single' : 'multi')
  );

  // The slides array is exactly the list of games in this category.
  const slides = gamesInCategory;

  // ---------------------------------------------------------------------------
  // 2. State variables
  // ---------------------------------------------------------------------------
  let currentSlide = 0;            // Index of the currently displayed slide
  let autoAdvanceTimer = null;     // setTimeout ID for automatic advancing
  let isExpanded = false;          // Whether the video overlay is open
  let userInteracted = false;      // Has the user clicked an arrow or dot?
  let videoLoopFrame = null;       // requestAnimationFrame ID for the seamless loop

  // ---------------------------------------------------------------------------
  // 3. DOM element references
  // ---------------------------------------------------------------------------
  const slideLeft          = document.getElementById('slideLeft');          // Left panel (info)
  const slideCover         = document.getElementById('slideCover');         // Cover <img>
  const slideDescription   = document.getElementById('slideDescription');   // Game description paragraph
  const slideMeta          = document.getElementById('slideMeta');          // Dev/Publisher/Date container
  const slideStars         = document.getElementById('slideStars');         // Star rating text (★★★★★)
  const slideRatingText    = document.getElementById('slideRatingText');    // "4.5 / 5"
  const slideVideo         = document.getElementById('slideVideo');         // <video> element
  const slideRight         = document.getElementById('slideRight');         // Right panel containing the video
  const heroBgImage        = document.getElementById('heroBgImage');        // Hero background container
  const dotsContainer      = document.getElementById('slideshowDots');      // Navigation dots container

  // Full‑screen overlay elements
  const videoOverlay           = document.getElementById('videoOverlay');            // The overlay backdrop
  const videoOverlayContainer  = document.getElementById('videoOverlayContainer');    // Wrapper for the video
  const videoOverlayClose      = document.getElementById('videoOverlayClose');        // Close button

  // ---------------------------------------------------------------------------
  // 4. Utility: Fix file paths for category pages
  // ---------------------------------------------------------------------------
  /**
   * fixPath – Prepend '../' and encode special characters.
   * Absolute URLs (http/https) are returned unchanged.
   * Paths already starting with '../' or '/' are not re‑prepended.
   * This is necessary because this script runs from a subdirectory like /category/,
   * while assets are often in the root or another sibling folder.
   */
  function fixPath(path) {
    if (!path) return '';
    // Leave external URLs untouched
    if (path.startsWith('http://') || path.startsWith('https://')) return path;

    let newPath = path;
    // Prepend '../' only if the path is relative and doesn't already start with it
    if (!path.startsWith('../') && !path.startsWith('/')) {
      newPath = '../' + newPath;
    }

    // Encode spaces, parentheses, etc. – prevents broken image/video URLs
    return encodeURI(newPath);
  }

  // ---------------------------------------------------------------------------
  // 5. Navigation dots
  // ---------------------------------------------------------------------------
  function buildDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.dataset.index = idx;
      dot.addEventListener('click', () => {
        // A click on a dot counts as user interaction → unmute audio
        enableAudio();
        updateSlide(idx);
      });
      dotsContainer.appendChild(dot);
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Auto‑advance control
  // ---------------------------------------------------------------------------
  function clearAutoAdvance() {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }

  /**
   * startAutoAdvance – Schedule the next slide.
   * Uses the slide’s own `duration` property (ms) if available, otherwise 30 seconds.
   * Does nothing if the video overlay is currently expanded.
   */
  function startAutoAdvance() {
    clearAutoAdvance();
    if (isExpanded) return;
    const duration = slides[currentSlide].duration || 30000;
    autoAdvanceTimer = setTimeout(() => nextSlide(), duration);
  }

  // ---------------------------------------------------------------------------
  // 7. Audio handling (browser autoplay policy)
  // ---------------------------------------------------------------------------
  /**
   * enableAudio – Unmute the video after the first user gesture.
   * Once `userInteracted` is true, the video can play with sound.
   */
  function enableAudio() {
    if (userInteracted) return;
    userInteracted = true;
    slideVideo.muted = false;
    slideVideo.play().catch(() => {});
  }

  // ---------------------------------------------------------------------------
  // 8. Seamless video loop via requestAnimationFrame
  // ---------------------------------------------------------------------------
  /**
   * videoLoopTick – Check every frame if the video has reached (or almost reached)
   * its end. If so, reset currentTime to 0 and play again.
   * This avoids a brief black flash that can occur with the native `loop` attribute.
   * Only runs when the video is NOT expanded.
   */
  function videoLoopTick() {
    if (isExpanded) {
      // While expanded, keep the loop alive but do nothing – just request next frame
      videoLoopFrame = requestAnimationFrame(videoLoopTick);
      return;
    }
    // Using a small threshold (0.25 sec) prevents missing the exact end
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
    if (videoLoopFrame) cancelAnimationFrame(videoLoopFrame);
    videoLoopFrame = null;
  }

  // ---------------------------------------------------------------------------
  // 9. Video overlay expansion / collapse
  // ---------------------------------------------------------------------------
  /**
   * expandVideo – Open the full‑screen overlay.
   * Moves the <video> element from the slideshow into the overlay container,
   * enables controls, unmutes, and starts playback.
   * Disables auto‑advance and the manual loop while expanded.
   */
  function expandVideo() {
    if (isExpanded) return;
    isExpanded = true;
    clearAutoAdvance();
    stopVideoLoop();

    // Add a helper class to the right panel to show the placeholder (if any)
    slideRight.classList.add('has-video-expanded');

    // Physically move the video element to the overlay container
    videoOverlayContainer.appendChild(slideVideo);

    // Enable native controls and sound
    slideVideo.controls = true;
    slideVideo.muted = false;
    slideVideo.play().catch(() => {});

    // Show the overlay
    videoOverlay.classList.add('active');
  }

  /**
   * collapseVideo – Close the overlay and return the video to the slideshow.
   * Restores the previous mute state, removes controls, and restarts auto‑advance.
   */
  function collapseVideo() {
    if (!isExpanded) return;
    isExpanded = false;

    // Hide overlay
    videoOverlay.classList.remove('active');

    // Move video back to its original container (insert before any placeholder)
    slideRight.insertBefore(slideVideo, slideRight.firstChild);
    slideRight.classList.remove('has-video-expanded');

    // Reset video state
    slideVideo.controls = false;
    slideVideo.muted = !userInteracted;   // Re‑mute if user hasn't interacted yet

    // Resume normal operation
    startAutoAdvance();
    startVideoLoop();
    slideVideo.play().catch(() => {});
  }

  // ---------------------------------------------------------------------------
  // 10. Event listeners for overlay / video interaction
  // ---------------------------------------------------------------------------
  // Click on the video inside the slideshow → expand
  slideVideo.addEventListener('click', expandVideo);

  // The placeholder (shown when video can’t autoplay) also expands
  const videoPlaceholder = document.getElementById('videoPlaceholder');
  if (videoPlaceholder) videoPlaceholder.addEventListener('click', expandVideo);

  // Overlay close button (stop propagation to avoid triggering overlay click)
  videoOverlayClose.addEventListener('click', (e) => {
    e.stopPropagation();
    collapseVideo();
  });

  // Click on the dark overlay background → collapse
  videoOverlay.addEventListener('click', (e) => {
    if (e.target === videoOverlay) collapseVideo();
  });

  // Escape key collapses overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isExpanded) collapseVideo();
  });

  // ---------------------------------------------------------------------------
  // 11. Slide update logic
  // ---------------------------------------------------------------------------
  /**
   * updateSlide(index)
   * Populates all slide elements with data from the selected game object.
   * Handles cover image, description, meta info, background, stars, and video.
   * Also attaches a click handler to the left panel that navigates to the game’s detail page.
   */
  function updateSlide(index) {
    // If overlay is open, close it first
    if (isExpanded) collapseVideo();

    const slide = slides[index];

    // --- Cover image (prefer topThumb, fallback to other thumbs) ---
    const coverSrc = slide.topThumb || slide.categoryThumb || slide.thumb;
    const fixedCover = fixPath(coverSrc);
    slideCover.src = fixedCover;

    // --- Text content ---
    slideDescription.textContent = slide.description;
    slideMeta.innerHTML =
      `<strong>Developer:</strong> ${slide.developer}<br>` +
      `<strong>Publisher:</strong> ${slide.publisher}<br>` +
      `<strong>Release Date:</strong> ${slide.releaseDate}`;

    slideStars.textContent = slide.stars;          // e.g., "★★★★★"
    slideRatingText.textContent = `${slide.rating} / 5`;

    // --- Hero background image ---
    const bgSrc = fixPath(slide.bgImage || coverSrc);
    heroBgImage.style.backgroundImage = `url('${bgSrc}')`;

    // --- Make the left info panel clickable → game detail page ---
    if (slideLeft) {
      slideLeft.style.cursor = 'pointer';
      slideLeft.onclick = () => {
        // Navigate to game/some-id.html relative to current directory
        window.location.href = `game/${slide.id}.html`;
      };
    }

    // --- Video setup ---
    stopVideoLoop();
    slideVideo.loop = false;        // We handle looping manually
    slideVideo.autoplay = true;
    slideVideo.controls = false;
    slideVideo.muted = !userInteracted;   // Mute until user gesture

    const videoSrc = fixPath(slide.video);

    // Remove any previous <source> elements
    while (slideVideo.firstChild) {
      slideVideo.removeChild(slideVideo.firstChild);
    }

    // Append a new <source> with the encoded video URL
    const source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';
    slideVideo.appendChild(source);

    // Load the new source and start playback
    slideVideo.load();
    startVideoLoop();
    slideVideo.play().catch(e => console.warn('Video autoplay blocked:', e));

    // --- Update navigation dots ---
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // --- Update state and restart auto‑advance ---
    currentSlide = index;
    startAutoAdvance();
  }

  // ---------------------------------------------------------------------------
  // 12. Slide navigation helpers
  // ---------------------------------------------------------------------------
  function nextSlide() {
    updateSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    updateSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  // ---------------------------------------------------------------------------
  // 13. Bind navigation buttons
  // ---------------------------------------------------------------------------
  document.getElementById('nextBtn').addEventListener('click', () => {
    enableAudio();   // Click counts as user interaction
    nextSlide();
  });
  document.getElementById('prevBtn').addEventListener('click', () => {
    enableAudio();
    prevSlide();
  });

  // ---------------------------------------------------------------------------
  // 14. Initial setup
  // ---------------------------------------------------------------------------
  buildDots();
  updateSlide(0);   // Display the first slide

  // ---------------------------------------------------------------------------
  // 15. Header scroll effect
  // ---------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  });
})();