"use client";
import Link from "next/link";
import AuthHeaderNav from "@/components/AuthHeaderNav";
import { useState } from "react";
import { ShieldAlert, Info, Settings, Clock, ShieldCheck, MapPin, Gauge, Video, Sparkles, Search } from "lucide-react";

export default function VehicleProfilePage({ params }: { params: { id: string } }) {
  const [animating, setAnimating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const vehicleImg = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200";

  const animateImage = async () => {
    setAnimating(true);
    try {
      const res = await fetch("/api/veo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: vehicleImg, prompt: "Dynamic showroom pan and zoom effect" })
      });
      const data = await res.json();
      if (data.success) {
        setVideoUrl(data.videoUrl);
      }
    } finally {
      setAnimating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="nav-logo">🚗 SAIP <span>.sl</span></Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/marketplace">Marketplace</Link></li>
            <li><Link href="/directory">Directory</Link></li>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><AuthHeaderNav /></li>
          </ul>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Veo 3 Action Bar */}
        <div className="w-full bg-gradient-to-r from-gray-900 to-[#c41e1e] p-4 rounded-xl shadow-md text-white flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-400" />
            <h3 className="font-bold font-outfit">Veo 3 AI Studio</h3>
            <span className="hidden sm:inline text-sm opacity-90">— Transform standard photos into cinematic video ads instantly.</span>
          </div>
          <button 
            onClick={animateImage}
            disabled={animating}
            className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            {animating ? "Generating Video..." : <><Video size={18} className="mr-2" /> Animate Ad</>}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Gallery & AI Video Player */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
              {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className="w-full h-[500px] object-cover" />
              ) : (
                <img 
                  src={vehicleImg}
                  alt="Toyota Land Cruiser"
                  className="w-full h-[500px] object-cover"
                />
              )}
              {videoUrl && <div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs uppercase px-2 py-1 rounded">VEO 3 RENDER</div>}
            </div>

            {/* AI Agent Fact Check Insight */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-2"><Search size={18} /> Google Search Agent Fact-Check</h3>
              <p className="text-sm text-blue-800">
                Data matched against regional import records. Value aligns with 2018 Toyota Land Cruiser VX average prices in Somaliland ($45,000 - $52,000). The seller is highly verified via institutional links.
              </p>
            </div>

            {/* Existing Specs table... (keeping structure simple for MVP) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold font-outfit text-gray-900 flex items-center gap-2">
                  <Info size={20} className="text-[#c41e1e]" /> Vehicle Specifications
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 p-6 gap-y-6 gap-x-4">
                <div><p className="text-sm text-gray-500 mb-1">Make</p><p className="font-medium text-gray-900">Toyota</p></div>
                <div><p className="text-sm text-gray-500 mb-1">Model</p><p className="font-medium text-gray-900">Land Cruiser</p></div>
                <div><p className="text-sm text-gray-500 mb-1">Year</p><p className="font-medium text-gray-900">2018</p></div>
                <div><p className="text-sm text-gray-500 mb-1">Color</p><p className="font-medium text-gray-900">White</p></div>
                <div><p className="text-sm text-gray-500 mb-1">Transmission</p><p className="font-medium text-gray-900">Automatic</p></div>
                <div><p className="text-sm text-gray-500 mb-1">Fuel Type</p><p className="font-medium text-gray-900">Diesel</p></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border-t-4 border-[#c41e1e] p-6 lg:p-8">
              <h1 className="text-3xl font-bold font-outfit text-gray-900 mb-2">2018 Toyota Land Cruiser</h1>
              <p className="text-gray-500 flex items-center gap-2 mb-6 font-medium">
                <MapPin size={18} className="text-gray-400" /> Hargeisa, Jigjiga Yar
              </p>
              
              <div className="border-b border-gray-100 pb-6 mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Asking Price</p>
                <p className="text-4xl font-bold text-[#c41e1e] font-outfit tracking-tight">$48,000</p>
                <p className="text-sm text-gray-500 mt-2">Negotiable</p>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-[#c41e1e] hover:bg-[#a01818] text-white font-bold py-4 rounded-xl transition-colors text-lg shadow-lg hover:-translate-y-1">
                  Contact Seller
                </button>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold py-3 rounded-xl transition-colors">
                    WhatsApp
                  </button>
                  <button className="w-14 bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center rounded-xl transition-colors">
                    ♥️
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg text-green-700">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold font-outfit text-gray-900 text-lg">Verified Seller</h3>
                  <p className="text-sm text-gray-500">Identity & documents verified</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
