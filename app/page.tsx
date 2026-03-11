"use client";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { name: "Vehicles for Sale", somali: "Gaadhi Iib Ah", icon: "🚗", slug: "car_dealer", count: 50 },
  { name: "Spare Parts & Accessories", somali: "Qaybaha Baabuurta", icon: "⚙️", slug: "spare_parts", count: 15 },
  { name: "Garages & Repair", somali: "Geerash & Dayactir", icon: "🔧", slug: "garage", count: 8 },
  { name: "Tire & Wheel Shops", somali: "Taayirka Baabuurta", icon: "🛞", slug: "tire_shop", count: 5 },
  { name: "Fuel Stations", somali: "Shidaalka", icon: "⛽", slug: "fuel_station", count: 10 },
  { name: "Car Wash & Detailing", somali: "Nadiifinta Baabuurta", icon: "🧽", slug: "car_wash", count: 9 },
  { name: "Body Repair & Painting", somali: "Rinjiyeynta Baabuurta", icon: "🎨", slug: "body_repair", count: 4 },
];

const RECENT = [
  { make: "Toyota", model: "Land Cruiser 79", year: 2019, price: 35000, city: "Hargeisa", km: 35000, fuel: "Diesel", trans: "Manual", source: "facebook", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=250&fit=crop" },
  { make: "Toyota", model: "Hilux D4D", year: 2020, price: 22000, city: "Hargeisa", km: 28000, fuel: "Diesel", trans: "Auto", source: "instagram", img: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=250&fit=crop" },
  { make: "Toyota", model: "Vitz", year: 2015, price: 5500, city: "Berbera", km: 82000, fuel: "Petrol", trans: "CVT", source: "facebook", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop" },
  { make: "Honda", model: "Vezel", year: 2018, price: 13000, city: "Hargeisa", km: 42000, fuel: "Petrol", trans: "Auto", source: "tiktok", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=250&fit=crop" },
  { make: "Nissan", model: "Patrol", year: 2017, price: 28000, city: "Burco", km: 52000, fuel: "Diesel", trans: "Auto", source: "facebook", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop" },
];

export default function HomePage() {
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="nav-logo">🚗 SAIP <span>.sl</span></Link>
          <ul className="nav-links">
            <li><Link href="/" className="active">Home</Link></li>
            <li><Link href="/marketplace">All Ads</Link></li>
            <li><Link href="/directory">Directory</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/marketplace" className="nav-cta">Post Free Ad</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero — Vahana Split Style */}
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
              <option>Gabiley</option>
            </select>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="car_dealer">Vehicles for Sale</option>
              <option value="spare_parts">Spare Parts</option>
              <option value="garage">Garages & Repair</option>
              <option value="tire_shop">Tire Shops</option>
              <option value="car_wash">Car Wash</option>
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

      {/* Recent Listings — Horizontal Cards */}
      <section className="section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="section-title">Recent <em>Vehicle Listings</em></h2>
          <Link href="/marketplace" className="btn-outline">View All →</Link>
        </div>
        <div className="listings-grid">
          {RECENT.map((l, i) => (
            <div key={i} className="listing-h">
              <img src={l.img} alt={`${l.make} ${l.model}`} className="listing-h-img" />
              <div className="listing-h-body">
                <div className="listing-h-title">{l.make} {l.model} — {l.year}</div>
                <div className="listing-h-meta">
                  <span><span className="icon">⛽</span> {l.fuel}</span>
                  <span><span className="icon">📏</span> {l.km.toLocaleString()} km</span>
                  <span><span className="icon">⚙️</span> {l.trans}</span>
                  <span><span className="icon">📍</span> {l.city}</span>
                </div>
                <div className="listing-h-source">{l.source}</div>
              </div>
              <div className="listing-h-right">
                <div className="listing-h-price">${l.price.toLocaleString()}</div>
                <Link href={`/vehicle/SL-${10000 + i}-M`} className="btn-details">See Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p><strong>SAIP</strong> — Somaliland Automotive Intelligence Platform</p>
        <p style={{ marginTop: 8 }}>Built by <strong>M2 Creative & Consulting</strong> • Republic of Somaliland 🏳️</p>
        <p style={{ marginTop: 4 }}>Powered by Convex + Next.js + 6 AI Agents</p>
      </footer>
    </div>
  );
}
