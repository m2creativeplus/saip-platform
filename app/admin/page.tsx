"use client";
import Link from "next/link";

const AGENTS = [
  { name: "Google Search", status: "completed", records: 145, duration: "2m 34s", last: "2 hours ago" },
  { name: "Google Maps", status: "completed", records: 87, duration: "3m 12s", last: "2 hours ago" },
  { name: "Facebook Listings", status: "running", records: 203, duration: "running...", last: "now" },
  { name: "NLP Normalizer", status: "completed", records: 312, duration: "1m 45s", last: "3 hours ago" },
  { name: "Vehicle Valuator", status: "completed", records: 50, duration: "0m 52s", last: "6 hours ago" },
  { name: "Fraud Detector", status: "completed", records: 8, duration: "0m 28s", last: "6 hours ago" },
];

const MAKE_DIST = [
  { make: "Toyota", count: 30, pct: 60 },
  { make: "Honda", count: 10, pct: 20 },
  { make: "Nissan", count: 5, pct: 10 },
  { make: "Suzuki", count: 5, pct: 10 },
];

const CAT_DIST = [
  { cat: "Car Dealers", icon: "🚗", count: 12 },
  { cat: "Garages", icon: "🔧", count: 8 },
  { cat: "Spare Parts", icon: "⚙️", count: 15 },
  { cat: "Tire Shops", icon: "🛞", count: 5 },
  { cat: "Fuel Stations", icon: "⛽", count: 10 },
  { cat: "Car Wash", icon: "🧽", count: 6 },
  { cat: "Body Repair", icon: "🎨", count: 4 },
];

export default function AdminPage() {
  return (
    <div>
      <nav className="navbar"><div className="navbar-inner">
        <Link href="/" className="nav-logo">🚗 SAIP <span>.sl</span></Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/marketplace">Marketplace</Link></li>
          <li><Link href="/directory">Directory</Link></li>
          <li><Link href="/admin" className="active">Dashboard</Link></li>
        </ul>
      </div></nav>

      <section className="section">
        <h1 className="section-title" style={{ fontSize: "2rem" }}>Intelligence <em>Dashboard</em></h1>
        <p style={{ color: "var(--text-mid)", marginBottom: 24 }}>Real-time overview of SAIP data collection and AI agent performance</p>

        {/* KPI Stats */}
        <div className="stats-row">
          <div className="stat-box"><div className="stat-label">Vehicle Listings</div><div className="stat-value">50</div><div className="stat-change">↑ 12 today</div></div>
          <div className="stat-box green"><div className="stat-label">Businesses</div><div className="stat-value">30</div><div className="stat-change">↑ 5 today</div></div>
          <div className="stat-box blue"><div className="stat-label">Keywords Active</div><div className="stat-value">547</div><div className="stat-change">10 categories</div></div>
          <div className="stat-box amber"><div className="stat-label">Fraud Alerts</div><div className="stat-value" style={{ color: "#dc2626" }}>3</div><div className="stat-change" style={{ color: "#dc2626" }}>2 high risk</div></div>
        </div>

        {/* Vehicle Make Distribution */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
          <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-light)", borderRadius: "var(--radius)", padding: 24 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Vehicle Make Distribution</h3>
            {MAKE_DIST.map(m => (
              <div key={m.make} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ width: 70, fontWeight: 500, fontSize: "0.9rem" }}>{m.make}</span>
                <div style={{ flex: 1, height: 8, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${m.pct}%`, height: "100%", background: "var(--primary)", borderRadius: 4, transition: "width 0.5s" }} />
                </div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-mid)", width: 60, textAlign: "right" }}>{m.count} ({m.pct}%)</span>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-light)", borderRadius: "var(--radius)", padding: 24 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Business Categories</h3>
            {CAT_DIST.map(c => (
              <div key={c.cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ fontSize: "0.9rem" }}>{c.icon} {c.cat}</span>
                <span className="badge badge-blue">{c.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Pipeline */}
        <div style={{ marginTop: 32, background: "var(--bg-white)", border: "1px solid var(--border-light)", borderRadius: "var(--radius)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <h3 style={{ fontWeight: 700 }}>AI Agent Pipeline Status</h3>
          </div>
          <table className="data-table">
            <thead><tr>
              <th>Agent</th><th>Status</th><th>Records</th><th>Duration</th><th>Last Run</th>
            </tr></thead>
            <tbody>
              {AGENTS.map(a => (
                <tr key={a.name}>
                  <td style={{ fontWeight: 600 }}>{a.name}</td>
                  <td><span className={`badge ${a.status === "completed" ? "badge-green" : a.status === "running" ? "badge-blue" : "badge-amber"}`}>{a.status}</span></td>
                  <td style={{ color: "var(--primary)", fontWeight: 600 }}>{a.records}</td>
                  <td>{a.duration}</td>
                  <td style={{ color: "var(--text-light)" }}>{a.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="footer"><p><strong>SAIP</strong> — Somaliland Automotive Intelligence Platform • Built by <strong>M2 Creative & Consulting</strong></p></footer>
    </div>
  );
}
