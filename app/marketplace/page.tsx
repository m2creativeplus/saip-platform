"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthHeaderNav from "@/components/AuthHeaderNav";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Tag, 
  MoreVertical,
  ChevronDown,
  Zap
} from "lucide-react";

const MAKES = ["All Makes", "Toyota", "Honda", "Nissan", "Suzuki", "Mitsubishi"];

export default function MarketplacePage() {
  const [mounted, setMounted] = useState(false);
  const [activeMake, setActiveMake] = useState("All Makes");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const listings = useQuery(api.functions.getListings, { limit: 100 });
  
  const filteredListings = listings?.filter((l: any) => {
    const matchesMake = activeMake === "All Makes" || (l.normalizedMake || "").toLowerCase() === activeMake.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      (l.normalizedMake || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.normalizedModel || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMake && matchesSearch;
  });

  if (!mounted) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-[#D4AF37] animate-pulse font-outfit font-black text-4xl tracking-tighter">SAIP</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-inter">
      {/* Premium Navbar */}
      <nav className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-8">
          <Link href="/" className="nav-logo flex items-center gap-2">
            <span className="text-[#D4AF37] text-2xl font-black tracking-tighter">SAIP</span>
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest border-l border-zinc-800 pl-3">Intelligence Hub</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-white font-bold text-sm border-b-2 border-[#D4AF37] pb-1">Marketplace</Link>
            <Link href="/directory" className="text-zinc-500 hover:text-white transition-colors text-sm font-medium">Directory</Link>
            <Link href="/admin" className="text-zinc-500 hover:text-white transition-colors text-sm font-medium">Analytics</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <AuthHeaderNav />
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-8 space-y-8">
        {/* Intelligence Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Data Table <span className="text-xs font-bold text-zinc-600 uppercase tracking-[0.3em] ml-4">Marketplace Node: HGSA-01</span></h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Zap className="w-3 h-3 fill-current" />
                Live Feed Active
              </span>
              <span className="text-xs font-medium text-zinc-500">Syncing with 274 Nodes across Somaliland</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="bg-[#D4AF37] text-[#050505] font-black px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm hover:scale-95 transition-all shadow-lg shadow-amber-500/10">
              <Download className="w-4 h-4" />
              EXPORT DATA
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Intelligence Control Bar */}
        <div className="glass-panel p-2 rounded-xl border border-white/5 flex flex-col md:flex-row gap-2">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by VIN, Make, Model, or Plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D0D0E] border border-white/5 rounded-lg pl-11 pr-4 py-3 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm font-medium"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <select 
                value={activeMake}
                onChange={(e) => setActiveMake(e.target.value)}
                className="bg-[#0D0D0E] border border-white/5 rounded-lg pl-11 pr-8 py-3 outline-none focus:border-amber-500/50 appearance-none text-sm font-medium cursor-pointer min-w-[160px]"
              >
                {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            
            <button className="bg-[#1A1A1B] text-white px-4 py-3 rounded-lg border border-white/5 hover:bg-[#252526] transition-colors flex items-center gap-2 text-sm font-bold">
              <Tag className="w-4 h-4" />
              Filters
              <span className="bg-amber-500 text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full ml-1">2</span>
            </button>
          </div>
        </div>

        {/* High-Density Data Hub */}
        <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-left text-[10px] font-black tracking-widest text-zinc-500 uppercase"># ↓</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black tracking-widest text-zinc-500 uppercase">Preview</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black tracking-widest text-zinc-500 uppercase">Vehicle Details</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black tracking-widest text-zinc-500 uppercase">Price (USD)</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black tracking-widest text-zinc-500 uppercase">Market Grade</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black tracking-widest text-zinc-500 uppercase">Region</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black tracking-widest text-zinc-500 uppercase">Verification</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black tracking-widest text-zinc-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredListings === undefined ? (
                  <tr>
                    <td colSpan={8} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-2 border-amber-500/50 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-zinc-500 font-bold text-sm animate-pulse tracking-widest">QUERYING SOVEREIGN NODES...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredListings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-24 text-center">
                      <p className="text-zinc-500 font-bold text-sm tracking-widest">NO ASSETS FOUND IN CURRENT NODE</p>
                    </td>
                  </tr>
                ) : (
                  filteredListings.map((v: any, index: number) => (
                    <tr key={v._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4 text-xs font-mono text-zinc-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="relative w-16 h-10 rounded-md overflow-hidden bg-zinc-900 border border-white/5">
                          <img 
                            src={v.images?.[0] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200"} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt="Vehicle Preview" 
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-sm tracking-tight">{v.year} {v.normalizedMake} {v.normalizedModel}</span>
                          <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1 font-medium">
                            <Tag className="w-3 h-3 text-amber-500" />
                            {v.category || "Premium SUV"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-amber-500 font-outfit">
                            ${v.priceUsd ? v.priceUsd.toLocaleString() : "Contact"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map(star => (
                              <div key={star} className={`w-1 h-3 rounded-full ${star <= (v.rating || 4) ? 'bg-amber-500' : 'bg-zinc-800'}`}></div>
                            ))}
                            <span className="text-[10px] font-bold text-zinc-400 ml-1">A+</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-zinc-200 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-500" />
                            {v.city || "Hargeisa"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-md w-fit">
                          <ShieldCheck className="w-3 h-3 text-green-500" />
                          <span className="text-[10px] font-black text-green-500 uppercase tracking-tighter">Verified</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/vehicle/${v._id}`}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination/Status Footer */}
          <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">SAIP Core Engine v1.0.4 | Node: Somaliland-Main</span>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-zinc-500">Page 1 of 12</span>
              <div className="flex gap-1">
                <button className="px-3 py-1 rounded border border-white/5 text-xs text-zinc-500 hover:text-white transition-colors disabled:opacity-30" disabled>PREV</button>
                <button className="px-3 py-1 rounded border border-white/5 text-xs text-zinc-500 hover:text-white transition-colors">NEXT</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
