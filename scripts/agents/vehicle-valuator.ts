#!/usr/bin/env node
/** SAIP Agent 8 — Vehicle Valuation AI Agent */
const CONVEX_URL = process.env.CONVEX_URL!;
const INGEST_TOKEN = process.env.SAIP_AGENT_TOKEN!;

// Market price benchmarks: Somaliland street prices (USD) by make/model
const PRICE_BENCHMARKS: Record<string, Record<string, { min: number; max: number; avg: number }>> = {
  Toyota: {
    "Vitz": { min: 3500, max: 6500, avg: 5000 },
    "Probox": { min: 4000, max: 7000, avg: 5500 },
    "Land Cruiser 79": { min: 25000, max: 45000, avg: 35000 },
    "Land Cruiser Prado": { min: 15000, max: 35000, avg: 25000 },
    "Hilux": { min: 12000, max: 28000, avg: 18000 },
    "Harrier": { min: 8000, max: 18000, avg: 12000 },
    "Noah": { min: 5000, max: 10000, avg: 7500 },
    "Corolla Axio": { min: 5000, max: 9000, avg: 7000 },
    "RAV4": { min: 10000, max: 22000, avg: 15000 },
    "Succeed": { min: 3500, max: 6000, avg: 4800 },
    "Fortuner": { min: 15000, max: 30000, avg: 22000 },
    "Hiace": { min: 8000, max: 18000, avg: 12000 },
  },
  Honda: {
    "Fit": { min: 3000, max: 6000, avg: 4500 },
    "Vezel": { min: 8000, max: 16000, avg: 12000 },
    "CR-V": { min: 10000, max: 20000, avg: 14000 },
    "Freed": { min: 5000, max: 9000, avg: 7000 },
  },
  Nissan: {
    "Patrol": { min: 15000, max: 40000, avg: 25000 },
    "X-Trail": { min: 8000, max: 16000, avg: 11000 },
    "Juke": { min: 6000, max: 12000, avg: 8500 },
    "Note": { min: 4000, max: 7000, avg: 5500 },
  },
  Suzuki: {
    "Escudo": { min: 6000, max: 12000, avg: 8500 },
    "Jimny": { min: 7000, max: 14000, avg: 10000 },
    "Swift": { min: 4000, max: 8000, avg: 6000 },
    "Every": { min: 3000, max: 6000, avg: 4500 },
  },
};

function estimateValue(make: string, model: string, year: number, mileage?: number): {
  estimatedUsd: number; confidence: "low" | "medium" | "high";
  fobJapanUsd?: number; cAndFBerberaUsd?: number; hargeisaStreetUsd?: number;
} {
  const bench = PRICE_BENCHMARKS[make]?.[model];
  if (!bench) return { estimatedUsd: 0, confidence: "low" };

  const currentYear = 2026;
  const age = currentYear - year;
  let depreciationFactor = 1 - (age * 0.05); // 5% per year
  depreciationFactor = Math.max(depreciationFactor, 0.3);

  if (mileage) {
    if (mileage > 150000) depreciationFactor *= 0.85;
    else if (mileage > 100000) depreciationFactor *= 0.92;
    else if (mileage < 50000) depreciationFactor *= 1.08;
  }

  const estimated = Math.round(bench.avg * depreciationFactor);
  const fob = Math.round(estimated * 0.55);
  const cAndF = Math.round(fob * 1.25 + 800);

  return {
    estimatedUsd: estimated,
    confidence: bench ? (mileage ? "high" : "medium") : "low",
    fobJapanUsd: fob,
    cAndFBerberaUsd: cAndF,
    hargeisaStreetUsd: estimated,
  };
}

async function main() {
  console.log("💰 Vehicle Valuation Agent starting...");
  const response = await fetch(`${CONVEX_URL}/api/get-unvalued-listings`, {
    headers: { Authorization: `Bearer ${INGEST_TOKEN}` },
  });
  const listings: Array<{ _id: string; normalizedMake?: string; normalizedModel?: string; year?: number; mileage?: number }> = await response.json();

  let count = 0;
  for (const l of listings) {
    if (!l.normalizedMake || !l.normalizedModel) continue;
    const val = estimateValue(l.normalizedMake, l.normalizedModel, l.year || 2015, l.mileage);
    if (val.estimatedUsd === 0) continue;

    await fetch(`${CONVEX_URL}/api/upsert-valuation`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${INGEST_TOKEN}` },
      body: JSON.stringify({
        make: l.normalizedMake, model: l.normalizedModel, year: l.year || 2015,
        mileage: l.mileage, ...val, source: "saip_agent", updatedAt: new Date().toISOString(),
      }),
    });
    count++;
  }
  console.log(`✅ Valued ${count} vehicles`);
}

main().catch(console.error);
