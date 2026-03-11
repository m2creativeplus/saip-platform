#!/usr/bin/env node
/**
 * SAIP Agent 1 — Google Search Discovery Agent
 * Searches Google using 500+ automotive keywords for Somaliland
 * Outputs business data to Convex via HTTP endpoint
 */

import { chromium } from "playwright";

const CONVEX_URL = process.env.CONVEX_URL!;
const INGEST_TOKEN = process.env.SAIP_AGENT_TOKEN!;
const MAX_KEYWORDS = parseInt(process.env.MAX_KEYWORDS || "50");

interface DiscoveredBusiness {
  name: string;
  phone?: string;
  location?: string;
  mapsUrl?: string;
  website?: string;
  source: "google_search";
  category: string;
  city: string;
}

// Inline keyword list (top priority keywords)
const SEARCH_KEYWORDS = [
  { keyword: "car dealer Hargeisa Somaliland", category: "car_dealer", city: "Hargeisa" },
  { keyword: "gaadhi iib ah Hargeisa", category: "car_dealer", city: "Hargeisa" },
  { keyword: "baabuur iib ah Hargeisa", category: "car_dealer", city: "Hargeisa" },
  { keyword: "spare parts shop Hargeisa", category: "spare_parts", city: "Hargeisa" },
  { keyword: "macdarka baabuurta Hargeisa", category: "spare_parts", city: "Hargeisa" },
  { keyword: "geerash Hargeisa", category: "garage", city: "Hargeisa" },
  { keyword: "auto repair Hargeisa", category: "garage", city: "Hargeisa" },
  { keyword: "car wash Hargeisa", category: "car_wash", city: "Hargeisa" },
  { keyword: "tyre shop Hargeisa", category: "tire_shop", city: "Hargeisa" },
  { keyword: "body repair Hargeisa", category: "body_repair", city: "Hargeisa" },
  { keyword: "car dealer Berbera Somaliland", category: "car_dealer", city: "Berbera" },
  { keyword: "spare parts Berbera", category: "spare_parts", city: "Berbera" },
  { keyword: "car dealer Burco Somaliland", category: "car_dealer", city: "Burco" },
  { keyword: "auto repair Borama Somaliland", category: "garage", city: "Borama" },
  { keyword: "car dealer Gabiley Somaliland", category: "car_dealer", city: "Gabiley" },
  { keyword: "Toyota dealer Somaliland", category: "car_dealer", city: "Hargeisa" },
  { keyword: "Hilux for sale Hargeisa", category: "car_dealer", city: "Hargeisa" },
  { keyword: "Land Cruiser Hargeisa", category: "car_dealer", city: "Hargeisa" },
  { keyword: "Dahabshiil Motors Hargeisa", category: "car_dealer", city: "Hargeisa" },
  { keyword: "car showroom Hargeisa Somaliland", category: "car_dealer", city: "Hargeisa" },
  { keyword: "fuel station Hargeisa", category: "fuel_station", city: "Hargeisa" },
  { keyword: "car detailing Hargeisa", category: "auto_detailing", city: "Hargeisa" },
  { keyword: "vehicle painting Hargeisa", category: "painting", city: "Hargeisa" },
  { keyword: "rinjiyeynta baabuurta Hargeisa", category: "painting", city: "Hargeisa" },
  { keyword: "car accessories shop Hargeisa", category: "decoration", city: "Hargeisa" },
];

async function extractBusinessFromText(text: string): Promise<Partial<DiscoveredBusiness>> {
  const phoneMatch = text.match(/(\+?252\d{8,}|0\d{8,})/);
  const mapsMatch = text.match(/maps\.google\.com[^\s"']*/);
  return {
    phone: phoneMatch?.[1],
    mapsUrl: mapsMatch ? `https://${mapsMatch[0]}` : undefined,
  };
}

async function postToBusiness(business: DiscoveredBusiness) {
  try {
    await fetch(`${CONVEX_URL}/api/ingest-business`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${INGEST_TOKEN}`,
      },
      body: JSON.stringify(business),
    });
  } catch (err) {
    console.error("Failed to post business:", err);
  }
}

async function searchGoogle(page: any, keyword: string, category: string, city: string) {
  const results: DiscoveredBusiness[] = [];
  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}&num=20`, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    await page.waitForTimeout(1500);

    const searchResults = await page.$$eval("div.kvH3mc, div.tF2Cxc", (els: Element[]) =>
      els.slice(0, 10).map(el => ({
        title: el.querySelector("h3")?.textContent?.trim() || "",
        snippet: el.querySelector("div.VwiC3b, div.yXK7lf")?.textContent?.trim() || "",
        url: el.querySelector("a")?.href || "",
      }))
    );

    for (const r of searchResults) {
      if (!r.title) continue;
      const extra = await extractBusinessFromText(r.snippet);
      results.push({
        name: r.title,
        website: r.url,
        location: city,
        city,
        category,
        source: "google_search",
        ...extra,
      });
    }
  } catch (err) {
    console.warn(`⚠️  Search failed for "${keyword}":`, (err as Error).message);
  }
  return results;
}

async function main() {
  console.log("🚀 SAIP Google Search Agent starting...");
  const startTime = Date.now();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    locale: "en-US",
  });
  const page = await context.newPage();

  let totalFound = 0;
  const keywords = SEARCH_KEYWORDS.slice(0, MAX_KEYWORDS);

  for (const { keyword, category, city } of keywords) {
    console.log(`🔍 Searching: "${keyword}"`);
    const businesses = await searchGoogle(page, keyword, category, city);
    for (const biz of businesses) {
      await postToBusiness(biz);
      totalFound++;
    }
    // Polite delay
    await page.waitForTimeout(2000 + Math.random() * 1000);
  }

  await browser.close();
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`✅ Google Search Agent complete: ${totalFound} businesses found in ${elapsed}s`);
}

main().catch(console.error);
