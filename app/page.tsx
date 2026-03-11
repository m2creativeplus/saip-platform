"use client";
import Link from "next/link";
import { useState } from "react";

const STATS = [
  { label: "Vehicles Indexed", value: "50+", icon: "🚗" },
  { label: "Businesses Found", value: "30+", icon: "🏢" },
  { label: "Keywords Active", value: "500+", icon: "🔍" },
  { label: "AI Agents Running", value: "6", icon: "🤖" },
];

const CATEGORIES = [
  { name: "Car Dealers", icon: "🏪", slug: "car_dealer", count: 12 },
  { name: "Garages", icon: "🔧", slug: "garage", count: 8 },
  { name: "Spare Parts", icon: "⚙️", slug: "spare_parts", count: 15 },
  { name: "Tire Shops", icon: "🛞", slug: "tire_shop", count: 5 },
  { name: "Fuel Stations", icon: "⛽", slug: "fuel_station", count: 10 },
  { name: "Car Wash", icon: "🧽", slug: "car_wash", count: 6 },
  { name: "Auto Detailing", icon: "✨", slug: "auto_detailing", count: 3 },
  { name: "Body Repair", icon: "🔨", slug: "body_repair", count: 4 },
  { name: "Car Decoration", icon: "🎨", slug: "decoration", count: 2 },
];

const RECENT_LISTINGS = [
  { make: "Toyota", model: "Land Cruiser 79", year: 2019, price: 35000, city: "Hargeisa", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=250&fit=crop", source: "facebook" },
  { make: "Toyota", model: "Hilux", year: 2020, price: 22000, city: "Hargeisa", image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=250&fit=crop", source: "instagram" },
  { make: "Toyota", model: "Vitz", year: 2015, price: 5500, city: "Berbera", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop", source: "facebook" },
  { make: "Honda", model: "Vezel", year: 2018, price: 13000, city: "Hargeisa", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=250&fit=crop", source: "tiktok" },
  { make: "Nissan", model: "Patrol", year: 2017, price: 28000, city: "Burco", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop", source: "facebook" },
  { make: "Toyota", model: "Probox", year: 2014, price: 4800, city: "Hargeisa", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop", source: "google" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="nav-glass px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚗</span>
            <span className="font-['Outfit'] text-xl font-bold gold-text">SAIP</span>
            <span className="text-xs text-gray-500 hidden sm:block">Somaliland Automotive Intelligence</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/directory" className="text-gray-400 hover:text-white transition">Directory</Link>
            <Link href="/marketplace" className="text-gray-400 hover:text-white transition">Marketplace</Link>
            <Link href="/admin" className="text-gray-400 hover:text-white transition">Dashboard</Link>
            <div className="flex items-center gap-2">
              <div className="pulse-dot"></div>
              <span className="text-green-400 text-xs">Live</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-['Outfit'] text-5xl md:text-6xl font-black mb-4">
            <span className="gold-text">Somaliland&apos;s</span> Automotive
            <br />Intelligence Platform
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            The largest structured automotive database in the Republic of Somaliland.
            Search vehicles, dealers, garages, and spare parts across 5 cities.
          </p>

          {/* Search */}
          <div className="search-hero">
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by plate (SL-49201-M), VIN, or vehicle model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="hero-search"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto grid-stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="stat-number">{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-['Outfit'] text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid-categories">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/directory?category=${c.slug}`}>
                <div className="category-badge justify-center py-4 cursor-pointer">
                  <span className="text-xl">{c.icon}</span>
                  <span>{c.name}</span>
                  <span className="text-gray-500 text-xs">({c.count})</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Outfit'] text-2xl font-bold">Recent Vehicle Listings</h2>
            <Link href="/marketplace" className="text-sm text-[#D4AF37] hover:underline">View All →</Link>
          </div>
          <div className="grid-cards">
            {RECENT_LISTINGS.map((l, i) => (
              <div key={i} className="listing-card">
                <img src={l.image} alt={`${l.make} ${l.model}`} />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{l.make} {l.model}</h3>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{l.source}</span>
                  </div>
                  <div className="text-[#D4AF37] font-['Outfit'] text-xl font-bold">${l.price.toLocaleString()}</div>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span>{l.year} • {l.city}</span>
                    <button className="text-[#D4AF37] hover:underline text-xs">Details →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e] px-6 py-8 text-center text-gray-600 text-sm">
        <p>SAIP — Somaliland Automotive Intelligence Platform • Built by M2 Creative & Consulting</p>
        <p className="mt-1">Republic of Somaliland 🏳️ • Powered by Convex + Next.js + AI Agents</p>
      </footer>
    </div>
  );
}
