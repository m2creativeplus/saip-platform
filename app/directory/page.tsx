"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthHeaderNav from "@/components/AuthHeaderNav";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Phone, MapPin, Search, Star, MessageSquare, Map as MapIcon, Layers, Navigation, ShieldCheck, Settings, Store as StoreIconLucide } from "lucide-react";

const CATEGORIES = ["all", "car_dealer", "garage", "spare_parts", "tire_shop", "fuel_station", "car_wash"];

export default function DirectoryPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'map'
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const businesses = useQuery(api.functions.getBusinesses, {});

  // Simulated Google Maps Search Output (Phase 2 integration)
  const [mapSearch, setMapSearch] = useState("");
  const [mapResults, setMapResults] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const searchMap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapSearch) return;
    setSearching(true);
    try {
      const res = await fetch(`/api/maps?q=${encodeURIComponent(mapSearch)}`);
      const data = await res.json();
      setMapResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  const filteredBusinesses = businesses?.filter(b => 
    (activeCategory === "all" || (b.category || "").toLowerCase() === activeCategory.toLowerCase()) &&
    ((b.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || (b.city || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!mounted) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-[#D4AF37] animate-pulse font-outfit font-black text-4xl">SAIP</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col">
      <nav className="navbar border-b border-zinc-800/50">
        <div className="navbar-inner flex justify-between items-center">
          <Link href="/" className="nav-logo">🚗 SAIP <span>.sl</span></Link>
          <ul className="nav-links hidden md:flex">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/marketplace">All Ads</Link></li>
            <li><Link href="/directory" className="active">Directory</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><AuthHeaderNav /></li>
          </ul>
        </div>
      </nav>

      <main className="flex-1 max-w-[1400px] mx-auto px-4 py-12 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="flex flex-col gap-4">
            <div className="w-20 h-20 bg-black rounded-2xl border border-zinc-800 flex items-center justify-center p-3">
               <img src="/logo-somaliland.png" alt="Republic of Somaliland" className="w-14 h-14 object-contain" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-outfit text-white">Institutional <em>Directory</em></h1>
              <p className="text-zinc-500 mt-2 text-lg flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#D4AF37]" /> Verified Automotive Businesses in Somaliland
              </p>
            </div>
          </div>
          
          <div className="flex bg-[#18181b] rounded-xl p-1 border border-zinc-800 shadow-xl">
            <button 
              onClick={() => setActiveTab("list")}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'list' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
              LIST VIEW
            </button>
            <button 
              onClick={() => setActiveTab("map")}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'map' ? 'bg-[#990000] text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
              <MapIcon size={16} /> RADAR VIEW
            </button>
          </div>
        </div>

        {/* Directory Filters */}
        <div className="bg-[#18181b] p-6 rounded-2xl shadow-xl border border-zinc-800/50 flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
              type="text" 
              placeholder="Search Garages, Dealers by name or city..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all text-white font-medium shadow-inner"
            />
          </div>
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide md:w-1/2">
             {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl whitespace-nowrap font-bold text-xs uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? "bg-zinc-100 text-black border-zinc-100" 
                    : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                {cat.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Map View Integration */}
        {activeTab === "map" && (
          <div className="bg-[#18181b] rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden mb-12 h-[750px] flex flex-col relative group/map">
            <div className="p-5 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 flex justify-between items-center z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#990000] rounded-xl flex items-center justify-center shadow-lg shadow-red-950/20">
                  <Navigation size={20} className="text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black font-outfit text-white leading-none">SOVEREIGN RADAR</h3>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1 block">Live Density Visualisation</span>
                </div>
              </div>
              <form onSubmit={searchMap} className="flex gap-2 w-full max-w-md">
                <input 
                  type="text" 
                  placeholder="Scan specific node (e.g., 'Toyota parts Hargeisa')"
                  value={mapSearch}
                  onChange={e => setMapSearch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#c41e1e] transition-colors"
                />
                <button type="submit" disabled={searching} className="bg-[#990000] hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider disabled:opacity-50 transition-all shadow-lg active:scale-95">
                  {searching ? "SCANNING..." : "EXECUTE"}
                </button>
              </form>
            </div>
            
            <div className="flex-1 relative bg-zinc-950 overflow-hidden">
               {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-20 grayscale brightness-50" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              
              {/* Overlay Grid lines for density visualization */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

              {/* Map Pins Simulation */}
              {filteredBusinesses?.map((b, i) => (
                <div key={b._id} className="absolute group/pin cursor-pointer" style={{ top: `${20 + (i * 12) % 65}%`, left: `${15 + (i * 18) % 75}%` }}>
                  <div className="relative">
                    <div className="w-10 h-10 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-black shadow-2xl z-10 relative group-hover/pin:scale-125 group-hover/pin:bg-white transition-all duration-300 rotate-45 border-2 border-zinc-900">
                      <div className="-rotate-45">
                        <StoreIcon category={b.category || "other"} />
                      </div>
                    </div>
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black py-2 px-4 rounded-xl whitespace-nowrap shadow-2xl opacity-0 translate-y-2 group-hover/pin:opacity-100 group-hover/pin:translate-y-0 transition-all duration-300 z-30 pointer-events-none border border-zinc-200 uppercase tracking-widest">
                      {b.name || "Unnamed Business"}
                    </div>
                  </div>
                </div>
              ))}

              {mapResults && (
                <div className="absolute bottom-10 left-10 bg-zinc-900/90 backdrop-blur-xl p-6 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-zinc-800 max-w-sm z-30 animate-in slide-in-from-left duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black text-white text-lg font-outfit leading-none mb-1">NODE RESULTS</h4>
                      <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase">Intelligence Feed</span>
                    </div>
                    <button onClick={() => setMapResults(null)} className="text-zinc-500 hover:text-white transition-colors">×</button>
                  </div>
                  <p className="text-sm text-zinc-400 mb-6 leading-relaxed italic border-l-2 border-zinc-800 pl-4">"{mapResults.message}"</p>
                  <div className="space-y-4">
                    {mapResults.results?.map((res: any, idx: number) => (
                      <div key={idx} className="flex gap-4 items-start p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                        <MapPin size={18} className="text-[#D4AF37] mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-white text-sm">{res.name}</p>
                          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">{res.address}</p>
                          <div className="flex items-center gap-2 mt-2">
                             <span className="text-xs font-black text-white">{res.rating}★</span>
                             <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-[#D4AF37]" style={{ width: `${(res.rating/5)*100}%` }}></div>
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Map Legend */}
            <div className="bg-zinc-900 border-t border-zinc-800 p-4 flex gap-8 overflow-x-auto text-[10px] font-black text-zinc-500 justify-center tracking-[0.2em] uppercase">
              <span className="flex items-center gap-2.5 hover:text-white transition-colors"><div className="w-2.5 h-2.5 rounded bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)]"></div> DEALERSHIP</span>
              <span className="flex items-center gap-2.5 hover:text-white transition-colors"><div className="w-2.5 h-2.5 rounded bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div> REPAIR NODE</span>
              <span className="flex items-center gap-2.5 hover:text-white transition-colors"><div className="w-2.5 h-2.5 rounded bg-[#990000] shadow-[0_0_10px_rgba(153,0,0,0.3)]"></div> INFRASTRUCTURE</span>
            </div>
          </div>
        )}

        {/* Directory Grid (List View) */}
        {activeTab === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBusinesses === undefined ? (
              <div className="col-span-full py-20 text-center text-zinc-500 flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                <p className="font-outfit animate-pulse">Scanning Institutional Directory...</p>
              </div>
            ) : filteredBusinesses.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-[#18181b] rounded-2xl border border-zinc-800 border-dashed">
                <p className="text-zinc-400 text-lg">No verified businesses match this criteria.</p>
              </div>
            ) : (
              filteredBusinesses.map(b => (
                <div key={b._id} className="group bg-[#18181b] p-8 rounded-3xl border border-zinc-800/50 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.05)] transition-all flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[#D4AF37]/10 transition-all duration-500"></div>
                  
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-transparent transition-all duration-500">
                      {(b.name || "B").charAt(0)}
                    </div>
                    {b.verifiedAt && <div className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] px-3 py-1.5 rounded-full font-black flex items-center gap-1.5 uppercase tracking-widest"><ShieldCheck size={14}/> VERIFIED</div>}
                  </div>
                  
                  <h3 className="font-black text-2xl font-outfit text-white mb-1 group-hover:text-[#D4AF37] transition-colors leading-tight">{b.name || "Unnamed Business"}</h3>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-8">{(b.category || "other").replace("_", " ")}</p>
                  
                  <div className="space-y-4 text-sm text-zinc-400 mt-auto pt-8 border-t border-zinc-900 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                        <MapPin size={16} />
                      </div>
                      <span className="font-medium">{b.city || "Republic of Somaliland"}</span>
                    </div>
                    {b.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                          <Phone size={16} />
                        </div>
                        <span className="font-black text-white">{b.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-4">
                       <span className="flex text-[#D4AF37] gap-1">
                         <Star size={14} fill="currentColor" />
                         <Star size={14} fill="currentColor" />
                         <Star size={14} fill="currentColor" />
                         <Star size={14} fill="currentColor" />
                         <Star size={14} className="text-zinc-800" />
                       </span>
                       <button className="text-black bg-white font-black text-[10px] px-4 py-2 rounded-xl hover:bg-[#D4AF37] transition-all uppercase tracking-widest">DOSSIER</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

       {/* MAPS AI Callout */}
       <div className="relative py-24 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#101010] to-[#0A0A0A]"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600')] bg-cover bg-fixed grayscale"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="inline-block px-4 py-2 bg-[#990000]/20 rounded-full mb-8 border border-[#990000]/30">
            <span className="text-[#990000] font-black text-[10px] uppercase tracking-[0.3em]">Institutional Network</span>
          </div>
          <h2 className="text-5xl font-black font-outfit text-white mb-6 leading-tight">Project your Presence. <em>Establish Governance.</em></h2>
          <p className="text-zinc-500 mb-12 text-xl leading-relaxed">Claim your verified institutional profile. Align your business with the sovereign automotive intelligence network of the Republic of Somaliland.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-black hover:bg-[#D4AF37] px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center gap-3 justify-center shadow-2xl active:scale-95 group">
              <Layers size={24} className="group-hover:rotate-90 transition-transform" /> ENROLL ORGANIZATION
            </button>
            <button className="border border-zinc-800 text-zinc-400 hover:bg-zinc-800/50 px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center gap-3 justify-center">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>

       <footer className="footer bg-[#050505] border-t border-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-outfit font-black text-4xl text-zinc-800 mb-4 tracking-tighter hover:text-[#D4AF37] transition-colors cursor-default select-none">SAIP</div>
          <p className="text-zinc-600 text-sm max-w-lg mx-auto leading-relaxed">
            The Somaliland Automotive Intelligence Platform is the sovereign source for automotive data, market values, and business directory services in the Republic of Somaliland.
          </p>
          <div className="mt-8 pt-8 border-t border-zinc-900 flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] font-black text-zinc-700 tracking-[0.2em] uppercase">
            <span>© 2026 M2 Creative & Consulting</span>
            <span>Policy is Design</span>
            <span>Digital Sovereignty Authorized</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper for map icons
function StoreIcon({ category }: { category: string }) {
  if (category === 'car_dealer') return <ShieldCheck size={20} />;
  if (category === 'garage') return <Settings size={20} />;
  if (category === 'fuel_station') return <Navigation size={20} />;
  return <StoreIconLucide size={20} />;
}

