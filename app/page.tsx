"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MapPin, Calendar, Search, ArrowRight } from "lucide-react";
import AuthHeaderNav from "@/components/AuthHeaderNav";

const CATEGORIES = [
  { name: "Vehicles for Sale", somali: "Gaadhi Iib Ah", icon: "🚗", slug: "car_dealer", count: 50 },
  { name: "Spare Parts & Accessories", somali: "Qaybaha Baabuurta", icon: "⚙️", slug: "spare_parts", count: 15 },
  { name: "Garages & Repair", somali: "Geerash & Dayactir", icon: "🔧", slug: "garage", count: 8 },
  { name: "Tire & Wheel Shops", somali: "Taayirka Baabuurta", icon: "🛞", slug: "tire_shop", count: 5 },
  { name: "Fuel Stations", somali: "Shidaalka", icon: "⛽", slug: "fuel_station", count: 10 },
  { name: "Car Wash & Detailing", somali: "Nadiifinta Baabuurta", icon: "🧽", slug: "car_wash", count: 9 },
  { name: "Body Repair & Painting", somali: "Rinjiyeynta Baabuurta", icon: "🎨", slug: "body_repair", count: 4 },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const recentListings = useQuery(api.functions.getListings, { limit: 12 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-[#D4AF37] animate-pulse font-outfit font-black text-4xl">SAIP</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="nav-logo">🚗 SAIP <span>.sl</span></Link>
          <ul className="nav-links">
            <li><Link href="/" className="active">Home</Link></li>
            <li><Link href="/marketplace">All Ads</Link></li>
            <li><Link href="/directory">Directory</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><AuthHeaderNav /></li>
          </ul>
        </div>
      </nav>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-split">
          <div className="hero-left">
            <p className="hero-subtitle">Are You Looking For A Vehicle in Somaliland?</p>
            <h1 className="hero-title">
              <em>Discover</em> your Perfect Vehicle with SAIP
            </h1>
            <p style={{ color: "var(--text-mid)", marginBottom: 8, fontSize: "0.95rem" }}>
              The largest automotive marketplace and business directory in the Republic of Somaliland.
            </p>

            {/* Search Bar */}
            <div className="search-bar">
              <select value={district} onChange={e => setDistrict(e.target.value)}>
                <option value="">Select City</option>
                <option>Hargeisa</option>
                <option>Berbera</option>
                <option>Burco</option>
                <option>Borama</option>
              </select>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="car_dealer">Vehicles for Sale</option>
                <option value="spare_parts">Spare Parts</option>
                <option value="garage">Garages & Repair</option>
              </select>
              <button className="search-btn">Search</button>
            </div>
          </div>
          <div className="hero-right">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop" alt="Car" />
          </div>
        </section>

        {/* Stats */}
        <section className="section">
          <div className="stats-row">
            <div className="stat-box"><div className="stat-label">Vehicles Indexed</div><div className="stat-value">50+</div><div className="stat-change">↑ 12 this week</div></div>
            <div className="stat-box green"><div className="stat-label">Businesses Found</div><div className="stat-value">30+</div><div className="stat-change">↑ 5 this week</div></div>
            <div className="stat-box blue"><div className="stat-label">Keywords Active</div><div className="stat-value">547</div><div className="stat-change">10 categories</div></div>
            <div className="stat-box amber"><div className="stat-label">AI Agents Running</div><div className="stat-value">6</div><div className="stat-change">Active daily</div></div>
          </div>
        </section>

        {/* Browse by Categories */}
        <section className="section">
          <h2 className="section-title">Browse By <em>Categories</em></h2>
          <div className="cat-grid">
            {CATEGORIES.map(c => (
              <Link key={c.slug} href={`/directory?category=${c.slug}`} className="cat-card">
                <div className="cat-icon">{c.icon}</div>
                <div className="cat-name">{c.name}</div>
                <div className="cat-name-somali">{c.somali}</div>
                <div className="cat-count">{c.count} listings</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold font-outfit text-white">Latest Vehicles</h2>
            <Link href="/marketplace" className="text-[#D4AF37] font-bold hover:underline">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
            {recentListings === undefined ? (
              <p className="text-zinc-500 col-span-4 text-center py-20">Loading vehicles...</p>
            ) : recentListings.length === 0 ? (
              <p className="text-zinc-500 col-span-4 text-center py-20">No vehicles available.</p>
            ) : (
              recentListings.map((v: any) => (
                <div key={v._id} className="bg-[#18181b] rounded-xl shadow-lg border border-zinc-800 overflow-hidden hover:shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:border-[#D4AF37] transition-all group cursor-pointer flex flex-col">
                  <div className="h-48 relative bg-zinc-900">
                    <img src={v.images?.[0] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600"} alt={`${v.normalizedMake} ${v.normalizedModel}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                    <div className="absolute top-3 right-3 bg-[#990000] text-white text-xs font-bold px-3 py-1 rounded shadow-md border border-red-900/50">HOT DEAL</div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold font-outfit text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-2">
                         {v.year} {v.normalizedMake} {v.normalizedModel}
                      </h3>
                      <div className="text-sm text-zinc-400 flex flex-col gap-1 mb-4">
                        <span className="flex items-center gap-2 font-medium"><MapPin size={14} className="text-[#D4AF37]"/> {v.city || v.location || "Hargeisa"}</span>
                        <span className="flex items-center gap-2 font-medium"><Calendar size={14} className="text-[#D4AF37]"/> {v.year || "N/A"}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-zinc-800/50 flex justify-between items-center">
                      <span className="font-bold text-[#D4AF37] text-lg font-outfit">${v.priceUsd ? v.priceUsd.toLocaleString() : "Contact"}</span>
                      <Link href={`/vehicle/${v._id}`} className="text-white bg-zinc-800 hover:bg-[#D4AF37] hover:text-[#0A0A0A] px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
                        View Spec
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>SAIP — Somaliland Automotive Intelligence Platform</p>
      </footer>
    </div>
  );
}
