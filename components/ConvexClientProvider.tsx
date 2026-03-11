"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  if (!convex) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-8 text-center">
        <div className="space-y-4">
          <div className="text-[#D4AF37] font-black text-2xl">SAIP SYSTEM ERROR</div>
          <p className="text-zinc-500 text-sm">Infrastructure configuration (CONVEX_URL) is missing.</p>
        </div>
      </div>
    );
  }
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
