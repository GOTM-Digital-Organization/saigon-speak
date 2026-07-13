# Saigon Speak — Design Brainstorm

## Three Stylistic Approaches

**Approach A: Tropical Brutalism** (probability: 0.05)
Raw, high-contrast layout with bold Vietnamese-inspired typography, neon accents on deep charcoal, and a street-market energy. Feels like a Saigon alley at night.

**Approach B: Warm Colonial Linen** (probability: 0.08)
Warm cream and terracotta palette inspired by the French-colonial architecture of District 1. Serif headings, generous whitespace, feels like a beautiful old notebook.

**Approach C: Lantern & Ink** (probability: 0.03)
Deep indigo and saffron yellow inspired by Vietnamese lanterns and calligraphy ink. Asymmetric layouts, brush-stroke motifs, premium and cultural.

---

## Chosen Approach: B — Warm Colonial Linen

### Design Movement
Warm Modernism meets Southeast Asian editorial — think a beautifully typeset travel journal from Ho Chi Minh City.

### Core Principles
1. Warmth over coldness — every surface has a warm undertone, never clinical white
2. Content-first hierarchy — the flashcard is always the hero of the screen
3. Cultural authenticity — design cues reference Vietnam without being touristy
4. Generous breathing room — whitespace is used deliberately to aid focus and learning

### Color Philosophy
- **Background:** Warm linen `oklch(0.97 0.018 80)` — like aged paper
- **Surface:** Cream `oklch(0.99 0.012 75)` — card backgrounds
- **Primary:** Deep terracotta `oklch(0.52 0.14 40)` — buttons, active states
- **Accent:** Saffron gold `oklch(0.78 0.14 80)` — highlights, progress indicators
- **Text:** Dark charcoal `oklch(0.22 0.02 60)` — warm, not pure black
- **Vietnamese text:** Deep indigo `oklch(0.35 0.12 265)` — distinct from English

### Layout Paradigm
Asymmetric split layout: left sidebar for category navigation, right main area for the flashcard study experience. On mobile, full-screen card with bottom sheet navigation. Cards are large, centered, and dominate the viewport.

### Signature Elements
1. **The Flip Card** — large, rounded, with a subtle drop shadow and warm cream surface. Vietnamese text in a larger, distinct color. Flip animation feels physical.
2. **Category Pills** — horizontal scrollable row of warm-toned category badges with an active indicator
3. **Progress Arc** — a thin saffron arc showing progress through the current category deck

### Interaction Philosophy
Every interaction should feel deliberate and satisfying. Card flips use a realistic 3D perspective transform. Buttons have a slight press-down feel. Category selection slides smoothly.

### Animation
- Card flip: 3D rotateY, 400ms, cubic-bezier(0.23, 1, 0.32, 1)
- Category switch: 200ms fade + slight upward translate
- Progress bar: smooth width transition, 300ms ease-out
- Page entrance: staggered fade-in from bottom, 30ms delay between elements

### Typography System
- **Display / Vietnamese text:** `Playfair Display` — elegant, editorial, handles diacritics beautifully
- **Body / English:** `DM Sans` — warm, humanist, highly readable
- **Pronunciation:** `DM Mono` — monospace, clearly distinct from other text
- Hierarchy: Vietnamese (large, indigo, Playfair) > English (medium, charcoal, DM Sans) > Pronunciation (small, muted, DM Mono)

### Brand Essence
Saigon Speak is the most culturally authentic way for English speakers to learn real Southern Vietnamese — not textbook phrases, but the language locals actually use.
Personality: **Warm, Authentic, Approachable**

### Brand Voice
Headlines sound like a knowledgeable friend who lives in Saigon: direct, encouraging, never condescending.
- Example headline: *"Learn Vietnamese the way Saigon actually speaks it."*
- Example CTA: *"Start with Greetings"*
- Banned: "Welcome to our website", "Get started today", "Unlock your potential"

### Wordmark & Logo
A stylized lantern icon — a simple geometric Vietnamese lantern silhouette in terracotta, paired with "Saigon Speak" in Playfair Display. The lantern evokes both Vietnamese culture and the idea of illumination/learning.

### Signature Brand Color
**Terracotta** `oklch(0.52 0.14 40)` — warm, earthy, unmistakably Southeast Asian.

## Style Decisions
- Use dark text on the warm linen background (never white backgrounds)
- Vietnamese text always rendered in Playfair Display at a larger size than English
- Pronunciation always in monospace, visually distinct
- Card flip reveals the answer side with a warm gradient overlay
