"use client";

import Link from "next/link";
import { useState } from "react";
import AuthHeaderNav from "@/components/AuthHeaderNav";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Sparkles, Wand2, Image as ImageIcon, Loader2, LayoutDashboard, Database, Activity, MapPin, Users, Settings, LogOut, Search, Bell } from "lucide-react";

export default function AdminPage() {
  const stats = useQuery(api.functions.getDashboardStats);
  
  // Nano Banana Image Gen state
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/nano-banana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedImg(data.imageUrl);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex bg-[#f5f6fa] min-h-screen">
      
      {/* Sidebar - MASS Workshop Style */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="text-2xl font-black font-outfit text-gray-900 flex items-center gap-2">
            <span className="bg-[#c41e1e] text-white p-1.5 rounded-lg">S</span> SAIP
          </Link>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-2">Control Center</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 bg-red-50 text-[#c41e1e] rounded-lg font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/marketplace" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <Database size={18} /> Marketplace Hub
          </Link>
          <Link href="/directory" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <MapPin size={18} /> Business Directory
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <Activity size={18} /> AI Pipelines
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <Users size={18} /> User Accounts
          </button>
        </div>
        
        <div className="p-4 border-t border-gray-200 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <Settings size={18} /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
            <LogOut size={18} /> Leave Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search metrics, vehicles, logs..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#c41e1e]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <AuthHeaderNav />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold font-outfit text-gray-900">Platform Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Real-time statistics connected to Convex</p>
          </div>

          {/* Real-time Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Listings</p>
                  <h3 className="text-3xl font-bold font-outfit text-gray-900 mt-1">{stats ? stats.totalListings : "..."}</h3>
                </div>
                <div className="p-2 bg-red-50 text-[#c41e1e] rounded-lg"><Database size={20} /></div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
               <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Business Directory</p>
                  <h3 className="text-3xl font-bold font-outfit text-gray-900 mt-1">{stats ? stats.totalBusinesses : "..."}</h3>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><MapPin size={20} /></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
               <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Fraud Flags</p>
                  <h3 className="text-3xl font-bold font-outfit text-gray-900 mt-1">{stats ? stats.totalFraudFlags : "..."}</h3>
                </div>
                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Activity size={20} /></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
               <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Indexed Keywords</p>
                  <h3 className="text-3xl font-bold font-outfit text-gray-900 mt-1">{stats ? stats.totalKeywords : "..."}</h3>
                </div>
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Search size={20} /></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* AI pipeline logs Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Agent Pipeline Status</h2>
                <button className="text-sm text-[#c41e1e] font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-white text-gray-500">
                      <th className="p-4 font-medium">Pipeline</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Records</th>
                      <th className="p-4 font-medium">Time (UTC)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats && stats.recentAgentRuns?.length > 0 ? (
                      stats.recentAgentRuns.map((agent, i) => (
                        <tr key={agent._id} className="hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">{agent.agentName}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              agent.status === 'completed' ? 'bg-green-100 text-green-800' :
                              agent.status === 'running' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {agent.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">{agent.recordsInserted || agent.recordsFound || 0}</td>
                          <td className="p-4 text-gray-500 whitespace-nowrap">
                            {new Date(agent.startedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-500">No active pipelines running.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Studio (Nano Banana) */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden flex flex-col relative">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-[#c41e1e]"></div>
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg"><Sparkles size={20} className="text-orange-600" /></div>
                <div>
                  <h2 className="text-lg font-bold font-outfit text-gray-900">AI Studio: Nano Banana Pro</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Generate high-quality concept art & hero assets directly to CDN</p>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col bg-gray-50">
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="e.g., 'Modern Somali auto repair garage front'" 
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#c41e1e] shadow-sm text-sm"
                  />
                  <button 
                    onClick={generateImage}
                    disabled={generating || !prompt}
                    className="bg-gray-900 hover:bg-[#c41e1e] text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md flex items-center justify-center min-w-[130px]"
                  >
                    {generating ? <Loader2 size={18} className="animate-spin" /> : <><Wand2 size={16} className="mr-2" /> Generate</>}
                  </button>
                </div>

                <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl bg-white flex items-center justify-center p-2 relative overflow-hidden min-h-[300px] shadow-inner">
                  {generatedImg ? (
                    <img src={generatedImg} alt="Generated Asset" className="w-full h-full object-cover rounded-lg shadow-sm" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <ImageIcon size={48} className="mx-auto mb-3 text-gray-300" />
                      <p className="text-sm font-medium">Generated asset will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
