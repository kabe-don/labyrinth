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

## Project Structure (UPDATED AS OF 05/14/2026)
labyrinth/
│
├── index.html
│
├── assets/
│   ├── img/
│   │   ├── banners/
│   │   │   ├── multiplayer-bg.jpg
│   │   │   └── singleplayer-bg.jpg
│   │   ├── games/
│   │   │   ├── alttl-1.png
│   │   │   ├── alttl-2.png
│   │   │   ├── alttl-3.jpg
│   │   │   ├── alttl-4.jpg
│   │   │   ├── alttl-cover.jpg
│   │   │   ├── alttl-thumb.jpg
│   │   │   ├── alttl-thumb_tall.jpg
│   │   │   ├── bo3-1.jpg
│   │   │   ├── bo3-2.jpg
│   │   │   ├── bo3-3.jpg
│   │   │   ├── bo3-4.jpg
│   │   │   ├── bo3-cover.jpg
│   │   │   ├── bo3-thumb.jpg
│   │   │   ├── bo3-thumb_tall.jpg
│   │   │   ├── gk-1.jpg
│   │   │   ├── gk-2.jpg
│   │   │   ├── gk-3.jpg
│   │   │   ├── gk-4.jpg
│   │   │   ├── gk-thumb.jpg
│   │   │   ├── gk-thumb_tall.jpg
│   │   │   ├── itt-1.jpg
│   │   │   ├── itt-2.jpg
│   │   │   ├── itt-3.jpg
│   │   │   ├── itt-4.jpg
│   │   │   ├── itt-cover.jpg
│   │   │   ├── itt-thumb.jpg
│   │   │   ├── itt-thumb_tall.jpg
│   │   │   ├── pp-1.jpg
│   │   │   ├── pp-2.jpg
│   │   │   ├── pp-3.jpg
│   │   │   ├── pp-4.jpg
│   │   │   ├── pp-thumb.jpg
│   │   │   ├── pp-thumb_tall.jpg
│   │   │   ├── rdr2-1.jpg
│   │   │   ├── rdr2-2.jpg
│   │   │   ├── rdr2-3.jpg
│   │   │   ├── rdr2-4.jpg
│   │   │   ├── rdr2-cover.jpg
│   │   │   ├── rdr2-thumb.jpg
│   │   │   ├── rdr2-thumb_tall.jpg
│   │   │   ├── sts2-1.jpg
│   │   │   ├── sts2-2.jpg
│   │   │   ├── sts2-3.jpg
│   │   │   ├── sts2-4.jpg
│   │   │   ├── sts2-cover.jpg
│   │   │   ├── sts2-thumb.jpg
│   │   │   ├── sts2-thumb_tall.jpg
│   │   │   ├── sv-1.jpg
│   │   │   ├── sv-2.jpg
│   │   │   ├── sv-3.jpg
│   │   │   ├── sv-4.jpg
│   │   │   ├── sv-cover.jpg
│   │   │   ├── sv-thumb.jpg
│   │   │   └── sv-thumb_tall.jpg
│   │   ├── mp img/
│   │   │   ├── cod photoc.webp
│   │   │   ├── itt photoc.webp
│   │   │   ├── pp cover.jpg
│   │   │   ├── pp photoc2.jpg
│   │   │   └── sts2 cover.jpg
│   │   ├── platforms/
│   │   │   ├── mac.png
│   │   │   ├── ns.png
│   │   │   ├── ps.png
│   │   │   ├── steam.png
│   │   │   ├── win.png
│   │   │   └── xbox.png
│   │   ├── sp img/
│   │   │   ├── alttl photoc.png
│   │   │   ├── gk photoc.jpg
│   │   │   ├── rdr2 photoc.png
│   │   │   └── sv photoc.png
│   │   └── web_logo.png
│   │
│   ├── vid/
│   │   ├── hero/
│   │   │   ├── ALTTL.mp4
│   │   │   ├── BO3.mp4
│   │   │   ├── GK.mp4
│   │   │   ├── ITT.mp4
│   │   │   ├── PP.mp4
│   │   │   ├── RDR2.mp4
│   │   │   ├── STS2.mp4
│   │   │   └── SV.mp4
│   │   ├── mp vid/
│   │   │   ├── cod vid.mp4
│   │   │   ├── itt vid.mp4
│   │   │   ├── pp vid.mp4
│   │   │   └── sts2 vid.mp4
│   │   └── sp vid/
│   │       ├── alttl vid.mp4
│   │       ├── gk vid.mp4
│   │       ├── rdr2 vid.mp4
│   │       └── sv vid.mp4
│   │
│   └── dev/
│       ├── djbv.png
│       ├── ecp.png
│       ├── jag.png
│       ├── jfmb.png
│       ├── kacp.png
│       ├── kmdp.png
│       ├── ldgc.png
│       ├── rivdj.png
│       └── rmi.png
│
├── css/
│   ├── category-styles.css
│   ├── game.css
│   ├── responsive.css
│   └── style.css
│
├── js/
│   ├── category-script.js
│   ├── data.js
│   ├── script.js
│   └── search.js
│
├── global_pages/
│   ├── about.html
│   ├── contacts.html
│   ├── creator.html
│   ├── faqs.html
│   ├── multiplayer.html
│   ├── references.html
│   ├── singleplayer.html
│   │
│   └── game/
│       ├── alittle.html
│       ├── cod.html
│       ├── graveyard.html
│       ├── itt.html
│       ├── picopark.html
│       ├── rdr2.html
│       ├── stardew.html
│       └── sts2.html
│
├── .gitattributes
├── LICENSE
└── README


## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/kabe-don/labyrinth.git
