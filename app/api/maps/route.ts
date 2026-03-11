import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return handleRequest(req);
}

export async function POST(req: Request) {
  return handleRequest(req);
}

async function handleRequest(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || (req.method === "POST" ? (await req.json()).query : null);
    const location = url.searchParams.get("location") || (req.method === "POST" ? (await req.json()).location : null);

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Mock API response demonstrating Google Maps / Google Pin integration
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    return NextResponse.json({
      success: true,
      data: [
        { name: "Hargeisa Auto Sales", address: "26 June, Hargeisa", rating: 4.5, lat: 9.56, lng: 44.06 },
        { name: "Somaliland Premium Parts", address: "Jigjiga Yar, Hargeisa", rating: 4.8, lat: 9.57, lng: 44.05 }
      ],
      message: `Found 2 results for '${query}' near ${location || 'Hargeisa'}`
    });

  } catch (error) {
    console.error("Google Maps API Error:", error);
    return NextResponse.json({ error: "Failed to fetch map data" }, { status: 500 });
  }
}
