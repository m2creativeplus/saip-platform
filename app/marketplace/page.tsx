"use client";
import Link from "next/link";
import { useState } from "react";

const MAKES = ["All", "Toyota", "Honda", "Nissan", "Suzuki", "Mitsubishi"];
const PRICES = ["All Prices", "$0-$5K", "$5K-$15K", "$15K-$30K", "$30K+"];

function priceRange(p: string): [number, number] {
  switch(p) { case "$0-$5K": return [0,5000]; case "$5K-$15K": return [5000,15000]; case "$15K-$30K": return [15000,30000]; case "$30K+": return [30000,999999]; default: return [0,999999]; }
}

const LISTINGS = [
  { make: "Toyota", model: "Land Cruiser 79", year: 2019, price: 35000, city: "Hargeisa", km: 35000, fuel: "Diesel", trans: "Manual", source: "facebook", seller: "Ahmed Motors", phone: "+252634112233", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=250&fit=crop" },
  { make: "Toyota", model: "Hilux D4D", year: 2020, price: 22000, city: "Hargeisa", km: 28000, fuel: "Diesel", trans: "Auto", source: "instagram", seller: "Ali Auto", phone: "+252634223344", img: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=250&fit=crop" },
  { make: "Toyota", model: "Vitz 1.5", year: 2015, price: 5500, city: "Berbera", km: 82000, fuel: "Petrol", trans: "CVT", source: "facebook", seller: "Hassan Cars", phone: "+252634334455", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop" },
  { make: "Honda", model: "Vezel", year: 2018, price: 13000, city: "Hargeisa", km: 42000, fuel: "Petrol", trans: "Auto", source: "tiktok", seller: "Star Motors", phone: "+252634445566", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=250&fit=crop" },
  { make: "Nissan", model: "Patrol Y61", year: 2017, price: 28000, city: "Burco", km: 52000, fuel: "Diesel", trans: "Auto", source: "facebook", seller: "Burco Auto", phone: "+252634556677", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop" },
  { make: "Toyota", model: "Probox", year: 2014, price: 4800, city: "Hargeisa", km: 98000, fuel: "Petrol", trans: "Auto", source: "google", seller: "Direct Sale", phone: "+252634667788", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop" },
  { make: "Toyota", model: "Prado TX", year: 2016, price: 25000, city: "Hargeisa", km: 68000, fuel: "Diesel", trans: "Auto", source: "facebook", seller: "Dahabshiil Motors", phone: "+252634778899", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
  { make: "Suzuki", model: "Jimny", year: 2019, price: 12000, city: "Borama", km: 32000, fuel: "Petrol", trans: "Manual", source: "instagram", seller: "Borama Cars", phone: "+252634889900", img: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop" },
];

export default function MarketplacePage() {
  const [make, setMake] = useState("All");
  const [price, setPrice] = useState("All Prices");
  const [min, max] = priceRange(price);

  const filtered = LISTINGS.filter(l => {
    if (make !== "All" && l.make !== make) return false;
    if (l.price < min || l.price > max) return false;
    return true;
  });

  return (
    <div>
      <nav className="navbar"><div className="navbar-inner">
        <Link href="/" className="nav-logo">🚗 SAIP <span>.sl</span></Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/marketplace" className="active">All Ads</Link></li>
          <li><Link href="/directory">Directory</Link></li>
          <li><Link href="/admin">Dashboard</Link></li>
          <li><Link href="/marketplace" className="nav-cta">Post Free Ad</Link></li>
        </ul>
      </div></nav>

      <section className="section">
        <h1 className="section-title" style={{ fontSize: "2rem" }}>Vehicle <em>Marketplace</em></h1>
        <p style={{ color: "var(--text-mid)", marginBottom: 24 }}>Listings aggregated from Facebook, TikTok, Instagram & Google</p>

        <div className="filter-bar">
          {MAKES.map(m => (<button key={m} className={`filter-btn ${make === m ? "active" : ""}`} onClick={() => setMake(m)}>{m}</button>))}
        </div>
        <div className="filter-bar" style={{ marginBottom: 24 }}>
          {PRICES.map(p => (<button key={p} className={`filter-btn ${price === p ? "active" : ""}`} onClick={() => setPrice(p)}>{p}</button>))}
        </div>

        <p style={{ color: "var(--text-light)", fontSize: "0.85rem", marginBottom: 16 }}>{filtered.length} listings found</p>

        <div className="listings-grid">
          {filtered.map((l, i) => (
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
                <div style={{ fontSize: "0.85rem", color: "var(--text-mid)" }}>Seller: {l.seller}</div>
              </div>
              <div className="listing-h-right">
                <div className="listing-h-price">${l.price.toLocaleString()}</div>
                <Link href={`/vehicle/SL-${49201 + i}-M`} className="btn-details">See Details</Link>
                <a href={`tel:${l.phone}`} className="btn-outline" style={{ fontSize: "0.8rem", padding: "8px 16px" }}>📞 Call Seller</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer"><p><strong>SAIP</strong> — Somaliland Automotive Intelligence Platform • Built by <strong>M2 Creative & Consulting</strong></p></footer>
    </div>
  );
}
