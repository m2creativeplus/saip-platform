#!/usr/bin/env node
/**
 * SAIP Agent 7 — Somali NLP Data Normalization Agent
 * Uses Gemini to normalize vehicle names and Somali text variations
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const CONVEX_URL = process.env.CONVEX_URL!;
const INGEST_TOKEN = process.env.SAIP_AGENT_TOKEN!;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const VEHICLE_MAP: Record<string, { make: string; model: string }> = {
  "land cruiser": { make: "Toyota", model: "Land Cruiser" },
  "landcruiser": { make: "Toyota", model: "Land Cruiser" },
  "lc200": { make: "Toyota", model: "Land Cruiser 200" },
  "lc79": { make: "Toyota", model: "Land Cruiser 79" },
  "prado": { make: "Toyota", model: "Land Cruiser Prado" },
  "vitz": { make: "Toyota", model: "Vitz" },
  "yaris": { make: "Toyota", model: "Vitz" },
  "probox": { make: "Toyota", model: "Probox" },
  "hilux": { make: "Toyota", model: "Hilux" },
  "hilux surf": { make: "Toyota", model: "Hilux Surf" },
  "surf": { make: "Toyota", model: "Hilux Surf" },
  "harrier": { make: "Toyota", model: "Harrier" },
  "noah": { make: "Toyota", model: "Noah" },
  "axio": { make: "Toyota", model: "Corolla Axio" },
  "rav4": { make: "Toyota", model: "RAV4" },
  "fortuner": { make: "Toyota", model: "Fortuner" },
  "hiace": { make: "Toyota", model: "Hiace" },
  "fit": { make: "Honda", model: "Fit" },
  "vezel": { make: "Honda", model: "Vezel" },
  "crv": { make: "Honda", model: "CR-V" },
  "freed": { make: "Honda", model: "Freed" },
  "patrol": { make: "Nissan", model: "Patrol" },
  "x-trail": { make: "Nissan", model: "X-Trail" },
  "xtrail": { make: "Nissan", model: "X-Trail" },
  "juke": { make: "Nissan", model: "Juke" },
  "navara": { make: "Nissan", model: "Navara" },
  "escudo": { make: "Suzuki", model: "Escudo" },
  "jimny": { make: "Suzuki", model: "Jimny" },
  "swift": { make: "Suzuki", model: "Swift" },
  "pajero": { make: "Mitsubishi", model: "Pajero" },
  "l200": { make: "Mitsubishi", model: "L200" },
  "d-max": { make: "Isuzu", model: "D-Max" },
  "dmax": { make: "Isuzu", model: "D-Max" },
  "sprinter": { make: "Mercedes-Benz", model: "Sprinter" },
  "range rover": { make: "Land Rover", model: "Range Rover" },
  "defender": { make: "Land Rover", model: "Defender" },
};

export function normalizeVehicleName(text: string): { make?: string; model?: string } {
  const lower = text.toLowerCase();
  for (const [key, value] of Object.entries(VEHICLE_MAP)) {
    if (lower.includes(key)) return value;
  }
  return {};
}

export async function normalizeWithGemini(rawText: string): Promise<{
  make?: string; model?: string; year?: number; priceUsd?: number; city?: string; phone?: string;
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Extract vehicle details from this text (Somali/Arabic/English). Return ONLY JSON:
TEXT: "${rawText}"
JSON fields: make, model (number), year, priceUsd, city (Hargeisa|Berbera|Burco|Borama|Gabiley), phone
Note: "gaadhi"/"baabuur" = car, "iib ah" = for sale`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
  } catch {}
  return {};
}

async function main() {
  console.log("🧠 NLP Normalizer Agent starting...");
  const response = await fetch(`${CONVEX_URL}/api/get-unnormalized-listings`, {
    headers: { Authorization: `Bearer ${INGEST_TOKEN}` },
  });
  const listings: Array<{ _id: string; rawText: string }> = await response.json();
  console.log(`📋 ${listings.length} listings to normalize`);

  for (const listing of listings) {
    const local = normalizeVehicleName(listing.rawText);
    const normalized = local.make ? local : await normalizeWithGemini(listing.rawText);
    await fetch(`${CONVEX_URL}/api/update-listing`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${INGEST_TOKEN}` },
      body: JSON.stringify({ id: listing._id, ...normalized }),
    });
    if (!local.make) await new Promise(r => setTimeout(r, 300));
  }
  console.log(`✅ Normalized ${listings.length} listings`);
}

main().catch(console.error);
