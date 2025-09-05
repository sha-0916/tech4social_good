import Header from "../components/Header";
import SkyMood from "../components/tiles/SkyMood";
import TreeBuddy from "../components/tiles/TreeBuddy";

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

type UserProfile = {
  username: string;
  city: string;
  country?: string;
  ageBand?: "5-10" | "11-15" | "16-20";
};

const MOCK_CITIES: CityData[] = [
  { city: "Berlin", country: "Germany", aqi: 60, tempAnomaly: 1.2, renewablesPct: 45, co2PerCapita: 9.1, waterStress: "Medium", seaLevelRiskPct: "Low", isCoastal: false, streakDays: 5 },
  { city: "Paris", country: "France", aqi: 70, tempAnomaly: 1.3, renewablesPct: 30, co2PerCapita: 7.8, waterStress: "Medium", seaLevelRiskPct: "Low", isCoastal: false, streakDays: 3 },
  { city: "New York", country: "United States", aqi: 90, tempAnomaly: 1.5, renewablesPct: 25, co2PerCapita: 15.2, waterStress: "High", seaLevelRiskPct: 12, isCoastal: true, streakDays: 8 },
  { city: "Delhi", country: "India", aqi: 180, tempAnomaly: 1.6, renewablesPct: 20, co2PerCapita: 2.3, waterStress: "High", seaLevelRiskPct: "Low", isCoastal: false, streakDays: 2 },
  { city: "Nairobi", country: "Kenya", aqi: 55, tempAnomaly: 1.1, renewablesPct: 70, co2PerCapita: 0.8, waterStress: "Medium", seaLevelRiskPct: "Low", isCoastal: false, streakDays: 9 },
  { city: "San Francisco", country: "United States", aqi: 65, tempAnomaly: 1.4, renewablesPct: 35, co2PerCapita: 7.1, waterStress: "Medium", seaLevelRiskPct: 10, isCoastal: true, streakDays: 6 },
];

export default function Dashboard({ user }: { user: UserProfile }) {
  const city = (MOCK_CITIES.find(
    (c) => c.city.toLowerCase() === user.city.toLowerCase()
  ) ?? MOCK_CITIES[0]);

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Header compact showTagline={false} className="!mb-0" />
          <div className="text-xs sm:text-sm text-slate-600">
            Hi, <span className="font-semibold">{user.username}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          <div className="mb-4 text-slate-700">
            <span className="font-semibold">{city.city}</span> snapshot
            {city.country ? <span className="text-slate-500"> — {city.country}</span> : null}
          </div>

          {/* Tiles grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1) Sky Mood (AQI) */}
            <SkyMood aqi={city.aqi} />
            {/* 2) Tree Buddy (Renewables %) */}
            <TreeBuddy renewablesPct={city.renewablesPct} />
            {/* 3–6 to be added next */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 text-center text-xs text-slate-500">
          © 2025 ClimateLens
        </div>
      </footer>

      {/* Keyframes used by tiles */}
      <style>{`
        @keyframes float { 0% { transform: translateY(0px) } 50% { transform: translateY(-4px) } 100% { transform: translateY(0px) } }
        @keyframes puff  { 0% { transform: scale(0.9); opacity: 0.9 } 60% { transform: scale(1.5); opacity: 0.35 } 100% { transform: scale(1.8); opacity: 0 } }
        @keyframes spin  { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes sway  { 0% { transform: rotate(0deg) } 50% { transform: rotate(2.3deg) } 100% { transform: rotate(0deg) } }
        @keyframes blink { 0%,100% { opacity: 0.3 } 50% { opacity: 1 } }
      `}</style>
    </div>
  );
}
