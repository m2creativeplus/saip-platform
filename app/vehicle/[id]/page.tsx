"use client";
import Link from "next/link";

const VEHICLE = {
  make: "Toyota", model: "Vitz", year: 2012, color: "White", plate: "SL-49201-M",
  engine: "1NZ-FE 1.5L", transmission: "CVT", fuel: "Gasoline", vin: "JTM1R2EV3GD123456",
  status: "active", mileage: 98000, city: "Hargeisa", price: 4800, fraudScore: "LOW",
  img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=500&fit=crop",
  seller: "Hassan Cars", phone: "+252634334455", source: "facebook",
};

const SERVICE = [
  { date: "2025-12-01", type: "Oil Change", shop: "MASS Car Workshop", cost: 35 },
  { date: "2025-09-15", type: "Tire Rotation", shop: "Burco Tyre Center", cost: 25 },
  { date: "2025-06-20", type: "Brake Inspection", shop: "MASS Car Workshop", cost: 55 },
  { date: "2025-03-01", type: "Full Service", shop: "Hargeisa Body Works", cost: 120 },
];

export default function VehicleProfilePage() {
  return (
    <div>
      <nav className="navbar"><div className="navbar-inner">
        <Link href="/" className="nav-logo">🚗 SAIP <span>.sl</span></Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/marketplace">Marketplace</Link></li>
          <li><Link href="/directory">Directory</Link></li>
          <li><Link href="/admin">Dashboard</Link></li>
        </ul>
      </div></nav>

      <section className="section">
        {/* Vehicle Hero */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          <div style={{ borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border-light)" }}>
            <img src={VEHICLE.img} alt={`${VEHICLE.make} ${VEHICLE.model}`} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 350 }} />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.2rem", fontWeight: 900, marginBottom: 8 }}>{VEHICLE.make} {VEHICLE.model}</h1>
            <p style={{ color: "var(--text-mid)", marginBottom: 20 }}>{VEHICLE.year} • {VEHICLE.plate} • {VEHICLE.city}</p>

            <div className="stats-row" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <div className="stat-box">
                <div className="stat-label">Market Value</div>
                <div className="stat-value" style={{ color: "var(--primary)", fontSize: "1.8rem" }}>${VEHICLE.price.toLocaleString()}</div>
                <div className="stat-change">Based on Hargeisa data</div>
              </div>
              <div className="stat-box green">
                <div className="stat-label">Fraud Risk</div>
                <div className="stat-value" style={{ color: "#16a34a", fontSize: "1.8rem" }}>{VEHICLE.fraudScore}</div>
                <div className="stat-change">VIN + mileage verified</div>
              </div>
              <div className="stat-box blue">
                <div className="stat-label">Odometer</div>
                <div className="stat-value" style={{ fontSize: "1.8rem" }}>{VEHICLE.mileage.toLocaleString()}</div>
                <div className="stat-change">kilometers</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <a href={`tel:${VEHICLE.phone}`} className="btn-details" style={{ flex: 1, justifyContent: "center" }}>📞 Call Seller</a>
              <button className="btn-outline" style={{ flex: 1 }}>💬 WhatsApp</button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-light)", borderRadius: "var(--radius)", padding: 24 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Vehicle Specifications</h3>
            <table style={{ width: "100%" }}>
              <tbody>
                {[
                  ["Make", VEHICLE.make], ["Model", VEHICLE.model], ["Year", VEHICLE.year],
                  ["Color", VEHICLE.color], ["Engine", VEHICLE.engine], ["Transmission", VEHICLE.transmission],
                  ["Fuel", VEHICLE.fuel], ["VIN", VEHICLE.vin], ["Plate", VEHICLE.plate], ["Status", VEHICLE.status],
                ].map(([k, v], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "10px 0", fontWeight: 500, color: "var(--text-light)", width: "40%" }}>{k}</td>
                    <td style={{ padding: "10px 0", fontWeight: 600 }}>{String(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-light)", borderRadius: "var(--radius)", padding: 24 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Service History</h3>
            <table className="data-table">
              <thead><tr><th>Date</th><th>Service</th><th>Shop</th><th>Cost</th></tr></thead>
              <tbody>
                {SERVICE.map((s, i) => (
                  <tr key={i}>
                    <td>{s.date}</td>
                    <td style={{ fontWeight: 600 }}>{s.type}</td>
                    <td>{s.shop}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 600 }}>${s.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Seller Info */}
        <div style={{ marginTop: 24, background: "var(--bg-white)", border: "1px solid var(--border-light)", borderRadius: "var(--radius)", padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: 4 }}>Listed by: {VEHICLE.seller}</h3>
            <p style={{ color: "var(--text-mid)", fontSize: "0.9rem" }}>{VEHICLE.phone} • Found on {VEHICLE.source}</p>
          </div>
          <Link href="/marketplace" className="btn-outline">← Back to Marketplace</Link>
        </div>
      </section>

      <footer className="footer"><p><strong>SAIP</strong> — Somaliland Automotive Intelligence Platform • Built by <strong>M2 Creative & Consulting</strong></p></footer>
    </div>
  );
}
