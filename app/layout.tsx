import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import AiChatbot from "@/components/AiChatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "SAIP | Somaliland Automotive Intelligence Platform",
  description: "Next-generation automotive marketplace & directory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[#0A0A0A] text-zinc-100 selection:bg-[#D4AF37] selection:text-black`}>
        <ConvexClientProvider>
          <AuthProvider>
            {children}
            <AiChatbot />
          </AuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
