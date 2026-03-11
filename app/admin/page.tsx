"use client";
import Link from "next/link";

const STATS = [
  { label: "Vehicle Listings", value: "50", change: "+12 today", color: "#D4AF37" },
  { label: "Businesses", value: "30", change: "+5 today", color: "#22c55e" },
  { label: "Keywords Active", value: "547", change: "10 categories", color: "#3b82f6" },
  { label: "Fraud Alerts", value: "3", change: "2 high risk", color: "#ef4444" },
];

const MAKE_DIST = [
  { make: "Toyota", count: 30, pct: 60, color: "#D4AF37" },
  { make: "Honda", count: 10, pct: 20, color: "#22c55e" },
  { make: "Nissan", count: 5, pct: 10, color: "#3b82f6" },
  { make: "Suzuki", count: 5, pct: 10, color: "#a855f7" },
];

const CATEGORY_DIST = [
  { cat: "Car Dealers", count: 12, icon: "🏪" },
  { cat: "Garages", count: 8, icon: "🔧" },
  { cat: "Spare Parts", count: 15, icon: "⚙️" },
  { cat: "Tire Shops", count: 5, icon: "🛞" },
  { cat: "Fuel Stations", count: 10, icon: "⛽" },
  { cat: "Car Wash", count: 6, icon: "🧽" },
  { cat: "Body Repair", count: 4, icon: "🔨" },
];

const AGENT_RUNS = [
  { name: "Google Search", status: "completed", records: 145, time: "2m 34s", lastRun: "2 hours ago" },
  { name: "Google Maps", status: "completed", records: 87, time: "4m 12s", lastRun: "2 hours ago" },
  { name: "Facebook", status: "running", records: 0, time: "-", lastRun: "now" },
  { name: "NLP Normalizer", status: "completed", records: 212, time: "1m 05s", lastRun: "3 hours ago" },
  { name: "Valuator", status: "completed", records: 50, time: "0m 32s", lastRun: "1 day ago" },
  { name: "Fraud Detector", status: "completed", records: 3, time: "0m 18s", lastRun: "1 day ago" },
];

const CITY_DIST = [
  { city: "Hargeisa", businesses: 22, listings: 35 },
  { city: "Berbera", businesses: 4, listings: 6 },
  { city: "Burco", businesses: 5, listings: 5 },
  { city: "Borama", businesses: 3, listings: 3 },
  { city: "Gabiley", businesses: 1, listings: 1 },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <nav className="nav-glass px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🚗</span>
            <span className="font-['Outfit'] text-lg font-bold gold-text">SAIP Admin</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
            <Link href="/directory" className="text-gray-400 hover:text-white">Directory</Link>
            <Link href="/marketplace" className="text-gray-400 hover:text-white">Marketplace</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-['Outfit'] text-3xl font-bold mb-8">Intelligence Dashboard</h1>

        {/* Stats */}
        <div className="grid-stats mb-10">
          {STATS.map(s => (
            <div key={s.label} className="glass-card p-6">
              <div className="text-gray-500 text-sm mb-1">{s.label}</div>
              <div className="font-['Outfit'] text-4xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-600 mt-1">{s.change}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Vehicle Make Distribution */}
          <div className="glass-card p-6">
            <h2 className="font-['Outfit'] text-lg font-bold mb-4">Vehicle Make Distribution</h2>
            <div className="space-y-4">
              {MAKE_DIST.map(m => (
                <div key={m.make}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{m.make}</span>
                    <span className="text-gray-500">{m.count} ({m.pct}%)</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${m.pct}%`, background: m.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Categories */}
          <div className="glass-card p-6">
            <h2 className="font-['Outfit'] text-lg font-bold mb-4">Business Categories</h2>
            <div className="space-y-3">
              {CATEGORY_DIST.map(c => (
                <div key={c.cat} className="flex items-center justify-between py-2 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{c.icon}</span>
                    <span className="text-sm">{c.cat}</span>
                  </div>
                  <span className="text-[#D4AF37] font-semibold">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Status */}
        <div className="glass-card p-6 mb-10">
          <h2 className="font-['Outfit'] text-lg font-bold mb-4">AI Agent Pipeline Status</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-gray-500 border-b border-white/10">
                <th className="text-left py-3 px-2">Agent</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-2">Records</th>
                <th className="text-left py-3 px-2">Duration</th>
                <th className="text-left py-3 px-2">Last Run</th>
              </tr></thead>
              <tbody>
                {AGENT_RUNS.map(a => (
                  <tr key={a.name} className="border-b border-white/5">
                    <td className="py-3 px-2 font-medium">{a.name}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                        a.status === "completed" ? "bg-green-500/10 text-green-400" :
                        a.status === "running" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"
                      }`}>
                        {a.status === "running" && <span className="pulse-dot !w-2 !h-2"></span>}
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-[#D4AF37]">{a.records}</td>
                    <td className="py-3 px-2 text-gray-400">{a.time}</td>
                    <td className="py-3 px-2 text-gray-500">{a.lastRun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* City Distribution */}
        <div className="glass-card p-6">
          <h2 className="font-['Outfit'] text-lg font-bold mb-4">Data by City</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CITY_DIST.map(c => (
              <div key={c.city} className="text-center p-4 bg-white/5 rounded-xl">
                <div className="font-['Outfit'] font-bold text-xl text-white">{c.city}</div>
                <div className="text-sm text-gray-400 mt-1">{c.businesses} biz • {c.listings} listings</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
