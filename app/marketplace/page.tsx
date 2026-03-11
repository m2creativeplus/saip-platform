"use client";
import Link from "next/link";
import { useState } from "react";

const MAKES = ["All", "Toyota", "Honda", "Nissan", "Suzuki", "Mitsubishi", "Isuzu"];
const PRICE_RANGES = ["All Prices", "$0-$5,000", "$5,000-$15,000", "$15,000-$30,000", "$30,000+"];

const LISTINGS = [
  { id: "1", make: "Toyota", model: "Land Cruiser 79", year: 2019, price: 35000, city: "Hargeisa", mileage: 35000, source: "facebook", seller: "Ahmed Motors", phone: "+252634112233", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&h=300&fit=crop" },
  { id: "2", make: "Toyota", model: "Hilux", year: 2020, price: 22000, city: "Hargeisa", mileage: 28000, source: "instagram", seller: "Ali Auto", phone: "+252634223344", image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=500&h=300&fit=crop" },
  { id: "3", make: "Toyota", model: "Vitz", year: 2015, price: 5500, city: "Berbera", mileage: 82000, source: "facebook", seller: "Hassan Cars", phone: "+252634334455", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop" },
  { id: "4", make: "Honda", model: "Vezel", year: 2018, price: 13000, city: "Hargeisa", mileage: 42000, source: "tiktok", seller: "Star Motors", phone: "+252634445566", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&h=300&fit=crop" },
  { id: "5", make: "Nissan", model: "Patrol", year: 2017, price: 28000, city: "Burco", mileage: 52000, source: "facebook", seller: "Burco Auto", phone: "+252634556677", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=300&fit=crop" },
  { id: "6", make: "Toyota", model: "Probox", year: 2014, price: 4800, city: "Hargeisa", mileage: 98000, source: "google", seller: "Direct Sale", phone: "+252634667788", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&h=300&fit=crop" },
  { id: "7", make: "Toyota", model: "Prado", year: 2016, price: 25000, city: "Hargeisa", mileage: 68000, source: "facebook", seller: "Dahabshiil Motors", phone: "+252634778899", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop" },
  { id: "8", make: "Suzuki", model: "Jimny", year: 2019, price: 12000, city: "Borama", mileage: 32000, source: "instagram", seller: "Borama Cars", phone: "+252634889900", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=500&h=300&fit=crop" },
  { id: "9", make: "Toyota", model: "RAV4", year: 2020, price: 18000, city: "Hargeisa", mileage: 25000, source: "facebook", seller: "Elite Motors", phone: "+252635001122", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&h=300&fit=crop" },
];

function getPriceRange(label: string): [number, number] {
  switch (label) {
    case "$0-$5,000": return [0, 5000];
    case "$5,000-$15,000": return [5000, 15000];
    case "$15,000-$30,000": return [15000, 30000];
    case "$30,000+": return [30000, 999999];
    default: return [0, 999999];
  }
}

export default function MarketplacePage() {
  const [activeMake, setActiveMake] = useState("All");
  const [activePrice, setActivePrice] = useState("All Prices");

  const [min, max] = getPriceRange(activePrice);
  const filtered = LISTINGS.filter(l => {
    if (activeMake !== "All" && l.make !== activeMake) return false;
    if (l.price < min || l.price > max) return false;
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
            <Link href="/directory" className="text-gray-400 hover:text-white">Directory</Link>
            <Link href="/admin" className="text-gray-400 hover:text-white">Dashboard</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-['Outfit'] text-3xl font-bold mb-2">Vehicle Marketplace</h1>
        <p className="text-gray-500 mb-8">Listings aggregated from Facebook, TikTok, Instagram & Google</p>

        <div className="flex flex-wrap gap-3 mb-4">
          {MAKES.map(m => (
            <button key={m} onClick={() => setActiveMake(m)}
              className={`px-4 py-2 rounded-lg text-sm border transition ${activeMake === m
                ? "bg-[#D4AF37]/20 border-[#D4AF37] text-white" : "bg-white/5 border-white/10 text-gray-400"}`}>
              {m}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          {PRICE_RANGES.map(p => (
            <button key={p} onClick={() => setActivePrice(p)}
              className={`px-4 py-2 rounded-lg text-sm border transition ${activePrice === p
                ? "bg-[#D4AF37]/20 border-[#D4AF37] text-white" : "bg-white/5 border-white/10 text-gray-400"}`}>
              {p}
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-sm mb-4">{filtered.length} listings found</p>

        <div className="grid-cards">
          {filtered.map(l => (
            <div key={l.id} className="listing-card">
              <img src={l.image} alt={`${l.make} ${l.model}`} />
              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-lg">{l.make} {l.model}</h3>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{l.source}</span>
                </div>
                <div className="text-[#D4AF37] font-['Outfit'] text-2xl font-bold mb-2">${l.price.toLocaleString()}</div>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>{l.year} • {l.mileage.toLocaleString()} km • {l.city}</div>
                  <div>Seller: {l.seller}</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <a href={`tel:${l.phone}`} className="flex-1 text-center py-2.5 bg-[#D4AF37] text-black rounded-lg text-sm font-bold hover:bg-[#F5D87A] transition">
                    📞 Call Seller
                  </a>
                  <button className="px-4 py-2.5 bg-white/5 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition">
                    ♥
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
