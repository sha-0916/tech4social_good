import { useMemo, useState } from "react";
import Header from "../components/Header";
import SkyMood from "../components/tiles/SkyMood";

// Solid, app-like dashboard (no video background).
// Smaller logo at top-left, city selector at top-right, sticky footer.

type CityData = {
  city: string;
  country: string;
  aqi: number;
  tempAnomaly: number;
  renewablesPct: number;
  co2PerCapita: number;
  waterStress: "Low" | "Medium" | "High";
  seaLevelRiskPct: number | "Low";
  isCoastal: boolean;
  streakDays: number;
};

const MOCK_CITIES: CityData[] = [
  {
    city: "Berlin",
    country: "Germany",
    aqi: 60,
    tempAnomaly: 1.2,
    renewablesPct: 45,
    co2PerCapita: 9.1,
    waterStress: "Medium",
    seaLevelRiskPct: "Low",
    isCoastal: false,
    streakDays: 5,
  },
  {
    city: "Paris",
    country: "France",
    aqi: 70,
    tempAnomaly: 1.3,
    renewablesPct: 30,
    co2PerCapita: 7.8,
    waterStress: "Medium",
    seaLevelRiskPct: "Low",
    isCoastal: false,
    streakDays: 3,
  },
  {
    city: "New York",
    country: "United States",
    aqi: 90,
    tempAnomaly: 1.5,
    renewablesPct: 25,
    co2PerCapita: 15.2,
    waterStress: "High",
    seaLevelRiskPct: 12,
    isCoastal: true,
    streakDays: 8,
  },
  {
    city: "Delhi",
    country: "India",
    aqi: 180,
    tempAnomaly: 1.6,
    renewablesPct: 20,
    co2PerCapita: 2.3,
    waterStress: "High",
    seaLevelRiskPct: "Low",
    isCoastal: false,
    streakDays: 2,
  },
  {
    city: "Nairobi",
    country: "Kenya",
    aqi: 55,
    tempAnomaly: 1.1,
    renewablesPct: 70,
    co2PerCapita: 0.8,
    waterStress: "Medium",
    seaLevelRiskPct: "Low",
    isCoastal: false,
    streakDays: 9,
  },
  {
    city: "San Francisco",
    country: "United States",
    aqi: 65,
    tempAnomaly: 1.4,
    renewablesPct: 35,
    co2PerCapita: 7.1,
    waterStress: "Medium",
    seaLevelRiskPct: 10,
    isCoastal: true,
    streakDays: 6,
  },
];

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState<string>(MOCK_CITIES[0].city);

  const city = useMemo(
    () => MOCK_CITIES.find((c) => c.city === selectedCity) ?? MOCK_CITIES[0],
    [selectedCity]
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* compact brand left */}
          <Header compact showTagline={false} className="!mb-0" />
          {/* city selector right */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-700">City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {MOCK_CITIES.map((c) => (
                <option key={c.city} value={c.city}>
                  {c.city}, {c.country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          {/* Greeting / context line (optional) */}
          <div className="mb-4 text-slate-700">
            <span className="font-semibold">{city.city}</span> snapshot
          </div>

          {/* Tiles grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SkyMood aqi={city.aqi} />
            {/* TODO: add Tree Buddy, Water Droplet, Thermometer, Coastline Shield, Action Streak */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 text-center text-xs text-slate-500">
          © 2025 ClimateLens
        </div>
      </footer>
    </div>
  );
}
