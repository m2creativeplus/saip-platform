"use client";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = ["all", "car_dealer", "garage", "spare_parts", "tire_shop", "fuel_station", "car_wash", "auto_detailing", "body_repair"];
const CITIES = ["All Cities", "Hargeisa", "Berbera", "Burco", "Borama", "Gabiley"];
const CAT_LABELS: Record<string, string> = { all: "All", car_dealer: "Car Dealers", garage: "Garages", spare_parts: "Spare Parts", tire_shop: "Tire Shops", fuel_station: "Fuel Stations", car_wash: "Car Wash", auto_detailing: "Detailing", body_repair: "Body Repair" };

const BIZ = [
  { name: "Dahabshiil Motors", category: "car_dealer", city: "Hargeisa", phone: "+252634001122", rating: 4.5, address: "26 June Road", source: "google_maps" },
  { name: "MASS Car Workshop", category: "garage", city: "Hargeisa", phone: "+252634112233", rating: 4.8, address: "Industrial Area", source: "manual" },
  { name: "Al-Baraka Auto Parts", category: "spare_parts", city: "Hargeisa", phone: "+252634223344", rating: 4.2, address: "Market Street", source: "google_search" },
  { name: "Berbera Port Motors", category: "car_dealer", city: "Berbera", phone: "+252634334455", rating: 4.0, address: "Port Road", source: "google_maps" },
  { name: "Burco Tyre Center", category: "tire_shop", city: "Burco", phone: "+252634445566", rating: 3.9, address: "Main Street", source: "google_search" },
  { name: "Clean Ride Car Wash", category: "car_wash", city: "Hargeisa", phone: "+252634556677", rating: 4.3, address: "Airport Road", source: "facebook" },
  { name: "Excel Auto Detailing", category: "auto_detailing", city: "Hargeisa", phone: "+252634667788", rating: 4.6, address: "Jigjiga Yar", source: "instagram" },
  { name: "Hargeisa Body Works", category: "body_repair", city: "Hargeisa", phone: "+252634778899", rating: 4.1, address: "Industrial Zone", source: "google_maps" },
  { name: "Gabiley Fuel Station", category: "fuel_station", city: "Gabiley", phone: "+252634889900", rating: 3.8, address: "Highway 1", source: "google_maps" },
  { name: "Borama Auto Center", category: "garage", city: "Borama", phone: "+252635001122", rating: 4.0, address: "Center Road", source: "google_maps" },
  { name: "Star Spare Parts", category: "spare_parts", city: "Hargeisa", phone: "+252635112233", rating: 4.3, address: "Waheen Market", source: "google_search" },
  { name: "Premium Paint Shop", category: "body_repair", city: "Hargeisa", phone: "+252634990011", rating: 4.4, address: "Koodbuur", source: "manual" },
];

export default function DirectoryPage() {
  const [cat, setCat] = useState("all");
  const [city, setCity] = useState("All Cities");
  const [search, setSearch] = useState("");

  const filtered = BIZ.filter(b => {
    if (cat !== "all" && b.category !== cat) return false;
    if (city !== "All Cities" && b.city !== city) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <nav className="navbar"><div className="navbar-inner">
        <Link href="/" className="nav-logo">🚗 SAIP <span>.sl</span></Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/marketplace">Marketplace</Link></li>
          <li><Link href="/directory" className="active">Directory</Link></li>
          <li><Link href="/admin">Dashboard</Link></li>
        </ul>
      </div></nav>

      <section className="section">
        <h1 className="section-title" style={{ fontSize: "2rem" }}>Automobile Business <em>Directory</em></h1>
        <p style={{ color: "var(--text-mid)", marginBottom: 24 }}>{filtered.length} businesses across the Republic of Somaliland</p>

        <div className="filter-bar">
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{CAT_LABELS[c]}</button>
          ))}
        </div>
        <div className="filter-bar">
          {CITIES.map(c => (
            <button key={c} className={`filter-btn ${city === c ? "active" : ""}`} onClick={() => setCity(c)}>{c}</button>
          ))}
        </div>
        <input type="text" placeholder="Search businesses..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: 400, padding: "12px 18px", border: "1px solid var(--border-mid)", borderRadius: "var(--radius-sm)", marginBottom: 24, fontSize: "0.95rem", outline: "none" }} />

        <div className="dir-grid">
          {filtered.map((b, i) => (
            <div key={i} className="dir-card">
              <div className="dir-card-header">
                <div className="dir-card-name">{b.name}</div>
                <div className="dir-card-rating">⭐ {b.rating}</div>
              </div>
              <div className="dir-card-badge">{(CAT_LABELS[b.category] || b.category).replace(/_/g, " ")}</div>
              <div className="dir-card-info">
                📍 {b.address}, {b.city}<br/>
                📞 {b.phone}<br/>
                <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>via {b.source}</span>
              </div>
              <div className="dir-card-actions">
                <a href={`tel:${b.phone}`} className="btn-call">📞 Call</a>
                <button className="btn-map">📍 Map</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer"><p><strong>SAIP</strong> — Somaliland Automotive Intelligence Platform • Built by <strong>M2 Creative & Consulting</strong></p></footer>
    </div>
  );
}
