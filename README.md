# Solar Bright — Sunward Solar (`next-solar-bright`)

A sunny, 1970s sun-poster-inspired static Next.js website for residential solar panel and home battery installers, built for the Jamstacks gallery.

> **Sample business notice:** Sunward Solar, its Adelaide contact details, prices, recent installs and accreditation claims are fictitious sample content. Replace them with your real business details before publishing.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Sun-poster rooftop hero, static 3-frame day-on-solar strip, featured rooftop package rack, three ways solar saves money, 5-step install sun arc, recent install job tags & service area, rebates teaser, closing quote band and `HomeAndConstructionBusiness` JSON-LD |
| `/packages/` | Filterable rooftop package rack (All / Panels / Batteries / Panels + battery, URL-hash synced), sticky comparison spec table, hardware-shelf add-ons, standard inclusions and pricing note |
| `/savings/` | Interactive Sun-path Dial (6 time frames with keyboard radio-group semantics), Use / Store / Export tariff explainer, illustrative savings estimator, assumptions table and roof-orientation compass rose |
| `/rebates/` | Grouped `<details>` certificate-slip FAQ, review date badge, Clean Energy Regulator link and `FAQPage` JSON-LD |
| `/contact/` | Hosted Jamstacks enquiry form (or email fallback when unconfigured), roof-check clipboard checklist, always-visible email with copy button, phone, Adelaide hours with live `OpenBadge` and 3-step next-steps strip |
| `/404.html` | "This page is in the shade." static error page with links to Home, Packages and Contact |

## Make it yours (file ownership)

| File | Owns |
| --- | --- |
| `content/packages.ts` | Packages (`fromPriceAud`, `availability`, `availabilityNote`, `featured`, specs), add-ons and validation rules |
| `content/business.ts` | Business name, email, phone, Adelaide location note, service areas, weekly phone hours and Contact checklist |
| `content/savings.ts` | Illustrative tariff/yield assumptions (`importRateAudPerKwh`, `feedInAudPerKwh`, `dailyYieldKwhPerKw`, `selfUseShare`) and Sun-path Dial frames |
| `content/rebates.ts` | `lastReviewed` date, FAQ categories and answers (never state current dollar rebate amounts as fact) |
| `content/installs.ts` | Recent residential installs displayed as job tags on Home |
| `content/process.ts` | Five install steps shown along the Home sun arc |
| `app/page.tsx`, `app/<route>/page.tsx` | Editable page headings, introductions, section copy and calls to action |
| `site.config.json` | Public name, description, hostname, `timeZone` (`Australia/Adelaide`) and Jamstacks form `siteId`/`cdnUrl` |
| `app/tailwind.input.css` | Light ("Morning") and Dark ("Evening on battery") design tokens, textures, print styles and Jamstacks theme mapping |
| `lib/savings-estimator.ts` | Pure tested savings & payback estimator logic |
| `lib/structured-data.ts` | `HomeAndConstructionBusiness` (with `makesOffer`, `areaServed`, `openingHoursSpecification`) and `FAQPage` JSON-LD |
| `app/sitemap.ts` | Public static routes included in `sitemap.xml` |

### Common owner edit: update a package price or stock status

Open [`content/packages.ts`](content/packages.ts):

1. Change `golden-hour`'s `fromPriceAud` (for example from `13900` to `13500`).
2. Change `nightlight`'s `availability` from `'limited'` to `'available'` (and optionally remove its `availabilityNote`).
3. Run `npm run check`.

After rebuilding, that single edit automatically updates:
- The tilted hero price tag on Home (`/`)
- The featured rooftop rack plate on Home (`/`)
- The package plate and comparison spec table on `/packages/`
- The payback calculation in the `/savings/` estimator
- The `makesOffer` JSON-LD structured data on Home

Every `content/` file is covered by tests in `tests/content.test.ts` that identify the exact offending item `id` if a price, kW match, featured count, install reference or review date is invalid.

## Fonts & visual system

Self-hosted via `@fontsource` (OFL):
- **Display:** Bagel Fat One (`@fontsource/bagel-fat-one`)
- **Body:** Golos Text (`@fontsource-variable/golos-text`)
- **Data / specs:** Reddit Mono (`@fontsource-variable/reddit-mono`)

Light mode ("Morning") alternates warm cream (`#FFF7E6`) and butter (`#FFEDC2`) bands separated by curved sunrise horizons. Dark mode ("Evening on battery") shifts to indigo dusk (`#141A2E` / `#1D2442`) while keeping white text on primary buttons (`#B4440A` light, `#C2501A` dark).

The homepage rooftop hero uses `public/solar-light.webp` and `public/solar-dark.webp`. When replacing the pair, keep both images at the same 2400 × 1792 dimensions and keep important details near the centre for the mobile crop. The hero follows the visitor’s system theme and the site’s theme toggle.

## Local preview & checks

Requires Node 24+ and npm.

```sh
npm ci
npm run check
npm run dev
```

Preview the static export (including under a GitHub Pages project path):

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

### Public configuration (`site.config.json`)

```json
{
  "name": "Sunward Solar",
  "description": "Sunward Solar installs fixed-price solar panel and home battery packages across Adelaide. See what solar could save you, how rebates work, and request a free quote.",
  "domain": "next-solar-bright.jamstacks.net",
  "timeZone": "Australia/Adelaide",
  "jamstacks": {
    "siteId": "",
    "cdnUrl": "https://cdn.jamstacks.net"
  }
}
```

Never add business content or private credentials to `site.config.json`; the Jamstacks provisioner replaces it wholesale.

## Contact contract & GitHub Pages

- On `/contact/`, `<jamstacks-support-form>` and one `{cdn}/sites/{siteId}/embed.js` bootstrap render only when a public `siteId` (`JAMSTACKS_SITE` or `site.config.json`) is configured. Without one, the static email fallback renders with no script request.
- `hello@sunwardsolar.example` is always visible with a progressive-enhancement copy button.
- Navigation to and from `/contact/` uses full-document loads via `SiteLink`.
- `.github/workflows/pages.yml` preserves Jamstacks' `provisioning_id` dispatch input and correlated run name.

## Publishing assets

`jamstacks/` holds removable gallery-only metadata and screenshots (`jamstacks/config.json`, `jamstacks/home-light.jpg`, `jamstacks/home-dark.jpg`, `jamstacks/screenshots.json`). Normal builds, tests and GitHub Pages never import it. Validate separately with:

```sh
node --test jamstacks/config.test.mjs
```
