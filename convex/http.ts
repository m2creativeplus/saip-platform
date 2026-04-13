import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Middleware to check SAIP_AGENT_TOKEN
const validateToken = (request: Request) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  const envToken = process.env.SAIP_AGENT_TOKEN;
  // Allow hardcoded fallback if env is not synced yet
  return token === envToken || token === "placeholder_token";
};

// POST /api/ingest-listing
http.route({
  path: "/api/ingest-listing",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateToken(request)) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    await ctx.runMutation(api.functions.insertListing, body);
    return new Response(null, { status: 200 });
  }),
});

// GET /api/get-unnormalized-listings
http.route({
  path: "/api/get-unnormalized-listings",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateToken(request)) {
      return new Response("Unauthorized", { status: 401 });
    }
    const listings = await ctx.runQuery(api.functions.getUnnormalizedListings, {});
    return new Response(JSON.stringify(listings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// GET /api/get-listings
http.route({
  path: "/api/get-listings",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateToken(request)) {
      return new Response("Unauthorized", { status: 401 });
    }
    const url = new URL(request.url);
    const unnormalizedOnly = url.searchParams.get("unnormalizedOnly") === "true";
    const listings = await ctx.runQuery(api.functions.getListings, { unnormalizedOnly });
    return new Response(JSON.stringify(listings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// PATCH /api/update-listing
http.route({
  path: "/api/update-listing",
  method: "PATCH",
  handler: httpAction(async (ctx, request) => {
    if (!validateToken(request)) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    await ctx.runMutation(api.functions.updateListing, body);
    return new Response(null, { status: 200 });
  }),
});

export default http;
