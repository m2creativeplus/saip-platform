"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthHeaderNav from "@/components/AuthHeaderNav";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MapPin, Calendar, Gauge, LayoutGrid, List } from "lucide-react";

const MAKES = ["All", "Toyota", "Honda", "Nissan", "Suzuki", "Mitsubishi"];
const PRICES = ["All Prices", "$0-$5K", "$5K-$15K", "$15K-$30K", "$30K+"];

export default function MarketplacePage() {
  const [mounted, setMounted] = useState(false);
  const [activeMake, setActiveMake] = useState("All");
  const [activePrice, setActivePrice] = useState("All Prices");
  const [layout, setLayout] = useState<"grid" | "list">("list");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch Live Convex Data
  const listings = useQuery(api.functions.getListings, { limit: 50 });
  
  // Client-side filtering
  const filteredListings = listings?.filter((l: any) => 
    activeMake === "All" || (l.normalizedMake || "").toLowerCase() === activeMake.toLowerCase()
  );

  if (!mounted) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-[#D4AF37] animate-pulse font-outfit font-black text-4xl">SAIP</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col">
      {/* Navbar */}
      <nav className="navbar border-b border-zinc-800/50">
        <div className="navbar-inner">
          <Link href="/" className="nav-logo">🚗 SAIP <span>.sl</span></Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/marketplace" className="active">All Ads</Link></li>
            <li><Link href="/directory">Directory</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><AuthHeaderNav /></li>
          </ul>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold font-outfit text-white">Live <em>Marketplace</em></h1>
            <p className="text-zinc-500 mt-2 text-lg">Real-time inventory from across the Republic of Somaliland.</p>
          </div>
          <div className="flex gap-2 bg-[#18181b] p-1 rounded-lg border border-zinc-800">
            <button onClick={() => setLayout("grid")} className={`p-2 rounded ${layout === "grid" ? "bg-[#D4AF37] text-black" : "text-zinc-500 hover:text-white"}`}><LayoutGrid size={20}/></button>
            <button onClick={() => setLayout("list")} className={`p-2 rounded ${layout === "list" ? "bg-[#D4AF37] text-black" : "text-zinc-500 hover:text-white"}`}><List size={20}/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-[#18181b] rounded-2xl border border-zinc-800 p-6">
              <h3 className="text-lg font-bold font-outfit text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                FILTER BY MAKE
              </h3>
              <div className="flex flex-col gap-2">
                {MAKES.map(make => (
                  <button
                    key={make}
                    onClick={() => setActiveMake(make)}
                    className={`text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      activeMake === make 
                        ? "bg-[#D4AF37] text-black" 
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {make}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#18181b] rounded-2xl border border-zinc-800 p-6">
              <h3 className="text-lg font-bold font-outfit text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#990000] rounded-full"></span>
                PRICE RANGE
              </h3>
              <div className="flex flex-col gap-2">
                 {PRICES.map(price => (
                  <button
                    key={price}
                    onClick={() => setActivePrice(price)}
                    className={`text-left px-4 py-3 rounded-xl font-medium transition-all text-sm ${
                      activePrice === price 
                        ? "bg-[#990000] text-white" 
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-3">
            <div className={layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-4"}>
              {filteredListings === undefined ? (
                <div className="col-span-full py-20 text-center text-zinc-500 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-outfit animate-pulse">Syncing with Somaliland Nodes...</p>
                </div>
              ) : filteredListings.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-[#18181b] rounded-2xl border border-zinc-800 dashed">
                  <p className="text-zinc-400 text-lg">No matches found for "{activeMake}".</p>
                </div>
              ) : (
                filteredListings.map((v: any) => (
                  <div key={v._id} className={`group bg-[#18181b] rounded-2xl border border-zinc-800 overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-all flex ${layout === "list" ? "flex-col md:flex-row" : "flex-col"}`}>
                    
                    {/* Image Section */}
                    <div className={`${layout === "list" ? "w-full md:w-[320px] h-52 md:h-auto" : "w-full h-52"} relative bg-zinc-900 overflow-hidden`}>
                      <img src={v.images?.[0] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600"} alt={`${v.normalizedMake} ${v.normalizedModel}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                      <div className="absolute top-4 left-4 bg-[#990000] text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-xl">AUTHENTIC</div>
                    </div>

                    {/* Details Section */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <Link href={`/vehicle/${v._id}`}>
                            <h3 className="text-2xl font-bold font-outfit text-white group-hover:text-[#D4AF37] transition-colors">
                              {v.year} {v.normalizedMake} {v.normalizedModel}
                            </h3>
                          </Link>
                          <div className="text-zinc-500 hover:text-red-500 cursor-pointer transition-colors">❤</div>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400 mb-6 font-medium">
                          <span className="flex items-center gap-2"><MapPin size={16} className="text-[#D4AF37]"/> {v.city || v.location || "Hargeisa"}</span>
                          <span className="flex items-center gap-2"><Calendar size={16} className="text-[#D4AF37]"/> {v.year || "N/A"}</span>
                          <span className="flex items-center gap-2"><Gauge size={16} className="text-[#D4AF37]"/> Automatic</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto pt-6 border-t border-zinc-800/50 gap-4">
                        <div className="w-full sm:w-auto">
                          <div className="text-[#D4AF37] font-black text-3xl font-outfit leading-none">
                            ${v.priceUsd ? v.priceUsd.toLocaleString() : "Contact"}
                          </div>
                          <span className="text-[10px] font-bold text-zinc-600 tracking-widest uppercase mt-1 block">Institutional Guide Price</span>
                        </div>
                        
                        <Link href={`/vehicle/${v._id}`} className="w-full sm:w-auto text-center bg-zinc-100 text-black hover:bg-[#D4AF37] font-black px-8 py-3 rounded-xl transition-all shadow-lg active:scale-95">
                          RESERVE NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer bg-[#050505] border-t border-zinc-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-outfit font-black text-4xl text-zinc-800 mb-4 tracking-tighter cursor-default select-none">SAIP</div>
          <p className="text-zinc-600 text-sm max-w-lg mx-auto leading-relaxed">
            The Somaliland Automotive Intelligence Platform is the sovereign source for automotive data, market values, and business directory services in the Republic of Somaliland.
          </p>
          <div className="mt-8 pt-8 border-t border-zinc-900 flex justify-center gap-10 text-[10px] font-black text-zinc-700 tracking-[0.2em] uppercase">
            <span>© 2026 M2 Creative</span>
            <span>Policy is Design</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

