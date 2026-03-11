import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Mock API response demonstrating Nano Banana Pro functionality
    // In production, this would call the actual Google Gemini Imagen 3 / Nano Banana API
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate generation delay

    return NextResponse.json({
      success: true,
      imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=500&fit=crop", // Demo image
      message: "Generated via Nano Banana Pro (Flash-speed efficiency): " + prompt
    });

  } catch (error) {
    console.error("Nano Banana API Error:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
