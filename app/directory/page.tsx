"use client";
import Link from "next/link";
import AuthHeaderNav from "@/components/AuthHeaderNav";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Phone, MapPin, Search, Star, MessageSquare, Map as MapIcon, Layers, Navigation, ShieldCheck, Settings } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["all", "car_dealer", "garage", "spare_parts", "tire_shop", "fuel_station", "car_wash"];

export default function DirectoryPage() {
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'map'
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const businesses = useQuery(api.functions.getBusinesses, {});

  // Simulated Google Maps Search Output (Phase 2 integration)
  const [mapSearch, setMapSearch] = useState("");
  const [mapResults, setMapResults] = useState<any>(null);
  const [searching, setSearching] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <nav className="navbar">
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

      <main className="max-w-[1400px] mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-outfit text-gray-900">Somaliland Auto Directory</h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <MapPin size={16} className="text-[#c41e1e]" /> Verified Automotive Businesses
            </p>
          </div>
          
          <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
            <button 
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'list' ? 'bg-[#c41e1e] text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              List View
            </button>
            <button 
              onClick={() => setActiveTab("map")}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === 'map' ? 'bg-[#c41e1e] text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <MapIcon size={16} /> Map View (Live)
            </button>
          </div>
        </div>

        {/* Directory Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Garages, Dealers by name or city..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#c41e1e] focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide md:w-1/2">
             {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium text-sm capitalize transition-colors ${
                  activeCategory === cat ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Map View Integration */}
        {activeTab === "map" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8 h-[700px] flex flex-col relative">
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <Navigation size={20} className="text-[#c41e1e]" />
                <h3 className="font-bold font-outfit">Somaliland Market Density Radar</h3>
              </div>
              <form onSubmit={searchMap} className="flex gap-2 w-full max-w-md">
                <input 
                  type="text" 
                  placeholder="Google Maps Search (e.g., 'Toyota parts Hargeisa')"
                  value={mapSearch}
                  onChange={e => setMapSearch(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg text-sm bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-[#c41e1e]"
                />
                <button type="submit" disabled={searching} className="bg-[#c41e1e] hover:bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold disabled:opacity-50">
                  {searching ? "Searching..." : "Scan"}
                </button>
              </form>
            </div>
            
            <div className="flex-1 relative bg-[#e5e7eb] overflow-hidden">
               {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="absolute inset-0 bg-blue-500/10"></div>
              
              {/* Overlay Grid lines for density visualization */}
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

              {/* Map Pins Simulation */}
              {filteredBusinesses?.map((b, i) => (
                <div key={b._id} className="absolute group cursor-pointer" style={{ top: `${20 + (i * 15)}%`, left: `${30 + (i * 10)}%` }}>
                  <div className="relative">
                    <div className="w-8 h-8 bg-[#c41e1e] rounded-full flex items-center justify-center text-white shadow-lg z-10 relative group-hover:scale-110 transition-transform">
                      <StoreIcon category={b.category || "other"} />
                    </div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-xs font-bold py-1 px-2 rounded whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none border border-gray-100">
                      {b.name || "Unnamed Business"}
                    </div>
                  </div>
                </div>
              ))}

              {mapResults && (
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-2xl border border-gray-100 max-w-sm z-20 animate-in slide-in-from-bottom">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-gray-900 border-b-2 border-[#c41e1e] inline-block pb-1">MAPS AI INTELLIGENCE</h4>
                    <button onClick={() => setMapResults(null)} className="text-gray-400 hover:text-gray-600">×</button>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{mapResults.message}</p>
                  <div className="space-y-3">
                    {mapResults.results?.map((res: any, idx: number) => (
                      <div key={idx} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <MapPin size={16} className="text-[#c41e1e] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{res.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{res.address}</p>
                          <p className="text-xs font-medium text-green-600 mt-1">{res.rating} ★</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Map Legend */}
            <div className="bg-white border-t border-gray-200 p-3 flex gap-6 overflow-x-auto text-xs font-medium text-gray-600 justify-center">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#c41e1e]"></div> Dealership</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-600"></div> Repair Garage</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Spare Parts</span>
            </div>
          </div>
        )}

        {/* Directory Grid (List View) */}
        {activeTab === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBusinesses === undefined ? (
              <p className="col-span-4 text-center text-gray-500 py-10">Loading business directory...</p>
            ) : filteredBusinesses.length === 0 ? (
              <p className="col-span-4 text-center text-gray-500 py-10">No businesses found. Try adjusting your search.</p>
            ) : (
              filteredBusinesses.map(b => (
                <div key={b._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-red-50 text-[#c41e1e] rounded-xl flex items-center justify-center font-bold text-2xl shadow-sm group-hover:bg-[#c41e1e] group-hover:text-white transition-colors">
                      {(b.name || "B").charAt(0)}
                    </div>
                    {b.verifiedAt && <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1"><ShieldCheck size={12}/> Verified</div>}
                  </div>
                  
                  <h3 className="font-bold text-xl font-outfit text-gray-900 mb-1 group-hover:text-[#c41e1e] transition-colors">{b.name || "Unnamed Business"}</h3>
                  <p className="text-xs text-gray-500 font-medium tracking-wider uppercase mb-4">{(b.category || "other").replace("_", " ")}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{b.city || "Somaliland"}</span>
                    </div>
                    {b.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-900">{b.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                       <span className="flex text-yellow-500 text-sm gap-0.5"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} className="text-gray-300" /></span>
                       <button className="text-[#c41e1e] font-bold text-sm bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">View Profile</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

       {/* MAPS AI Callout */}
       <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-12 text-center px-4">
        <h2 className="text-3xl font-bold font-outfit mb-4">Are you a Business Owner in Somaliland?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">Claim your business profile, increase your visibility on the Somaliland Automotive Intelligence Platform, and connect with thousands of buyers looking for vehicles, parts, and services.</p>
        <button className="bg-[#c41e1e] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-900/20 transition-all flex justify-center items-center gap-2 mx-auto">
          <Layers size={20} /> Claim Your Verified Business
        </button>
      </div>

       <footer className="footer bg-gray-950 text-white py-12 text-center">
        <p><strong>SAIP</strong> — Somaliland Automotive Intelligence Platform • Built by <strong>M2 Creative & Consulting</strong></p>
      </footer>
    </div>
  );
}

// Helper for map icons
function StoreIcon({ category }: { category: string }) {
  if (category === 'car_dealer') return <MapPin size={16} />;
  if (category === 'garage') return <Settings size={16} />;
  return <MapPin size={16} />;
}
