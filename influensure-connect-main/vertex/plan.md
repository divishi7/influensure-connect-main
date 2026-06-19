
# Influensure — Build Plan

A premium influencer-marketing SaaS with a marketing site, auth screens, and an authenticated app (dashboard, discovery, fraud detection, campaign generator, analytics, admin). This first pass is **frontend + mock data only** so we can ship a visually polished, fully-clickable product fast. Real backend (Lovable Cloud), auth, and AI generation can be wired in a follow-up.

## Design system

- Theme: blue → purple gradient, glassmorphism cards, soft shadows, rounded-2xl.
- Both light and dark mode via class strategy with a theme toggle in the navbar.
- Typography: Space Grotesk (headings) + Inter (body), loaded via `<link>` in `__root.tsx`.
- Tokens defined in `src/styles.css` (`@theme inline` + `:root` / `.dark`): `--primary` (blue), `--accent` (purple), `--gradient-primary`, `--gradient-hero`, `--shadow-glow`, `--glass-bg`, `--glass-border`, risk colors (`--risk-safe`, `--risk-medium`, `--risk-high`).
- Reusable primitives: `GlassCard`, `GradientButton`, `StatCard`, `RiskBadge`, `ScoreMeter`, `SectionHeading`, `PageHeader`.
- Animations: fade-in, scale-in, slide-in via existing tw-animate-css + custom keyframes; subtle hover lifts and gradient shimmer on CTAs.

## Routes (TanStack Start file-based)

Marketing (public, each with its own `head()` metadata):
- `/` — Landing (hero, problem, features, how-it-works, CTA, footer)
- `/features`, `/pricing`, `/about`, `/contact` (light pages, optional in v1 — include `/features` + `/pricing` only)

Auth (public):
- `/login`, `/signup`, `/forgot-password` — email + Google button (UI only, no backend yet)

App (under `_app` pathless layout with sidebar + topbar — not gated yet since no auth backend):
- `/app` — Dashboard (stat cards + 3 charts)
- `/app/discover` — Influencer Discovery (filters + grid)
- `/app/influencer/$id` — Influencer Profile
- `/app/fraud` — Fraud Detection Dashboard
- `/app/campaigns` — Campaign list
- `/app/campaigns/new` — Campaign Brief Generator
- `/app/campaigns/$id` — Generated brief view
- `/app/analytics` — Analytics Dashboard
- `/app/reports` — Reports list (mock exports)
- `/app/settings` — Profile/preferences/theme

Admin (under `_app/admin`):
- `/app/admin/users`, `/app/admin/influencers`, `/app/admin/fraud-reports`, `/app/admin/campaigns`, `/app/admin/analytics`

## Mock data layer

`src/lib/mock/` modules exporting deterministic arrays:
- `influencers.ts` — ~40 profiles across niches (fashion, fitness, tech, food, travel, beauty, gaming, finance), platforms (Instagram, TikTok, YouTube, X), with followers, engagement rate, authenticity score (0–100), fraud risk (safe/medium/high), audience demographics (gender split, age buckets, top locations), growth + engagement time series.
- `campaigns.ts` — sample campaigns with status, budget, ROI, reach, impressions, conversions.
- `analytics.ts` — time-series for engagement, audience growth, campaign performance.
- `fraudReports.ts`, `users.ts` for admin.
- `generators.ts` — pure functions for the Campaign Brief Generator that produce brief + deliverables + suggested influencers (filtered from mock list) + outreach email template from form inputs.

## Charts

Use Recharts (already a common shadcn pairing). Components:
- `LineChartCard` (engagement trend, follower growth)
- `AreaChartCard` (audience growth)
- `BarChartCard` (campaign performance)
- `DonutChartCard` (audience gender, age breakdown)
- `RadialScoreMeter` (authenticity score with color stops)

## Key screens — composition notes

- **Landing hero**: split layout — left: gradient headline, sub, two CTAs (Get Started → /signup, Watch Demo → modal placeholder); right: floating glass dashboard mock built from real components (StatCards + a mini line chart + 2 influencer cards with authenticity scores), with subtle gradient blobs behind.
- **Problem section**: 4 infographic glass cards with iconography and large numerals.
- **Features section**: 4 feature cards (Smart Discovery, Fraud Detection, Campaign Generator, Analytics Dashboard) with icons and short copy.
- **Sidebar**: shadcn `Sidebar` with collapsible icon mode, active-route highlighting via `useRouterState`, sections grouped (Workspace / Admin).
- **Topbar**: search input, notifications dropdown, theme toggle, profile menu (avatar + dropdown).
- **Discover**: sticky filter bar (niche multi-select, platform, follower range slider, engagement slider, authenticity slider, audience gender/age), responsive card grid, sort dropdown, pagination.
- **Influencer profile**: header with avatar, platform badge, follower stats, authenticity meter; tabs for Overview / Audience / Fraud Analysis / Past Campaigns.
- **Fraud Detection**: aggregate view across watchlist — score meters, risk distribution donut, follower-growth anomalies, engagement consistency, audience quality.
- **Campaign Generator**: multi-step form (Basics → Audience → Goals) → generated result page with brief, deliverables checklist, suggested influencers (cards), copyable outreach email.
- **Analytics**: KPI strip (Reach, Impressions, Engagement, Clicks, Conversions, Revenue, ROI), date-range selector, two large charts, campaign comparison cards, Export CSV button (client-side blob).
- **Admin**: data tables (shadcn `Table`) with status badges and row actions.

## Technical details

- Stack: existing TanStack Start + Tailwind v4 + shadcn. No backend in this pass.
- Dependencies to add: `recharts`, `lucide-react` (likely already present via shadcn).
- Theme toggle: simple `ThemeProvider` writing `class="dark"` to `<html>`, persisted to `localStorage`, initialized in `__root.tsx` shell to avoid FOUC.
- File structure:
  - `src/components/layout/` — `AppSidebar.tsx`, `Topbar.tsx`, `MarketingNav.tsx`, `Footer.tsx`, `ThemeToggle.tsx`
  - `src/components/ui-ext/` — `GlassCard`, `StatCard`, `RiskBadge`, `ScoreMeter`, `GradientButton`, `SectionHeading`, chart wrappers
  - `src/components/influencer/` — `InfluencerCard`, `InfluencerFilters`, `AudienceBreakdown`, `FraudAnalysisPanel`
  - `src/components/campaign/` — `CampaignForm`, `GeneratedBrief`, `OutreachEmail`
  - `src/lib/mock/*`, `src/lib/format.ts` (number/currency formatters)
  - Routes under `src/routes/` per list above, each with proper `head()` SEO meta.
- All colors via semantic tokens — no hardcoded `text-white` / `bg-black` in components.
- Mobile responsive via Tailwind breakpoints; sidebar collapses to off-canvas on mobile (shadcn default).
- Each route exports `errorComponent` + `notFoundComponent`; root retains 404 + error boundary already present.

## Out of scope for v1 (call out for follow-up)

- Real auth + database (Lovable Cloud / Supabase) — auth pages are UI-only and "Get Started" routes straight into `/app` with mock user.
- Real AI generation for campaign briefs — replaced by templated generator from form inputs. Wiring Lovable AI Gateway is a one-screen follow-up.
- Real CSV/PDF export beyond a client-side CSV blob.

Once you approve, I'll build it end-to-end in one pass.
