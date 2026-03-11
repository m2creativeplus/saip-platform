import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ============================================================
// SAIP — Convex Server Functions (Mutations + Queries)
// ============================================================

// ---- VEHICLE LISTINGS ----
export const insertListing = mutation({
  args: {
    source: v.union(v.literal("facebook"), v.literal("tiktok"), v.literal("instagram"), v.literal("google"), v.literal("manual")),
    rawText: v.string(),
    images: v.array(v.string()),
    make: v.optional(v.string()),
    model: v.optional(v.string()),
    year: v.optional(v.number()),
    color: v.optional(v.string()),
    priceUsd: v.optional(v.number()),
    location: v.optional(v.string()),
    city: v.optional(v.string()),
    sellerPhone: v.optional(v.string()),
    sellerName: v.optional(v.string()),
    sellerAccountUrl: v.optional(v.string()),
    postUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("vehicleListings", {
      ...args,
      priceSlsh: args.priceUsd ? args.priceUsd * 9000 : undefined,
      normalizedMake: args.make,
      normalizedModel: args.model,
      isActive: true,
      scrapedAt: new Date().toISOString(),
    });
  },
});

export const getListings = query({
  args: { city: v.optional(v.string()), source: v.optional(v.string()), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    let q = ctx.db.query("vehicleListings").filter(q => q.eq(q.field("isActive"), true));
    if (args.city) q = ctx.db.query("vehicleListings").withIndex("by_city", q => q.eq("city", args.city!));
    return q.order("desc").take(args.limit || 50);
  },
});

export const getListingsByMake = query({
  args: { make: v.string() },
  handler: async (ctx, args) => {
    return ctx.db.query("vehicleListings")
      .withIndex("by_make", q => q.eq("normalizedMake", args.make))
      .take(50);
  },
});

// ---- AUTOMOTIVE BUSINESSES ----
export const insertBusiness = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    city: v.string(),
    address: v.optional(v.string()),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    rating: v.optional(v.number()),
    mapsUrl: v.optional(v.string()),
    facebookUrl: v.optional(v.string()),
    source: v.string(),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("automotiveBusinesses", {
      ...args,
      category: args.category as any,
      photos: [],
      reviewCount: 0,
      isActive: true,
      scrapedAt: new Date().toISOString(),
    });
  },
});

export const getBusinesses = query({
  args: { category: v.optional(v.string()), city: v.optional(v.string()), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return ctx.db.query("automotiveBusinesses")
        .withIndex("by_category", q => q.eq("category", args.category as any))
        .take(args.limit || 100);
    }
    if (args.city) {
      return ctx.db.query("automotiveBusinesses")
        .withIndex("by_city", q => q.eq("city", args.city!))
        .take(args.limit || 100);
    }
    return ctx.db.query("automotiveBusinesses")
      .filter(q => q.eq(q.field("isActive"), true))
      .take(args.limit || 100);
  },
});

// ---- KEYWORDS ----
export const bulkInsertKeywords = mutation({
  args: { keywords: v.array(v.object({
    keyword: v.string(),
    language: v.union(v.literal("somali"), v.literal("english"), v.literal("arabic")),
    category: v.string(),
    city: v.optional(v.string()),
  })) },
  handler: async (ctx, { keywords }) => {
    let count = 0;
    for (const kw of keywords) {
      await ctx.db.insert("keywordIndex", {
        ...kw,
        category: kw.category as any,
        isActive: true,
      });
      count++;
    }
    return { inserted: count };
  },
});

export const getKeywords = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return ctx.db.query("keywordIndex")
        .withIndex("by_category", q => q.eq("category", args.category as any))
        .take(500);
    }
    return ctx.db.query("keywordIndex").take(500);
  },
});

// ---- VALUATIONS ----
export const upsertValuation = mutation({
  args: {
    make: v.string(), model: v.string(), year: v.number(),
    estimatedUsd: v.number(),
    confidenceScore: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("vehicleValuations", {
      ...args,
      updatedAt: new Date().toISOString(),
    });
  },
});

// ---- FRAUD ----
export const insertFraudFlag = mutation({
  args: {
    listingId: v.optional(v.id("vehicleListings")),
    riskScore: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    reasons: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("fraudFlags", {
      ...args,
      detectedAt: new Date().toISOString(),
      isResolved: false,
    });
  },
});

// ---- AGENT LOGS ----
export const logAgentRun = mutation({
  args: {
    agentName: v.string(),
    status: v.union(v.literal("running"), v.literal("completed"), v.literal("failed"), v.literal("partial")),
    recordsFound: v.optional(v.number()),
    recordsInserted: v.optional(v.number()),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("agentLogs", {
      ...args,
      startedAt: new Date().toISOString(),
    });
  },
});

export const getAgentLogs = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return ctx.db.query("agentLogs").order("desc").take(args.limit || 50);
  },
});

// ---- DASHBOARD STATS ----
export const getDashboardStats = query({
  handler: async (ctx) => {
    const listings = await ctx.db.query("vehicleListings").collect();
    const businesses = await ctx.db.query("automotiveBusinesses").collect();
    const keywords = await ctx.db.query("keywordIndex").collect();
    const agentLogs = await ctx.db.query("agentLogs").order("desc").take(10);
    const fraudFlags = await ctx.db.query("fraudFlags").collect();

    // Count by make
    const makeDistribution: Record<string, number> = {};
    for (const l of listings) {
      const make = l.normalizedMake || "Unknown";
      makeDistribution[make] = (makeDistribution[make] || 0) + 1;
    }

    // Count by category
    const categoryDistribution: Record<string, number> = {};
    for (const b of businesses) {
      categoryDistribution[b.category] = (categoryDistribution[b.category] || 0) + 1;
    }

    // Count by city
    const cityDistribution: Record<string, number> = {};
    for (const b of businesses) {
      cityDistribution[b.city] = (cityDistribution[b.city] || 0) + 1;
    }

    return {
      totalListings: listings.length,
      totalBusinesses: businesses.length,
      totalKeywords: keywords.length,
      totalFraudFlags: fraudFlags.filter(f => !f.isResolved).length,
      makeDistribution,
      categoryDistribution,
      cityDistribution,
      recentAgentRuns: agentLogs,
    };
  },
});

// ---- SEARCH ----
export const searchVehicles = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const q = args.query.toLowerCase();
    const all = await ctx.db.query("vehicleListings").take(500);
    return all.filter(l =>
      (l.normalizedMake?.toLowerCase().includes(q)) ||
      (l.normalizedModel?.toLowerCase().includes(q)) ||
      (l.rawText?.toLowerCase().includes(q))
    ).slice(0, 50);
  },
});

export const searchBusinesses = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const q = args.query.toLowerCase();
    const all = await ctx.db.query("automotiveBusinesses").take(500);
    return all.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.category.includes(q) ||
      b.city.toLowerCase().includes(q)
    ).slice(0, 50);
  },
});
