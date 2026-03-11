"use client";
import Link from "next/link";
import { useState } from "react";
import AuthHeaderNav from "@/components/AuthHeaderNav";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MapPin, Calendar, Gauge, CheckCircle } from "lucide-react";

const MAKES = ["All", "Toyota", "Honda", "Nissan", "Suzuki", "Mitsubishi"];
const PRICES = ["All Prices", "$0-$5K", "$5K-$15K", "$15K-$30K", "$30K+"];

export default function MarketplacePage() {
  const [activeMake, setActiveMake] = useState("All");
  const [activePrice, setActivePrice] = useState("All Prices");
  const [layout, setLayout] = useState<"grid" | "list">("list");

  // Fetch Live Convex Data
  const listings = useQuery(api.functions.getListings, { limit: 50 });
  
  // Client-side filtering
  const filteredListings = listings?.filter((l: any) => 
    activeMake === "All" || (l.normalizedMake || "").toLowerCase() === activeMake.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Navbar */}
      <nav className="navbar">
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-outfit text-gray-900">Vehicle Marketplace</h1>
            <p className="text-gray-500 mt-1">Somaliland's largest auto inventory</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {MAKES.map(make => (
              <button
                key={make}
                onClick={() => setActiveMake(make)}
                className={`px-6 py-2 whitespace-nowrap rounded-full font-medium transition-colors border ${
                  activeMake === make 
                    ? "bg-[#c41e1e] text-white border-[#c41e1e]" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {make}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
             {PRICES.map(price => (
              <button
                key={price}
                onClick={() => setActivePrice(price)}
                className={`px-4 py-2 whitespace-nowrap rounded-full font-medium transition-colors border text-sm ${
                  activePrice === price 
                    ? "bg-gray-900 text-white border-gray-900" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        {/* Listing Cards */}
        <div className="flex flex-col gap-4">
          {filteredListings === undefined ? (
            <p className="text-center py-10 text-gray-500">Loading live marketplace...</p>
          ) : filteredListings.length === 0 ? (
            <p className="text-center py-10 text-gray-500">No vehicles found. Try adjusting filters.</p>
          ) : (
            filteredListings.map((v: any) => (
              <div key={v._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                
                {/* Image Section */}
                <div className="w-full md:w-[300px] h-48 md:h-auto relative bg-gray-100">
                  <img src={v.images?.[0] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600"} alt={`${v.normalizedMake} ${v.normalizedModel}`} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">TOP AD</div>
                </div>

                {/* Details Section */}
                <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/vehicle/${v._id}`}>
                        <h3 className="text-xl font-bold font-outfit text-gray-900 hover:text-[#c41e1e] transition-colors">
                          {v.year} {v.normalizedMake} {v.normalizedModel}
                        </h3>
                      </Link>
                      <button className="text-gray-400 hover:text-[#c41e1e]">♥️</button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4 font-medium">
                      <span className="flex items-center gap-1"><MapPin size={16} className="text-gray-400"/> {v.city || v.location || "Hargeisa"}</span>
                      <span className="flex items-center gap-1"><Calendar size={16} className="text-gray-400"/> {v.year || "N/A"}</span>
                      <span className="flex items-center gap-1"><Gauge size={16} className="text-gray-400"/> {"N/A"}</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100 gap-4">
                    <div className="text-[#c41e1e] font-bold text-2xl font-outfit tracking-tight">
                      ${v.priceUsd ? v.priceUsd.toLocaleString() : "Contact"} 
                      <span className="text-sm font-normal text-gray-500 ml-2 block sm:inline">Negotiable</span>
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto">
                      <button className="flex-1 md:flex-none border border-[#c41e1e] text-[#c41e1e] hover:bg-red-50 font-bold px-6 py-2 rounded-lg transition-colors">
                        Call Seller
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="footer bg-gray-900 text-white py-12 text-center">
        <p><strong>SAIP</strong> — Somaliland Automotive Intelligence Platform • Built by <strong>M2 Creative & Consulting</strong></p>
      </footer>
    </div>
  );
}
