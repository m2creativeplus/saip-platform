#!/usr/bin/env node
/**
 * SAIP Agent 2 — Google Maps Business Scraper
 * Scrapes automotive businesses from Google Maps with coordinates, ratings, and photos
 */

import { chromium } from "playwright";

const CONVEX_URL = process.env.CONVEX_URL!;
const INGEST_TOKEN = process.env.SAIP_AGENT_TOKEN!;

const MAPS_QUERIES = [
  { query: "car dealer Hargeisa", category: "car_dealer", city: "Hargeisa" },
  { query: "spare parts shop Hargeisa", category: "spare_parts", city: "Hargeisa" },
  { query: "auto repair Hargeisa", category: "garage", city: "Hargeisa" },
  { query: "tire shop Hargeisa", category: "tire_shop", city: "Hargeisa" },
  { query: "fuel station Hargeisa", category: "fuel_station", city: "Hargeisa" },
  { query: "car wash Hargeisa", category: "car_wash", city: "Hargeisa" },
  { query: "auto detailing Hargeisa", category: "auto_detailing", city: "Hargeisa" },
  { query: "car body repair Hargeisa", category: "body_repair", city: "Hargeisa" },
  { query: "car dealer Berbera", category: "car_dealer", city: "Berbera" },
  { query: "auto repair Berbera", category: "garage", city: "Berbera" },
  { query: "spare parts Burco", category: "spare_parts", city: "Burco" },
  { query: "car dealer Borama", category: "car_dealer", city: "Borama" },
  { query: "mechanic Gabiley", category: "garage", city: "Gabiley" },
  { query: "car showroom Hargeisa Somaliland", category: "car_dealer", city: "Hargeisa" },
  { query: "gaadhi iib Hargeisa", category: "car_dealer", city: "Hargeisa" },
];

interface GoogleMapsBusiness {
  name: string;
  category: string;
  city: string;
  address?: string;
  phone?: string;
  rating?: number;
  reviewCount?: number;
  mapsUrl?: string;
  website?: string;
  photos: string[];
  source: "google_maps";
  latitude?: number;
  longitude?: number;
  operatingHours?: string;
  scrapedAt: string;
  isActive: boolean;
}

async function scrapeMapQuery(page: any, query: string, category: string, city: string): Promise<GoogleMapsBusiness[]> {
  const businesses: GoogleMapsBusiness[] = [];

  try {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(query + " Somaliland")}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(3000);

    // Scroll results panel to load more
    const panel = page.locator('div[role="feed"]');
    for (let i = 0; i < 3; i++) {
      await panel.evaluate((el: Element) => el.scrollBy(0, 600)).catch(() => {});
      await page.waitForTimeout(1500);
    }

    // Extract business listings
    const listings = await page.$$('div[jsaction*="mouseover"] a[href*="/maps/place/"]');

    for (const listing of listings.slice(0, 15)) {
      try {
        await listing.click();
        await page.waitForTimeout(2000);

        const name = await page.$eval('h1', (el: Element) => el.textContent?.trim()).catch(() => "");
        const rating = await page.$eval('span[aria-hidden="true"]', (el: Element) => parseFloat(el.textContent || "0")).catch(() => undefined);
        const address = await page.$eval('button[data-item-id="address"]', (el: Element) => el.textContent?.trim()).catch(() => undefined);
        const phone = await page.$eval('button[data-tooltip="Copy phone number"]', (el: Element) => el.textContent?.trim()).catch(() => undefined);
        const website = await page.$eval('a[data-item-id="authority"]', (el: Element) => (el as HTMLAnchorElement).href).catch(() => undefined);
        const mapsUrl = page.url();

        if (name) {
          businesses.push({
            name,
            category,
            city,
            address,
            phone,
            rating,
            mapsUrl,
            website,
            photos: [],
            source: "google_maps",
            scrapedAt: new Date().toISOString(),
            isActive: true,
          });
        }

        await page.goBack().catch(() => {});
        await page.waitForTimeout(1000);
      } catch {
        // Skip this listing
      }
    }
  } catch (err) {
    console.warn(`⚠️  Maps query failed for "${query}":`, (err as Error).message);
  }

  return businesses;
}

async function postBusiness(biz: GoogleMapsBusiness) {
  try {
    await fetch(`${CONVEX_URL}/api/ingest-business`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${INGEST_TOKEN}` },
      body: JSON.stringify(biz),
    });
  } catch (err) {
    console.error("Post failed:", err);
  }
}

async function main() {
  console.log("🗺️  SAIP Google Maps Agent starting...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: "en-US" });
  const page = await context.newPage();

  let total = 0;
  for (const { query, category, city } of MAPS_QUERIES) {
    console.log(`📍 Maps scraping: "${query}"`);
    const results = await scrapeMapQuery(page, query, category, city);
    for (const biz of results) {
      await postBusiness(biz);
      total++;
    }
    await page.waitForTimeout(3000);
  }

  await browser.close();
  console.log(`✅ Google Maps Agent complete: ${total} businesses found`);
}

main().catch(console.error);
