# SAIP — Somaliland Automotive Intelligence Platform

The largest automotive business and vehicle data platform in the Republic of Somaliland.

## Stack
- **Frontend:** Next.js 14 + React + Tailwind CSS
- **Backend:** Convex (shared with MASS Workshop)
- **Deployment:** Vercel
- **AI Agents:** Playwright + Google Gemini
- **CI/CD:** GitHub Actions (scheduled scraping pipelines)

## Pages
- `/` — Homepage with search, stats, categories
- `/directory` — Business directory (12 categories, 5 cities)
- `/marketplace` — Vehicle listings from social media
- `/vehicle/[id]` — Vehicle profile + valuation + fraud score
- `/admin` — Intelligence dashboard + agent status

## AI Agents (6)
1. Google Search Discovery — keyword-driven business finder
2. Google Maps Scraper — coordinates, ratings, photos
3. Facebook Listings — Marketplace + Groups vehicle scraper
4. NLP Normalizer — Somali/English vehicle name normalization
5. Vehicle Valuator — market price estimation
6. Fraud Detector — duplicate VIN, price anomaly, mileage rollback

## Pipelines
- Daily: Google Search + Maps agents
- Every 6h: Facebook agent
- Weekly: Valuation + Fraud agents

## Built by
M2 Creative & Consulting • Republic of Somaliland
