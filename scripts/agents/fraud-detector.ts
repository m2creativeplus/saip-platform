#!/usr/bin/env node
/** SAIP Agent 9 — Fraud Detection Agent */
const CONVEX_URL = process.env.CONVEX_URL!;
const INGEST_TOKEN = process.env.SAIP_AGENT_TOKEN!;

interface ListingRecord {
  _id: string; rawText: string; priceUsd?: number; normalizedMake?: string;
  normalizedModel?: string; year?: number; mileage?: number; sellerPhone?: string;
  images: string[]; postUrl?: string;
}

function detectFraud(listing: ListingRecord, allListings: ListingRecord[]): {
  riskScore: "low" | "medium" | "high"; reasons: string[];
} {
  const reasons: string[] = [];

  // Check price anomalies
  if (listing.priceUsd && listing.normalizedMake) {
    const similar = allListings.filter(l =>
      l.normalizedMake === listing.normalizedMake && l.normalizedModel === listing.normalizedModel &&
      l.priceUsd && l._id !== listing._id
    );
    if (similar.length > 0) {
      const avgPrice = similar.reduce((s, l) => s + (l.priceUsd || 0), 0) / similar.length;
      if (listing.priceUsd < avgPrice * 0.4) reasons.push("Price suspiciously low — 60%+ below average");
      if (listing.priceUsd > avgPrice * 2.5) reasons.push("Price abnormally high — 150%+ above average");
    }
  }

  // Check for duplicate seller flooding
  if (listing.sellerPhone) {
    const samePhone = allListings.filter(l => l.sellerPhone === listing.sellerPhone && l._id !== listing._id);
    if (samePhone.length > 10) reasons.push(`Seller has ${samePhone.length} listings — possible dealer posing as private`);
  }

  // Check for no images
  if (!listing.images || listing.images.length === 0) reasons.push("No images — higher fraud likelihood");

  // Check for impossible year/mileage
  if (listing.year && listing.mileage) {
    const age = 2026 - listing.year;
    const expectedMax = age * 25000;
    if (listing.mileage < age * 1000 && listing.mileage > 0) reasons.push("Mileage suspiciously low — possible rollback");
    if (listing.mileage > expectedMax) reasons.push("Mileage abnormally high");
  }

  // Check duplicate posts
  if (listing.rawText.length > 20) {
    const dupes = allListings.filter(l => l._id !== listing._id && l.rawText === listing.rawText);
    if (dupes.length > 2) reasons.push(`Exact duplicate post found ${dupes.length} times`);
  }

  const riskScore: "low" | "medium" | "high" =
    reasons.length >= 3 ? "high" : reasons.length >= 1 ? "medium" : "low";

  return { riskScore, reasons };
}

async function main() {
  console.log("🔍 Fraud Detection Agent starting...");
  const response = await fetch(`${CONVEX_URL}/api/get-all-listings`, {
    headers: { Authorization: `Bearer ${INGEST_TOKEN}` },
  });
  const listings: ListingRecord[] = await response.json();
  console.log(`📋 Scanning ${listings.length} listings for fraud`);

  let flagged = 0;
  for (const listing of listings) {
    const { riskScore, reasons } = detectFraud(listing, listings);
    if (reasons.length > 0) {
      await fetch(`${CONVEX_URL}/api/upsert-fraud-flag`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${INGEST_TOKEN}` },
        body: JSON.stringify({
          listingId: listing._id, riskScore, reasons,
          detectedAt: new Date().toISOString(), isResolved: false,
        }),
      });
      flagged++;
    }
  }
  console.log(`✅ Fraud scan complete: ${flagged} flagged out of ${listings.length}`);
}

main().catch(console.error);
