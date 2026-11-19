# TERREIN — 5-Year Sports Venue Development & Pitch Blueprint (2026–2031)

A clean, minimalist, editorial-style Company Profile web frontend for a 5-year vision sports venue development and rental company specializing in next-generation Futsal and Football (Mini Soccer / Full Pitch) arenas.

---

## 🎨 Visual & Design Concept: The "Ink Reveal"

- **Editorial Aesthetic:** High-contrast obsidian black (`#070808`), bone white (`#f5f4ee`), and deep pitch-emerald accents (`#00e575`, `#062817`).
- **Typography:**
  - Headings: **Syne** (bold, modern condensed editorial display)
  - Body: **Plus Jakarta Sans** (clean, geometric sans-serif)
  - Architectural Specs: **Space Mono** (coordinates, BIM parameters, and engineering metrics)
- **Interactive Ink Reveal Mechanics:**
  - **Hero Liquid Canvas Bleed:** Move your cursor or touch across the architectural blueprint to dynamically dissolve the monochrome mask and reveal the floodlit stadium photography beneath. Includes "Dissolve Mask" and "Reset Ink" interactive triggers.
  - **Dynamic Coordinate & Lux Tracking:** Real-time HUD reading out geographic coordinates and light lux levels based on cursor trajectory.
  - **Blueprint vs. Realized Pitch Lens Slider:** Interactive dual-layer comparison slider allowing visitors to drag and compare CAD architectural wireframes with full-color realized venue photography.
  - **Liquid SVG Displacement Filter:** Custom SVG filter (`#ink-filter`) with `feTurbulence` and `feDisplacementMap` simulating organic ink seepage into heavy-grain paper.
  - **Zero-Dependency Web Audio Synthesizer:** Subtle, elegant tactile click and whoosh audio feedback (optional toggle in navbar).

---

## 📐 Page Structure & Architectural Sections

1. **Minimalist Navbar:**
   - Brand wordmark: `TERREIN [Venues & Arenas · 2026–2031]`
   - Clean anchor links (`Vision`, `Arenas`, `Roadmap`, `Rental Model`, `Collaborate`)
   - Real-time `5-YR BLUEPRINT ACTIVE` status badge
   - Tactile audio toggle + "Partner With Us" modal trigger
   - Responsive mobile navigation drawer

2. **Hero Section (Ink Reveal Opening):**
   - Headline: *"CRAFTING THE FUTURE OF THE PITCH — 2026 TO 2031."*
   - Subheadline on the 5-year vision to build modern, community-driven venues
   - Interactive ink-mask canvas revealing cinematic floodlit night pitch photography
   - Specifications ticker: 50,000 m² footprint, FIFA Quality Pro turf, multiple pitch typologies, 2026–2031 horizon

3. **The 5-Year Vision (About Us):**
   - Asymmetric 2-column editorial layout contrasting traditional failing pitches with TERREIN's engineering principles
   - 3 Core Pillars: Biomechanically Validated Turf, Frictionless Digital Access & Match AI, and Third-Place Clubhouse Culture

4. **Planned Arenas & Facilities (Interactive Showcase):**
   - Interactive tab switcher and draggable before/after blueprint slider for:
     - **Indoor Futsal Arena:** 40m × 20m FIFA-grade court, acoustic baffle ceiling (-65% reverberation), 600-lux glare-free LEDs
     - **Mini Soccer & Full Pitch:** 7-a-side and regulation 11-a-side hybrid turf, 150mm/hr subterranean cellular drainage, 4K auto-tracking camera, 250-seat covered gallery
     - **Clubhouse & Recovery:** 650 m² pavilion, twin 8°C cryo cold plunges, shower suites, specialty espresso bar, and EV charging bays

5. **5-Year Development Roadmap (2026–2031):**
   - Sleek minimalist timeline with interactive phase switching:
     - **Phase 01 (2026–2027):** Land Acquisition, Feasibility & Masterplan (85% readiness)
     - **Phase 02 (2028):** Groundbreaking & Flagship Arena Construction (24,000 m²)
     - **Phase 03 (2029):** Commercial Launch, Smart Platform, and Inaugural Invitational Cup
     - **Phase 04 (2030–2031):** Full 11-a-Side Regulation Pitch Expansion & Youth Academy
   - Displays live CapEx allocation %, target footprint, and milestone checklists

6. **Future Rental & Partnership Models:**
   - 3-column clean editorial grid: Hourly Pitch Rental, Club & Academy Subscriptions, and Corporate Buyouts
   - Interactive **Capacity & Retainer Modeling Calculator** (dynamically calculates weekly fees and annual guaranteed slots based on arena type, tier, and hours)

7. **Strategic Collaboration & Investor Inquiry:**
   - Dedicated tracks for Landowners, Capital Partners, Academies, and Sponsors
   - Interactive FAQ accordion addressing IRR targets, monsoon drainage, landowner SPVs, and early pre-registration
   - Slide-over confidential inquiry modal with stakeholder classification

8. **Editorial Footer:**
   - Architectural coordinates, copyright, sitemap navigation, quarterly dispatch subscription form, and apex return link

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser, or serve it using any local web server:

```bash
# Using Python
python -m http.server 8088

# Using Node.js
npx serve .
```

Then visit [http://localhost:8088](http://localhost:8088).

---

## 🛠 File Structure

```
profile compeny/
├── index.html                   # Semantic HTML5 page with Tailwind CSS & SVG filters
├── README.md                    # Project documentation
└── assets/
    ├── css/
    │   └── editorial.css        # Custom editorial styling, ink masks, grid patterns & animations
    └── js/
        └── ink-reveal.js        # Canvas ink bleed engine, cursor follower, slider, calculator & audio FX
```

