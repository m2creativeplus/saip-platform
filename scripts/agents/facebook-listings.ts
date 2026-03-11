#!/usr/bin/env node
/**
 * SAIP Agent 3 — Facebook Automotive Listings Agent
 * Scrapes vehicle listings and dealer pages from Facebook
 * Searches Somali and English keywords in Facebook Marketplace + Groups
 */

import { chromium } from "playwright";

const CONVEX_URL = process.env.CONVEX_URL!;
const INGEST_TOKEN = process.env.SAIP_AGENT_TOKEN!;
const FB_EMAIL = process.env.FB_EMAIL!;
const FB_PASSWORD = process.env.FB_PASSWORD!;

const SEARCH_QUERIES = [
  "gaadhi iib ah Hargeisa",
  "baabuur iib ah Hargeisa",
  "car for sale Hargeisa",
  "car for sale Somaliland",
  "Hilux iib ah",
  "Land Cruiser Hargeisa",
  "Vitz iib ah",
  "Probox Hargeisa",
  "gaadhi cusub Hargeisa",
  "car sale Berbera",
];

const FB_GROUPS = [
  "https://www.facebook.com/groups/hargeisacars",
  "https://www.facebook.com/groups/somalilandcars",
  "https://www.facebook.com/groups/gaadhiiibah",
];

interface VehicleListing {
  source: "facebook";
  rawText: string;
  images: string[];
  sellerPhone?: string;
  sellerName?: string;
  sellerAccountUrl?: string;
  location?: string;
  city?: string;
  priceUsd?: number;
  postUrl?: string;
  scrapedAt: string;
  isActive: boolean;
}

function extractPrice(text: string): number | undefined {
  const m = text.match(/\$[\s]?([0-9,]+)|([0-9,]+)[\s]?(USD|usd|\$|dollar)/i);
  if (m) return parseInt((m[1] || m[2]).replace(/,/g, ""));
  const slsh = text.match(/([0-9,]+)[\s]?(SL|SLSH|shilling)/i);
  if (slsh) return Math.round(parseInt(slsh[1].replace(/,/g, "")) / 9000);
  return undefined;
}

function extractPhone(text: string): string | undefined {
  const m = text.match(/(?:\+?252|0)?[0-9]{8,10}/);
  return m?.[0];
}

function detectCity(text: string): string {
  const cities: Record<string, string[]> = {
    Hargeisa: ["hargeisa", "hargeysa", "hargaisa"],
    Berbera: ["berbera", "berbera"],
    Burco: ["burco", "bur'o", "burao"],
    Borama: ["borama", "bor'o"],
    Gabiley: ["gabiley", "gabile"],
  };
  const lower = text.toLowerCase();
  for (const [city, variants] of Object.entries(cities)) {
    if (variants.some(v => lower.includes(v))) return city;
  }
  return "Hargeisa"; // default
}

async function loginToFacebook(page: any) {
  if (!FB_EMAIL || !FB_PASSWORD) {
    console.warn("⚠️  No FB credentials - running in public scrape mode");
    return false;
  }
  try {
    await page.goto("https://www.facebook.com/login", { waitUntil: "networkidle" });
    await page.fill('input[name="email"]', FB_EMAIL);
    await page.fill('input[name="pass"]', FB_PASSWORD);
    await page.click('button[name="login"]');
    await page.waitForNavigation({ waitUntil: "networkidle", timeout: 15000 });
    console.log("✅ Logged into Facebook");
    return true;
  } catch {
    console.warn("⚠️  FB login failed");
    return false;
  }
}

async function scrapeMarketplace(page: any, query: string): Promise<VehicleListing[]> {
  const listings: VehicleListing[] = [];
  try {
    const url = `https://www.facebook.com/marketplace/hargeisa/search/?query=${encodeURIComponent(query)}&deliveryMethod=local_pick_up`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(2000);

    // Scroll to load more items
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(1000);
    }

    const items = await page.$$('div[data-testid="marketplace_feed_item"], a[href*="/marketplace/item/"]');

    for (const item of items.slice(0, 20)) {
      const text = await item.innerText().catch(() => "");
      const href = await item.getAttribute("href").catch(() => "");
      const imgSrc = await item.$eval("img", (el: HTMLImageElement) => el.src).catch(() => "");

      if (!text && !href) continue;

      listings.push({
        source: "facebook",
        rawText: text,
        images: imgSrc ? [imgSrc] : [],
        sellerPhone: extractPhone(text),
        location: detectCity(text),
        city: detectCity(text),
        priceUsd: extractPrice(text),
        postUrl: href ? `https://www.facebook.com${href}` : undefined,
        scrapedAt: new Date().toISOString(),
        isActive: true,
      });
    }
  } catch (err) {
    console.warn(`⚠️  Marketplace scrape failed for "${query}":`, (err as Error).message);
  }
  return listings;
}

async function postListing(listing: VehicleListing) {
  try {
    await fetch(`${CONVEX_URL}/api/ingest-listing`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${INGEST_TOKEN}` },
      body: JSON.stringify(listing),
    });
  } catch (err) {
    console.error("Post listing failed:", err);
  }
}

async function main() {
  console.log("📘 SAIP Facebook Agent starting...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
    locale: "so", // Somali locale
  });
  const page = await context.newPage();

  await loginToFacebook(page);

  let total = 0;
  for (const query of SEARCH_QUERIES) {
    console.log(`🔍 Facebook Marketplace: "${query}"`);
    const listings = await scrapeMarketplace(page, query);
    for (const l of listings) {
      await postListing(l);
      total++;
    }
    await page.waitForTimeout(3000 + Math.random() * 2000);
  }

  await browser.close();
  console.log(`✅ Facebook Agent complete: ${total} listings found`);
}

main().catch(console.error);
