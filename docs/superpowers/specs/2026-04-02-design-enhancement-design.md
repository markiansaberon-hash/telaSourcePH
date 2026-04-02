# TelaSource PH — "Modern Warmth" Design Enhancement Spec

## Context

TelaSourcePH is a Filipino fabric sourcing web app for textile businesses. The current design uses Inter font, corporate blue/orange colors, and flat solid backgrounds — a generic "AI-generated" look. This spec defines a complete visual redesign using a "Modern Warmth" aesthetic: the trust and Filipino personality of the tindahan (Concept A) built with the clean structure and confidence of a modern platform (Concept B).

## Target Audience

Filipino fabric shop owners, sewers, small garment businesses — primarily mobile users in the Philippines who value trust, simplicity, and personal service.

## Design System

### Color Palette

```css
--color-primary: #C4662E;        /* Terracotta — headers, CTAs, primary buttons */
--color-primary-dark: #A3522A;   /* Darker terracotta — hover states */
--color-accent: #DAA520;         /* Golden amber — highlights, stats, badges */
--color-accent-light: #E8B84A;   /* Light gold — subtle accents */
--color-dark: #2C1810;           /* Deep brown — hero bg, footer */
--color-dark-mid: #1E120B;       /* Darker brown — stat bars */
--color-cream: #FFF8F0;          /* Warm cream — page bg, cards */
--color-cream-dark: #F5EDE0;     /* Darker cream — surface/alt sections */
--color-text: #3D2B1F;           /* Espresso — body text */
--color-text-light: #8A7060;     /* Dusty tan — secondary text */
--color-text-muted: #B8A08A;     /* Muted — tertiary text, placeholders */
--color-success: #5A8F4A;        /* Earthy green — confirmation */
--color-error: #C44B2E;          /* Warm red — errors */
```

### Typography

| Role | Font | Weight | Source |
|------|------|--------|--------|
| Headings | Bricolage Grotesque | 700–800 | Google Fonts |
| Body | Cabinet Grotesk | 400–700 | Fontshare CDN (fonts.cdnfonts.com) |
| Fallback | system-ui, sans-serif | — | System |

**Size scale (mobile-first):**
- Hero heading: 2rem → 3rem (md) → 3.5rem (lg)
- Section heading: 1.75rem → 2.25rem (md)
- Card heading: 1.1rem
- Body: 0.9rem → 1rem (md)
- Small/label: 0.75rem
- Weight contrast: 800 for headings vs 400 for body (extreme contrast)

### Spacing & Layout

- Border radius: 12px for cards, 50px for pill buttons/badges
- Section padding: 64px vertical (mobile), 80px (desktop)
- Card padding: 24px–32px
- Max content width: 1200px
- Grid gaps: 24px (mobile), 32px (desktop)
- Mobile-first responsive breakpoints: sm (640px), md (768px), lg (1024px)

### Shadows

- Card: `0 2px 12px rgba(44, 24, 16, 0.06)`
- Card hover: `0 8px 32px rgba(44, 24, 16, 0.1)`
- CTA button: `0 4px 20px rgba(196, 102, 46, 0.35)`
- CTA hover: `0 6px 30px rgba(196, 102, 46, 0.45)`

## Pages & Sections

### Page: Home (`page.tsx`)

#### Hero Section
- **Background:** Deep brown `#2C1810` with gradient overlay (`radial-gradient` warm terracotta glow at top-left, subtle gold glow at bottom-right)
- **Texture:** Subtle SVG diamond/weave pattern at 5-8% opacity (fabric reference)
- **Content:**
  - "Mabuhay!" as a small golden label with subtle underline accent
  - Main heading in Bricolage Grotesque 800, warm cream color
  - "best price" phrase highlighted in terracotta/amber
  - Subtitle in Cabinet Grotesk 400, muted cream
  - CTA: Pill-shaped button with terracotta-to-amber gradient, warm glow shadow
- **Animation:** Staggered fade-in-up: greeting (0ms), heading (100ms), subtitle (200ms), CTA (300ms)

#### How It Works Section
- **Background:** Warm cream `#FFF8F0`
- **Layout:** 3-column grid (stacks on mobile)
- **Cards:** White background, soft shadow, 12px radius
- **Step indicator:** Pill badge with terracotta number circle + "Step X" text
- **Icons:** Terracotta-tinted circles with white SVG icons
- **Section heading:** Bricolage Grotesque, espresso color
- **Animation:** Cards fade-in-up with 100ms stagger on scroll

#### Benefits Section
- **Background:** Cream-dark `#F5EDE0`
- **Heading:** "Why Choose TelaSource PH" in Bricolage Grotesque
- **Subtitle:** Cabinet Grotesk, warm and confident tone
- **Cards:** 4-column grid (2-col mobile), white bg, soft shadow
- **Icon containers:** Terracotta/10% opacity background, rounded-lg
- **Hover:** Slight lift + deeper shadow

#### Trust Section
- **Background:** Deep brown `#2C1810` (matches hero)
- **Heading:** Bricolage Grotesque, warm cream
- **Body text:** Cabinet Grotesk 400, muted tan
- **Stats bar:** 3-column grid, dark-mid background
  - Numbers in golden amber, Bricolage Grotesque 800
  - Labels in muted tan, Cabinet Grotesk uppercase
  - Subtle divider lines between stats

#### Contact Section
- **Background:** Warm cream `#FFF8F0`
- **3 cards:** White bg, soft shadow
- **Icons:** Terracotta circles
- **Shop name "4210":** Golden amber, bold
- **Phone number:** Terracotta, bold

#### CTA Section
- **Background:** Terracotta gradient (primary to primary-dark)
- **Heading + body:** White/cream
- **Button:** White bg, terracotta text (inverted from hero CTA)

### Page: Upload Form (`upload/page.tsx`)

- **Page background:** Warm cream
- **Form card:** White bg, 12px radius, soft shadow
- **Labels:** Bricolage Grotesque 600, espresso color
- **Inputs:** Warm border (`#D4C4B0`), focus border terracotta, focus ring terracotta/20%
- **Select dropdowns:** Same warm styling
- **File upload zone:** Dashed terracotta/30% border, cream bg, hover to terracotta/10% bg
- **Submit button:** Full-width, terracotta gradient, pill shape, warm glow
- **Section dividers:** Subtle terracotta/20% border

### Page: Thank You (`thank-you/page.tsx`)

- **Background:** Warm cream
- **Success icon:** Earthy green circle with white checkmark
- **Heading:** Bricolage Grotesque, espresso
- **Reference number card:** White bg, golden amber accent border-left
- **Contact card:** Cream-dark bg, terracotta phone number
- **Back button:** Terracotta bg, cream text

### Layout: Header (`layout.tsx`)

- **Background:** White with warm cream bottom border
- **Logo:** "TelaSource" in Bricolage Grotesque 700 espresso, "PH" in terracotta
- **Nav links:** Cabinet Grotesk 400, muted text, hover to terracotta
- **CTA button:** Terracotta bg, cream text, rounded-lg

### Layout: Footer

- **Background:** Deep brown `#2C1810`
- **Headings:** Bricolage Grotesque, warm cream
- **Body:** Cabinet Grotesk, muted tan
- **Accent links:** Golden amber on hover
- **Copyright divider:** Subtle cream/20% border-top
- **Shop address:** Included with golden amber "4210"

### Global Styles (`globals.css`)

- Replace Inter with Bricolage Grotesque + Cabinet Grotesk
- Google Fonts import in layout.tsx `<head>`
- All CSS variables updated to new palette
- `scroll-behavior: smooth` preserved
- Add keyframe animations:
  - `fadeInUp`: opacity 0 + translateY(20px) → opacity 1 + translateY(0)
  - Duration: 0.5s ease-out
  - Used with `animation-delay` for staggered reveals

## Motion & Animation

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Hero content | Page load | Staggered fadeInUp (4 elements, 100ms apart) | 0.5s each |
| How It Works cards | Scroll into view | Staggered fadeInUp (3 cards, 100ms apart) | 0.5s each |
| Benefit cards | Scroll into view | Staggered fadeInUp (4 cards, 80ms apart) | 0.4s each |
| Stats numbers | Scroll into view | fadeInUp | 0.5s |
| CTA buttons | Hover | scale(1.02) + shadow increase | 0.2s |
| Cards | Hover | translateY(-2px) + shadow increase | 0.2s |
| Nav links | Hover | color transition to terracotta | 0.2s |

**Scroll animations:** Use CSS `@keyframes` + Intersection Observer (lightweight, no library needed). Falls back gracefully — elements visible by default, animation is progressive enhancement.

## Files to Modify

1. `web/app/globals.css` — New color palette, typography, keyframes
2. `web/app/layout.tsx` — Google Fonts import, header/footer redesign
3. `web/app/page.tsx` — All sections: hero, how-it-works, benefits, trust, contact, CTA
4. `web/app/upload/page.tsx` — Form styling updates
5. `web/app/thank-you/page.tsx` — Confirmation page styling

## What This Does NOT Change

- No structural HTML changes (same sections, same content)
- No API changes (submit/orders routes untouched)
- No new dependencies (CSS-only animations, Google Fonts via link tag)
- Copy/text stays as-is (already updated in previous iteration)

## Verification

1. `npm run dev` — site loads without errors
2. Home page: warm cream/terracotta palette, Bricolage Grotesque headings, staggered animations
3. Upload page: warm-styled form, terracotta focus states, pill submit button
4. Thank you page: earthy green success, warm styling
5. Mobile responsive: all sections stack cleanly, touch-friendly targets
6. Performance: no layout shift, fonts load smoothly (swap display)
7. All existing functionality preserved (form submission, CSV storage, admin endpoint)
