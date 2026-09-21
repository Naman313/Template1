# Here We Grow Daycare & Early Learning Academy — Website

A single-page marketing website for a two-campus daycare/preschool business ("Here We Grow Daycare") serving Pembroke, MA and Randolph, MA. Built as a static HTML/CSS/JS site styled after "The Learning Experience" (TLE) daycare franchise design language, using Tailwind CSS (via CDN) for layout/utility styling and vanilla JavaScript for all interactivity.

> Page `<title>`: "Here We Grow Daycare & Early Learning Academy | Pembroke & Randolph, MA"
> Meta description: "Here We Grow Daycare offers loving, play-based infant, toddler, and preschool childcare in Pembroke and Randolph, MA. Low teacher ratios, wholesome meals, and kindergarten readiness."

---

## 1. File Structure

```
Day care template 1/
├── index.html   # All markup: preloader, header, every page section, modals
├── app.js       # All interactivity/state (vanilla JS, no framework)
├── styles.css   # Custom CSS: design tokens, animations, 3D effects, scrollbars
└── README.md    # This file
```

There is no build step, package manager, or server-side code — the site runs by opening `index.html` directly in a browser (or serving the folder statically). All images are loaded from remote Unsplash URLs.

### External dependencies (all loaded via CDN, no local install)
- **Tailwind CSS** (`cdn.tailwindcss.com`) — utility-first styling, configured inline in `index.html` with custom theme extensions.
- **Lucide Icons** (`unpkg.com/lucide@latest`) — icon set, instantiated via `lucide.createIcons()`.
- **canvas-confetti** (`cdn.jsdelivr.net/npm/canvas-confetti@1.6.0`) — confetti burst animation used on booking/CTA interactions.
- **Google Fonts**: Fredoka, Quicksand, Outfit, Playfair Display (loaded in `styles.css` via `@import`).

---

## 2. Design System

### Color palette (`tle-*` Tailwind tokens, defined in `index.html`'s inline `tailwind.config` and mirrored as CSS variables in `styles.css`)

| Token | Hex | Usage |
|---|---|---|
| `tle-cyan` | `#00AEEF` | Primary brand/CTA color |
| `tle-cyandark` | `#0099D8` | Hover state for cyan |
| `tle-cyanlight` | `#EAF5FC` | Light backgrounds, hero section bg |
| `tle-purple` | `#7C2D87` | Secondary brand color, headings, storybook |
| `tle-purpledark` | `#641E6E` | Hover state for purple |
| `tle-purplelight` | `#F6EDF8` | Light purple backgrounds |
| `tle-yellow` | `#FFB800` | Accent, badges, "happy happens here" |
| `tle-yellowlight` | `#FFF8E1` | Light yellow backgrounds |
| `tle-green` | `#7CB342` | Accent ("happens" in the tagline) |
| `tle-greenlight` | `#F1F8E9` | Light green backgrounds |
| `tle-coral` | `#FF4081` | Accent (Infant program, heart icon) |
| `tle-corallight` | `#FCE4EC` | Light coral backgrounds |

### Typography
- **Headings** (`font-heading`): Fredoka → Quicksand → sans-serif fallback.
- **Storybook/serif copy** (`font-serif`): Playfair Display → Georgia → serif fallback.
- **Body text** (`font-body`): Outfit → system sans-serif fallback.

### Signature brand elements
- Tagline: **"happy happens here."** (purple/green/yellow word coloring), shown in preloader and hero.
- Mascot: **🧸 "Pip the Bear"**, shown as a floating sticker in the hero image and as the logo icon.
- Rainbow multi-color logotype "Here We Grow" (each letter individually colored) in the header and preloader.

---

## 3. Page Structure (top to bottom)

1. **Scroll progress bar** (`#scrollProgressBar`) — fixed 4px bar at the very top, fills left→right as the user scrolls, gradient of purple→cyan→yellow→green.

2. **3D flipping-book preloader** (`#bookPreloader`) — full-screen splash shown on load:
   - A CSS 3D book with a static left page (Infant Care photo), static right page (Outdoor Play photo), and two animated flipping sheets (Creative Art ↔ Story Circles, Early STEAM ↔ Toddler Play) that continuously flip via CSS keyframe animation.
   - Brand logotype + "happy happens here..." tagline.
   - An animated progress bar (0% → 65% → 100% over ~2.3s).
   - "Skip Intro →" button to dismiss manually.
   - Auto-dismisses after 2.2 seconds via `app.js` (`setTimeout(dismissPreloader, 2200)`).

3. **Top promo strip** — purple gradient bar advertising a **"$50 Registration Credit"** for visiting either location, plus click-to-call links for both campuses:
   - Pembroke: `(781) 293-6800`
   - Randolph: `(781) 986-4145`

4. **Sticky header/nav** (`<header>`) — glassmorphic (blurred white, sticky on scroll):
   - Logo (bear icon + rainbow "Here We Grow" wordmark + "Academy of Early Education • Pembroke • Randolph, MA" subtitle).
   - Desktop nav links: Curriculum, Programs, 3D Storybook, Campuses, Daily Schedule, Tuition (all anchor links to page sections).
   - "Find a Center" CTA button (opens tour modal).
   - Mobile hamburger menu with the same links + full-width CTA, toggled by `#mobileMenuBtn`.

5. **Hero section** — two-column layout:
   - Left: "happy happens here." eyebrow, headline "Preschool & Daycare That Inspires Discovery and Makes Learning Fun", supporting copy, a rounded campus-finder search pill (dropdown for Pembroke/Randolph + "Find a Center" button that opens the tour modal and fires confetti), and a trust row ("State Licensed Facility", "Small Teacher-to-Child Ratios", "CPR & First Aid Certified Staff").
   - Right: an arched photo portal image with a "Learning Through Play" caption badge, a floating "Pip the Bear" mascot sticker, and a floating "$50 Tour Credit" badge.

6. **Programs grid** (`#programs-grid`) — 3 age-based program cards matching the real site's actual programs, each with an icon, age range, description, and an "Explore →" button that opens the tour modal pre-filled to that program:
   - 🍼 **Infant Program** — 1 – 15 Months (individual schedules, consistent care)
   - 🧸 **Toddler Program** — 15 – 33 Months (social, emotional, physical & cognitive development)
   - ✏️ **Preschool Program** — 2.9 – 5 Years, kindergarten-ready (writing, letter & number recognition)

7. **3D storybook flip carousel** (`#storybook-section`) — a CSS-3D "book" (`#storybookContainer`) with 4 pages the user flips through via buttons or the 4 dot indicators:
   - **Cover** — "Where Happy Days & Bright Futures Begin."
   - **Chapter 1** — Infant & Toddler Care (1–33 Mo)
   - **Chapter 2** — Preschool Readiness (2.9–5 Yrs, kindergarten-ready)
   - **Chapter 3** — Daily Care & Playgrounds (breakfast/snacks provided, outdoor activities & field trips), ending with a "🎉 Book Tour ($50 Credit)" CTA.
   - Flip logic (`flipPage`/`unflipPage`/`goToBookPage` in `app.js`) rotates each page `-180deg` around its left edge and updates the 4 dot indicators.

8. **Campus locations** (`#campuses`) — two side-by-side cards, each with address, hours, fax, email, a click-to-call phone button (named contact), and a "Book Tour" button:
   - **Pembroke Campus** — 42 Mattakeesett Street, Pembroke, MA 02359, hours Mon–Fri 7:30 AM–5:00 PM, phone `Call Kim: (781) 293-6800`, fax `781-293-6822`, email `Kim@herewegrowdaycare.com`, "Book Pembroke Tour" button.
   - **Randolph Campus** — First Congregational Church, 1 South Main Street, Randolph, MA 02368, hours Mon–Fri 7:30 AM–5:30 PM, phone `Call Joyce: (781) 986-4145`, fax `781-986-7002`, email `herewegrowrandolph@aol.com`, "Book Randolph Tour" button.

9. **Interactive age explorer** (`#age-explorer`) — a range slider from 1 to 60 months (`#ageSliderInput`). Dragging it calls `updateAgeExplorer(value)` in `app.js`, which looks up the matching program from a 3-tier dataset (mirroring the real site's actual programs) and live-updates the age label, program image, title, description, and 2 "Program Focus" bullets:
   1. Infant Program (≤15 mo)
   2. Toddler Program (≤33 mo)
   3. Preschool Program (≤60 mo)
   A "Tour This Room" button dynamically retargets to the matched program.

10. **"Games, Activities & Education"** (`#curriculum`) — 4 static cards sourced from the real site's own homepage copy (no invented curriculum framework):
    - 🎲 Games
    - 🧩 Activities
    - 📚 Education
    - 🏃 Physical Activity (outdoor play & field trips)

11. **"A Day in the Life" daily rhythm timeline** (`#daily-rhythm`) — 4 clickable pill buttons; `selectTimeline(index)` in `app.js` swaps a photo, time/period badge, step counter, heading, and description. Content is limited to what the real site actually publishes (open 7:30 AM Mon–Fri; breakfast/snacks provided; **lunch is explicitly NOT provided** — families must pack it; general active/quiet/outdoor play):
    1. Morning Arrival (7:30 AM)
    2. Breakfast & Snacks
    3. Lunch Time (not provided — pack a lunch)
    4. Activities & Pickup (Pembroke closes 5:00 PM / Randolph 5:30 PM)

12. **Tuition & Schedule** (`#tuition-calc`) — since the real site publishes no pricing at all, this section no longer calculates a dollar figure. It lets the visitor pick a campus and program, states the real "2–5 days per week" scheduling flexibility, and shows a **"Contact Us for Current Rates"** card with a campus-aware click-to-call phone link (`calcSetCampus(campus)` in `app.js` swaps the number/label) plus a "Schedule a Tour" button. The $50 Off Registration Fee promo is shown since it is a real, published offer.

13. **Safety/trust badges** — 4-item grid, all sourced from real site content: State Licensed Facility, CPR Certified Staff, Field Trips, Flexible Scheduling.

14. **Footer** — brand blurb, "State Licensed Facility" statement, both campuses' full address/phone/fax/email, quick nav links, a "Find a Center" CTA, copyright, and the real non-discrimination statement (quoted from the live site's Programs page). The placeholder "Terms of Enrollment" link was removed since no such page exists on the real site; "Privacy Policy" remains (the real site does have one, though it isn't wired to a real URL here).

15. **Floating "Back to Top" button** (`#backToTopBtn`) — appears once the user scrolls past 320px; smooth-scrolls to top on click.

16. **Tour booking modal** (`#tourModal`) — a 3-step wizard triggered by any "Find a Center" / "Book Tour" / "Explore" button (`openTourModal(campus, program)`):
    - **Step 1 — Location**: choose Pembroke or Randolph, choose a program/age group from a dropdown.
    - **Step 2 — Date & Time**: date picker (defaults to tomorrow, cannot pick a past date) + a choice of 3 time slots (10:00 AM, 2:30 PM, 4:30 PM).
    - **Step 3 — Contact**: parent name, phone, email (all client-side `required` fields, no backend submission).
    - On submit (`handleWizardSubmit`), the form is replaced with a confirmation screen showing the chosen campus/program/date+time and a "$50 registration credit voucher" message, and fires a confetti burst.
    - **Note:** the form does not actually send data anywhere (no backend/API call) — it only updates the DOM. Wiring it to a real lead-capture endpoint (email, CRM, etc.) would be required for production use.

---

## 4. JavaScript Behavior Reference (`app.js`)

| Function | Purpose |
|---|---|
| `dismissPreloader()` | Hides the splash/preloader (auto-called after 2.2s, or manually via "Skip Intro"). |
| `initScrollAnimations()` | Sets up an `IntersectionObserver` that adds a `.revealed` class to `.reveal`/`.reveal-slide-left`/`.reveal-slide-right`/`.reveal-zoom` elements as they scroll into view; also drives the scroll progress bar and the back-to-top button visibility. |
| `flipPage(i)` / `unflipPage(i)` / `goToBookPage(i)` | Controls the 3D storybook page-flip state and dot indicators. |
| `triggerConfetti()` | Fires a `canvas-confetti` burst (used on booking-related CTAs). |
| `updateAgeExplorer(months)` | Updates the age-explorer panel (program copy/photo/focus bullets) based on slider value, using the `ageExplorerData` array (3 tiers, matching the real site's 3 programs). |
| `selectTimeline(index)` | Updates the daily-rhythm panel based on the selected pill button, using the `timelineData` array (4 steps, verified facts only). |
| `calcSetCampus(campus)` | Updates the Tuition section's selected campus button and swaps the click-to-call phone number/label via the `campusContact` lookup — no pricing math anymore. |
| `openTourModal(campus, program)` / `closeTourModal()` / `goToStep(n)` / `handleWizardSubmit(e)` | Drive the 3-step tour booking modal: opening/closing, pre-filling defaults, step navigation, and the mock "submission" → confirmation screen. |

All content strings (program names, focus bullets, timeline steps) are hardcoded as JS data arrays/objects at the top of the relevant sections in `app.js` — there's no CMS or external data source.

---

## 5. Key CSS Effects (`styles.css`)

- **Scroll reveal animations** — `.reveal`, `.reveal-slide-left`, `.reveal-slide-right`, `.reveal-zoom` (with `.stagger-1`–`.stagger-4` delay variants), toggled by the `IntersectionObserver` in `app.js`.
- **3D flipping book preloader** — `perspective`/`transform-style: preserve-3d` book built from static "book sides" plus two `.preload-flipping-sheet` elements animated via the `flipSheetAnim` keyframe (continuous 2.4s loop, second sheet offset by 1.2s).
- **3D storybook carousel** — `.book-page` elements rotate `-180deg` around the left edge (`transform-origin: left center`) when `.flipped` is applied.
- **Floating animations** — `animate-float`, `animate-float-reverse`, `animate-bounce-soft` keyframes used on hero mascot/badge stickers and the modal confirmation icon.
- **Custom range slider** — `.age-slider` styled with a rainbow gradient track and a white/cyan-bordered circular thumb (WebKit + Firefox variants).
- **Hero arch portal** — `.hero-arch-portal` gives the hero photo a large arched/rounded top with a thick white border and soft cyan shadow (responsive radius reduction on mobile).
- **Modal overlay** — `.modal-overlay` / `.modal-hidden` control the tour modal's fade in/out and click-through state.

---

## 6. Business/Content Facts Encoded in the Site

- **Business name**: Here We Grow Daycare, Inc.
- **Locations & contacts** (all verified against the live site, herewegrowdaycare.com):
  - **Pembroke, MA** — 42 Mattakeesett Street, Pembroke, MA 02359
    - Hours: Mon–Fri, 7:30 AM – 5:00 PM
    - Phone: `(781) 293-6800` (Call Kim)
    - Fax: `781-293-6822`
    - Email: `Kim@herewegrowdaycare.com`
  - **Randolph, MA** — First Congregational Church, 1 South Main Street, Randolph, MA 02368
    - Hours: Mon–Fri, 7:30 AM – 5:30 PM
    - Phone: `(781) 986-4145` (Call Joyce)
    - Fax: `781-986-7002`
    - Email: `herewegrowrandolph@aol.com`
- **Programs** (verified): Infant (1–15 mo), Toddler (15–33 mo), Preschool (2.9–5 yr)
- **Teacher:child ratios**: not published by the real site (described only as "small student-to-teacher ratios") — this template no longer states specific numbers.
- **Licensing**: "State Licensed Facility" (the real site does not name a specific licensing department, so this template avoids naming one too)
- **Promotion**: $50 Off Registration Fee (this is a real, published offer)
- **Meals**: breakfast and snacks are provided daily; **lunch is NOT provided** — families must send a packed lunch
- **Field trips**: scheduled throughout the school year (real, published fact)
- **Scheduling flexibility**: attend 2–5 days per week (real, published fact)
- **Tuition/pricing**: not published anywhere on the real site — this template does not display invented dollar figures; it directs visitors to contact the campus directly
- **Copyright**: "© 2026 Here We Grow Daycare, Inc. All rights reserved."

> See `info.md` for everything retrieved directly from the live site, and `assumptions.md` for a full audit of what in this template is invented vs. verified (that audit is now largely resolved by the changes above — a few low-risk items like the "MA EEC" naming and the branded UI/mascot remain by design).

---

## 7. Known Gaps / Things to Wire Up for Production

- The tour booking form (Step 3 of the modal) does not submit anywhere — no backend, email service, or CRM integration exists yet.
- The tour modal's 3 fixed time slots (10:00 AM / 2:30 PM / 4:30 PM) are a UI placeholder, not a real published booking process — plan is to replace this step with an embedded Google Form later.
- Footer "Privacy Policy" link is a placeholder (`href="#"`); the real site does have a Privacy Policy page this could eventually point to.
- All photography is sourced from remote Unsplash stock-photo URLs (not licensed/owned photos of the actual centers or actual staff/children) — swap these for real campus photos before launch.
- No analytics/tracking script is currently included.
- No favicon is set in `<head>`.
- Tailwind is loaded via the CDN "play" script (`cdn.tailwindcss.com`), which is fine for a template/demo but is not recommended for production (no purge/tree-shaking, larger runtime cost) — consider a proper Tailwind build step before shipping.
