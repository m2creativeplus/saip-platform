"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const VEHICLE_DATA: Record<string, any> = {
  "SL-49201-M": { make: "Toyota", model: "Vitz", year: 2012, color: "White", mileage: 98000, vin: "JTM1R2EV3GD123456", engine: "1NZ-FE 1.5L", transmission: "CVT", fuel: "Gasoline", status: "active", plate: "SL-49201-M", fraudScore: "low", estimatedValue: 4800, city: "Hargeisa" },
  "SL-82307-T": { make: "Toyota", model: "Land Cruiser 79", year: 2017, color: "White", mileage: 48000, vin: "JTM8R5EV5JD789012", engine: "1VD-FTV V8 4.5L Turbo Diesel", transmission: "Manual 5-Speed", fuel: "Diesel", status: "active", plate: "SL-82307-T", fraudScore: "low", estimatedValue: 38000, city: "Hargeisa" },
  "SL-58913-W": { make: "Toyota", model: "Hilux", year: 2018, color: "White", mileage: 55000, vin: "JTM5R6EV7JD345678", engine: "2GD-FTV 2.4L Turbo Diesel", transmission: "Automatic", fuel: "Diesel", status: "active", plate: "SL-58913-W", fraudScore: "low", estimatedValue: 21000, city: "Hargeisa" },
};

const SERVICE_HISTORY = [
  { date: "2026-01-15", service: "Oil Change + Filter", shop: "MASS Car Workshop", cost: 45 },
  { date: "2025-09-22", service: "Brake Pad Replacement", shop: "MASS Car Workshop", cost: 120 },
  { date: "2025-04-10", service: "Full Service (60K)", shop: "Dahabshiil Motors", cost: 280 },
  { date: "2024-11-05", service: "Timing Belt Replacement", shop: "Al-Baraka Auto Parts", cost: 350 },
];

export default function VehiclePage() {
  const params = useParams();
  const plate = decodeURIComponent(params?.id as string || "SL-49201-M");
  const vehicle = VEHICLE_DATA[plate] || VEHICLE_DATA["SL-49201-M"];

  return (
    <div className="min-h-screen">
      <nav className="nav-glass px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🚗</span>
            <span className="font-['Outfit'] text-lg font-bold gold-text">SAIP</span>
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/directory" className="text-gray-400 hover:text-white">Directory</Link>
            <Link href="/marketplace" className="text-gray-400 hover:text-white">Marketplace</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-3xl">🚗</div>
          <div>
            <h1 className="font-['Outfit'] text-3xl font-bold">{vehicle.make} {vehicle.model}</h1>
            <p className="text-gray-500">{vehicle.year} • {vehicle.plate} • {vehicle.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Estimated Value */}
          <div className="glass-card p-6 text-center">
            <div className="text-gray-500 text-sm mb-1">Estimated Market Value</div>
            <div className="font-['Outfit'] text-4xl font-bold gold-text">${vehicle.estimatedValue.toLocaleString()}</div>
            <div className="text-xs text-gray-600 mt-1">Based on Hargeisa market data</div>
          </div>
          {/* Fraud Score */}
          <div className="glass-card p-6 text-center">
            <div className="text-gray-500 text-sm mb-1">Fraud Risk Score</div>
            <div className={`font-['Outfit'] text-4xl font-bold ${vehicle.fraudScore === "low" ? "text-green-400" : vehicle.fraudScore === "medium" ? "text-yellow-400" : "text-red-400"}`}>
              {vehicle.fraudScore.toUpperCase()}
            </div>
            <div className="text-xs text-gray-600 mt-1">VIN + mileage verified</div>
          </div>
          {/* Mileage */}
          <div className="glass-card p-6 text-center">
            <div className="text-gray-500 text-sm mb-1">Odometer</div>
            <div className="font-['Outfit'] text-4xl font-bold text-white">{vehicle.mileage.toLocaleString()}</div>
            <div className="text-xs text-gray-600 mt-1">kilometers</div>
          </div>
        </div>

        {/* Specifications */}
        <div className="glass-card p-6 mb-8">
          <h2 className="font-['Outfit'] text-lg font-bold mb-4">Vehicle Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              ["Make", vehicle.make], ["Model", vehicle.model], ["Year", vehicle.year],
              ["Color", vehicle.color], ["Engine", vehicle.engine], ["Transmission", vehicle.transmission],
              ["Fuel", vehicle.fuel], ["VIN", vehicle.vin], ["Plate", vehicle.plate], ["Status", vehicle.status],
            ].map(([label, val]) => (
              <div key={label as string} className="p-3 bg-white/5 rounded-lg">
                <div className="text-gray-500 text-xs mb-1">{label}</div>
                <div className="font-medium text-white truncate">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Service History */}
        <div className="glass-card p-6">
          <h2 className="font-['Outfit'] text-lg font-bold mb-4">Service History</h2>
          <div className="space-y-3">
            {SERVICE_HISTORY.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <div className="font-medium">{s.service}</div>
                  <div className="text-sm text-gray-500">{s.shop} • {s.date}</div>
                </div>
                <div className="text-[#D4AF37] font-semibold">${s.cost}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
