# By The Dozen — Heritage Eggs Website

A beautiful, animated landing page for a Sacramento-based heritage egg farm.

## Sections

- **Hero** — Animated egg palette, tagline
- **Palette** — 6 egg colors with "Rainbow" explanation
- **Breeds** — 6 breeds with expandable FAQ accordion
- **Pricing** — Hatching eggs & chick prices
- **Gallery** — 17 real photos from the farm (filterable by Eggs / Birds / Chicks)
- **Journal** — Instagram embed toggle (Art Tiles / Live Instagram)
- **Reserve** — Waiting list form with full product dropdown

## Photo Gallery

17 photos included in `public/images/`:
- Eggs: rainbow dozens, Marans, Olive Eggers, Espresso Eggers
- Birds: Silverudd's Blue, Black Copper Marans, flock shots
- Chicks: week-old Marans chicks

Click any photo to open full-size lightbox.

## Pricing

### Hatching Eggs (per dozen)
| Breed | Price |
|-------|-------|
| Espresso Eggers | $300 |
| LF Show Cochins | $180 |
| Silverudd's Blue | $160 |
| Rainbow (mixed) | $200 |

### Chicks (each)
| Breed | Price |
|-------|-------|
| Black Copper Marans | $65 |
| Espresso Eggers | $55 |
| Silverudd's Blue | $45 |
| LF Show Cochins | $40 |
| Lavender/Black Split Bantam Cochins | $50 |

**No rainbow chicks available.**

## Quick Start

```bash
npm install
npm start
```

## Deploy

```bash
npm run build
npx netlify-cli deploy --prod --dir=build
```

## Instagram Feed Setup

To show real Instagram posts, replace placeholder URLs in `src/App.js` (search for `CxAMPLE`) with actual post URLs from @_bythedozen_.
