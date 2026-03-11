import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAIP — Somaliland Automotive Intelligence Platform",
  description: "Discover vehicles, dealers, spare parts, garages, and automotive services across the Republic of Somaliland. The largest automotive directory and marketplace.",
  keywords: ["Somaliland", "automotive", "car dealer", "Hargeisa", "vehicle", "spare parts", "garage", "SAIP", "gaadhi iib ah"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
