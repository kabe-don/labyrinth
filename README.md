# LABYRINTH – Game Discovery Platform

**Labyrinth** is a modern, fully front‑end game discovery hub that helps players find their next adventure. Built with pure HTML, CSS, and JavaScript, it offers a sleek, immersive browsing experience.

## Features
- **Splash screen** with loading animation.
- **Hero carousel** with auto‑playing video trailers and game details.
- **Global search** across all games (supports partial title and tag matching).
- **Single Player & Multiplayer category pages** with interactive slideshows and curated picks.
- **8 detailed game pages** with description, screenshots, system requirements, reviews, and beginner guides.
- **FAQ & Contact pages** with accordion‑style FAQs and a clean contact card.
- **Fully responsive** design that works on desktop, tablet, and mobile.

## Tech Stack
- HTML5
- CSS3 (custom properties, backdrop‑filter, flex/grid, keyframe animations)
- Vanilla JavaScript (ES6, DOM manipulation, search, carousel logic)
- Google Fonts & Font Awesome icons
- External video trailers (`.mp4`) and game screenshots

## Project Structure ("NOT UPDATED")
labyrinth/
├── index.html # Home page
├── about.html # About section (in‑page on index)
├── singleplayer.html # Single‑Player category
├── multiplayer.html # Multiplayer category
├── faqs.html # Frequently Asked Questions
├── contacts.html # Contact page
├── game/ # Individual game detail pages
│ ├── stardew.html
│ ├── rdr2.html
│ ├── itt.html
│ ├── graveyard.html
│ ├── alittle.html
│ ├── picopark.html
│ ├── cod.html
│ └── sts2.html
├── css/
│ ├── style.css # Main stylesheet (shared across pages)
│ ├── game.css # Styles specific to game detail pages
│ └── category-styles.css # Styles for category pages
├── js/
│ ├── script.js # Main JavaScript (splash, carousel, preview, search)
│ ├── search.js # Search functionality for game pages
│ └── category-script.js # Script for category slideshows & video overlays
├── img/ # Game thumbnails, cover art, icons, banners, etc.
├── game_trailer/ # Hero carousel video files (STS2.mp4, RDR2.mp4, ...)
├── sp vid/ & mp vid/ # Trailer videos for category slideshows
└── platform icons/ # Platform icon images (Windows, Mac, PS, Xbox, Switch)


## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/kabe-don/labyrinth.git
