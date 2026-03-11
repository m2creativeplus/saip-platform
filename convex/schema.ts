import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// ============================================================
// SAIP — Somaliland Automotive Intelligence Platform
// Database Schema (extends MASS Workshop foundation)
// ============================================================

export default defineSchema({
  // ============ 1. VEHICLE LISTINGS (social media-scraped) ============
  vehicleListings: defineTable({
    source: v.union(
      v.literal("facebook"),
      v.literal("tiktok"),
      v.literal("instagram"),
      v.literal("google"),
      v.literal("manual")
    ),
    make: v.optional(v.string()),
    model: v.optional(v.string()),
    year: v.optional(v.number()),
    color: v.optional(v.string()),
    priceUsd: v.optional(v.number()),
    priceSlsh: v.optional(v.number()),
    mileage: v.optional(v.number()),
    condition: v.optional(
      v.union(v.literal("new"), v.literal("used"), v.literal("salvage"))
    ),
    location: v.optional(v.string()),
    city: v.optional(v.string()),
    sellerPhone: v.optional(v.string()),
    sellerName: v.optional(v.string()),
    sellerAccountUrl: v.optional(v.string()),
    images: v.array(v.string()),
    rawText: v.string(),
    detectedLanguage: v.optional(v.union(v.literal("somali"), v.literal("arabic"), v.literal("english"))),
    normalizedMake: v.optional(v.string()),    // AI-normalized
    normalizedModel: v.optional(v.string()),   // AI-normalized
    fraudScore: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    estimatedValueUsd: v.optional(v.number()),
    isActive: v.boolean(),
    scrapedAt: v.string(),
    postUrl: v.optional(v.string()),
  })
    .index("by_city", ["city"])
    .index("by_source", ["source"])
    .index("by_make", ["normalizedMake"])
    .index("by_model", ["normalizedModel"])
    .index("by_active", ["isActive"]),

  // ============ 2. AUTOMOTIVE BUSINESSES (unified directory) ============
  automotiveBusinesses: defineTable({
    name: v.string(),
    category: v.union(
      v.literal("car_dealer"),
      v.literal("car_broker"),
      v.literal("garage"),
      v.literal("spare_parts"),
      v.literal("tire_shop"),
      v.literal("fuel_station"),
      v.literal("car_wash"),
      v.literal("auto_detailing"),
      v.literal("body_repair"),
      v.literal("painting"),
      v.literal("decoration"),
      v.literal("fleet_operator"),
      v.literal("car_rental"),
      v.literal("driving_school"),
      v.literal("other")
    ),
    city: v.string(),
    address: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    phone: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    mapsUrl: v.optional(v.string()),
    facebookUrl: v.optional(v.string()),
    instagramUrl: v.optional(v.string()),
    tiktokUrl: v.optional(v.string()),
    operatingHours: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    photos: v.array(v.string()),
    source: v.string(), // "google_maps" | "google_search" | "facebook" | "manual"
    verifiedAt: v.optional(v.string()),
    isActive: v.boolean(),
    scrapedAt: v.string(),
  })
    .index("by_city", ["city"])
    .index("by_category", ["category"])
    .index("by_active", ["isActive"]),

  // ============ 3. SOCIAL ACCOUNTS (dealer profiles) ============
  socialAccounts: defineTable({
    platform: v.union(
      v.literal("facebook"),
      v.literal("instagram"),
      v.literal("tiktok"),
      v.literal("youtube")
    ),
    username: v.string(),
    profileUrl: v.string(),
    displayName: v.optional(v.string()),
    followersCount: v.optional(v.number()),
    postsCount: v.optional(v.number()),
    city: v.optional(v.string()),
    category: v.optional(v.string()),
    isDealer: v.boolean(),
    businessId: v.optional(v.id("automotiveBusinesses")),
    lastScrapedAt: v.optional(v.string()),
    isActive: v.boolean(),
  })
    .index("by_platform", ["platform"])
    .index("by_city", ["city"]),

  // ============ 4. KEYWORD INDEX ============
  keywordIndex: defineTable({
    keyword: v.string(),
    keywordSomali: v.optional(v.string()),
    language: v.union(v.literal("somali"), v.literal("english"), v.literal("arabic")),
    category: v.union(
      v.literal("vehicle_sales"),
      v.literal("spare_parts"),
      v.literal("garage"),
      v.literal("car_wash"),
      v.literal("detailing"),
      v.literal("body_repair"),
      v.literal("fuel"),
      v.literal("tires"),
      v.literal("dealer"),
      v.literal("broker")
    ),
    city: v.optional(v.string()),
    expectedResults: v.optional(v.number()),
    isActive: v.boolean(),
  })
    .index("by_category", ["category"])
    .index("by_language", ["language"]),

  // ============ 5. VEHICLE VALUATIONS ============
  vehicleValuations: defineTable({
    make: v.string(),
    model: v.string(),
    year: v.number(),
    mileage: v.optional(v.number()),
    condition: v.optional(v.string()),
    estimatedUsd: v.number(),
    confidenceScore: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    fobJapanUsd: v.optional(v.number()),
    cAndFBerberaUsd: v.optional(v.number()),
    hargeisaStreetUsd: v.optional(v.number()),
    dataPoints: v.optional(v.number()),
    updatedAt: v.string(),
    source: v.string(),
  })
    .index("by_make", ["make"])
    .index("by_model", ["model"]),

  // ============ 6. FRAUD FLAGS ============
  fraudFlags: defineTable({
    listingId: v.optional(v.id("vehicleListings")),
    vin: v.optional(v.string()),
    licensePlate: v.optional(v.string()),
    riskScore: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    reasons: v.array(v.string()),
    detectedAt: v.string(),
    resolvedAt: v.optional(v.string()),
    isResolved: v.boolean(),
  })
    .index("by_risk", ["riskScore"])
    .index("by_resolved", ["isResolved"]),

  // ============ 7. AGENT LOGS ============
  agentLogs: defineTable({
    agentName: v.string(), // "google_search" | "google_maps" | "facebook" | etc
    status: v.union(
      v.literal("running"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("partial")
    ),
    recordsFound: v.optional(v.number()),
    recordsInserted: v.optional(v.number()),
    keywordsProcessed: v.optional(v.number()),
    errorMessage: v.optional(v.string()),
    startedAt: v.string(),
    completedAt: v.optional(v.string()),
    durationMs: v.optional(v.number()),
    meta: v.optional(v.string()), // JSON blob for extra data
  })
    .index("by_agent", ["agentName"])
    .index("by_status", ["status"]),

  // ============ 8. SEARCH QUERIES (analytics) ============
  searchQueries: defineTable({
    query: v.string(),
    queryType: v.union(v.literal("plate"), v.literal("vin"), v.literal("model"), v.literal("business")),
    resultsCount: v.optional(v.number()),
    city: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    searchedAt: v.string(),
  })
    .index("by_type", ["queryType"])
    .index("by_query", ["query"]),
});
