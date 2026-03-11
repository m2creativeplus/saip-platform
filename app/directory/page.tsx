"use client";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { name: "All", slug: "all" },
  { name: "Car Dealers", slug: "car_dealer", icon: "🏪" },
  { name: "Garages", slug: "garage", icon: "🔧" },
  { name: "Spare Parts", slug: "spare_parts", icon: "⚙️" },
  { name: "Tire Shops", slug: "tire_shop", icon: "🛞" },
  { name: "Fuel Stations", slug: "fuel_station", icon: "⛽" },
  { name: "Car Wash", slug: "car_wash", icon: "🧽" },
  { name: "Auto Detailing", slug: "auto_detailing", icon: "✨" },
  { name: "Body Repair", slug: "body_repair", icon: "🔨" },
  { name: "Decoration", slug: "decoration", icon: "🎨" },
];

const CITIES = ["All Cities", "Hargeisa", "Berbera", "Burco", "Borama", "Gabiley"];

const DEMO_BUSINESSES = [
  { name: "Dahabshiil Motors", category: "car_dealer", city: "Hargeisa", phone: "+252634001122", rating: 4.5, address: "26 June Road", source: "google_maps" },
  { name: "MASS Car Workshop", category: "garage", city: "Hargeisa", phone: "+252634112233", rating: 4.8, address: "Industrial Area", source: "manual" },
  { name: "Al-Baraka Auto Parts", category: "spare_parts", city: "Hargeisa", phone: "+252634223344", rating: 4.2, address: "Market Street", source: "google_search" },
  { name: "Berbera Port Motors", category: "car_dealer", city: "Berbera", phone: "+252634334455", rating: 4.0, address: "Port Road", source: "google_maps" },
  { name: "Burco Tyre Center", category: "tire_shop", city: "Burco", phone: "+252634445566", rating: 3.9, address: "Main Street", source: "google_search" },
  { name: "Clean Ride Car Wash", category: "car_wash", city: "Hargeisa", phone: "+252634556677", rating: 4.3, address: "Airport Road", source: "facebook" },
  { name: "Excel Auto Detailing", category: "auto_detailing", city: "Hargeisa", phone: "+252634667788", rating: 4.6, address: "Jigjiga Yar", source: "instagram" },
  { name: "Hargeisa Body Works", category: "body_repair", city: "Hargeisa", phone: "+252634778899", rating: 4.1, address: "Industrial Zone", source: "google_maps" },
  { name: "Gabiley Fuel Station", category: "fuel_station", city: "Gabiley", phone: "+252634889900", rating: 3.8, address: "Highway 1", source: "google_maps" },
  { name: "Premium Paint Shop", category: "painting", city: "Hargeisa", phone: "+252634990011", rating: 4.4, address: "Koodbuur", source: "manual" },
  { name: "Borama Auto Center", category: "garage", city: "Borama", phone: "+252635001122", rating: 4.0, address: "Center Road", source: "google_maps" },
  { name: "Star Spare Parts", category: "spare_parts", city: "Hargeisa", phone: "+252635112233", rating: 4.3, address: "Waheen Market", source: "google_search" },
];

export default function DirectoryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCity, setActiveCity] = useState("All Cities");
  const [search, setSearch] = useState("");

  const filtered = DEMO_BUSINESSES.filter(b => {
    if (activeCategory !== "all" && b.category !== activeCategory) return false;
    if (activeCity !== "All Cities" && b.city !== activeCity) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <nav className="nav-glass px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🚗</span>
            <span className="font-['Outfit'] text-lg font-bold gold-text">SAIP</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
            <Link href="/marketplace" className="text-gray-400 hover:text-white">Marketplace</Link>
            <Link href="/admin" className="text-gray-400 hover:text-white">Dashboard</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-['Outfit'] text-3xl font-bold mb-2">Automotive Business Directory</h1>
        <p className="text-gray-500 mb-8">{filtered.length} businesses across Somaliland</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {CATEGORIES.map(c => (
            <button key={c.slug} onClick={() => setActiveCategory(c.slug)}
              className={`category-badge ${activeCategory === c.slug ? "!bg-[#D4AF37]/20 !border-[#D4AF37]" : ""}`}>
              {c.icon && <span>{c.icon}</span>}
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {CITIES.map(city => (
            <button key={city} onClick={() => setActiveCity(city)}
              className={`px-4 py-2 rounded-lg text-sm border transition ${activeCity === city
                ? "bg-[#D4AF37]/20 border-[#D4AF37] text-white"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"}`}>
              {city}
            </button>
          ))}
        </div>

        <input type="text" placeholder="Search businesses..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-[#12121a] border border-[#1e1e2e] rounded-lg text-white mb-8 outline-none focus:border-[#D4AF37]" />

        {/* Business Cards */}
        <div className="grid-cards">
          {filtered.map((b, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">{b.name}</h3>
                {b.rating && (
                  <span className="text-yellow-400 text-sm flex items-center gap-1">⭐ {b.rating}</span>
                )}
              </div>
              <div className="category-badge mb-3 text-xs">{b.category.replace(/_/g, " ")}</div>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">📍 {b.address}, {b.city}</div>
                <div className="flex items-center gap-2">📞 {b.phone}</div>
                <div className="flex items-center gap-2 text-xs text-gray-600">via {b.source}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <a href={`tel:${b.phone}`} className="flex-1 text-center py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-sm font-medium hover:bg-[#D4AF37]/30 transition">
                  📞 Call
                </a>
                <button className="flex-1 text-center py-2 bg-white/5 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition">
                  📍 Map
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
