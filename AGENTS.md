# AI Agent Operational Directives: Mobile-First Wedding Invitation

## [GLOBAL DIRECTIVES]
You are acting as an engineer on a stateless, static, single-page application (SPA).
1. **Deployment Target:** GitHub Pages.
2. **Stack:** HTML5, Tailwind CSS (via CDN), Vanilla JavaScript.
3. **Strict Prohibition:** You are strictly forbidden from migrating this project to React, Vue, Next.js, or any other build-step framework. Do not introduce `npm`, `package.json`, or bundlers.
4. **Mobile-First Lock:** The application is locked within a `max-w-md` centered container. Do not write global media queries that attempt to expand this to a full desktop layout.
5. **The Maintainability Mandate:** * Always prioritize clean, readable, and simple implementations for **new** features, using standard Tailwind utility classes.

---

## [SKILL BUNDLE: DOM & LAYOUT]
**Role:** Execution of HTML structure and CSS styling.
**Context:** The layout relies on fragile CSS Scroll Snapping and specific mathematical workarounds. 

**Rules of Engagement:**
1. **Scroll Engine:** Do not alter the `overflow-y-scroll snap-y snap-mandatory` on the `<main>` container or the `h-screen shrink-0 snap-start` on the child `<section>` elements.
2. **Section 1 (Video Cover):** The text overlay utilizes `mix-blend-multiply` without a background container. Do not wrap this text in solid backgrounds.
3. **Section 4 (Timeline) - CRITICAL:** * This section contains an absolute-positioned SVG timeline with hardcoded Y-coordinates for botanical leaves (Y=48, 176, 304, 432, 560).
    * The timeline container is locked to `h-[608px]`. Do not make this fluid.
    * The adjacent flex rows containing the text/icons are locked to `min-h-[96px] mb-8`. This creates exactly 128px of vertical space per row to mathematically intersect with the SVG leaves. **Do not convert this to fluid flexbox spacing (`justify-between`, `gap-y`, etc.).**
4. **Section 5 (Dress Code):** The "Mulheres" and "Homens" columns must remain in a CSS Grid (`grid-cols-2`), not flexbox, to guarantee a strict 50/50 horizontal split regardless of text length.
5. **Section 6 (Buttons):** Map and RSVP buttons use an asymmetrical layout (left-aligned icon, centered text). Text centering is enforced via an explicit right-padding offset (`pr-10`) to counterbalance the `w-10` icon. Do not refactor this to standard flex centering.

---

## [SKILL BUNDLE: JAVASCRIPT LOGIC]
**Role:** Execution of state transitions and interactive elements.
**Context:** JavaScript is used exclusively for the initial state transition from the video cover to the scrollable invitation.

**Rules of Engagement:**
1. **No Virtual DOM:** Do not attempt to mount or unmount components using JS templates. The DOM is static.
2. **State Transition:** The transition from `#intro-screen` to `#main-content` relies on toggling CSS display classes (`hidden`) followed by opacity classes (`opacity-0` to `fade-in`).
3. **Reflow Requirement:** You must maintain the `void mainContent.offsetWidth;` line during the transition sequence. Removing this will cause the browser to skip the opacity transition.
4. **Container Height:** Do not dynamically animate the height of the scroll container via JS. This breaks the browser's internal coordinate mapping for CSS Scroll Snapping.

---

## [SKILL BUNDLE: TYPOGRAPHY & ASSETS]
**Role:** Management of external fonts, SVGs, and media assets.
**Context:** High-contrast serif and sans-serif pairings optimized for a `#fcfbf9` background.

**Rules of Engagement:**
1. **Font Ecosystem:**
    * Headers: `Playfair Display` (Italic, Medium, Normal)
    * Accents: `Cinzel Decorative` (Light, Regular, Medium)
    * Fallback: `Lato` (Light, Regular)
2. **Asset Pathing:** All images must use relative paths (`./assets/images/...`) to ensure compatibility with GitHub Pages routing.
3. **Accessibility:** Any inline `<svg>` used purely for decoration must include `aria-hidden="true"`.