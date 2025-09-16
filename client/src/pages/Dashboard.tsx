import SkyMood from "../components/tiles/SkyMood";
import TreeBuddy from "../components/tiles/TreeBuddy";
import WaterDroplet from "../components/tiles/WaterDroplet";
import Thermometer from "../components/tiles/Thermometer";
import CoastlineShield from "../components/tiles/CoastlineShield";
import ActionStreak from "../components/tiles/ActionStreak";

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

export default function Dashboard({ user }: { user?: UserProfile }) {
  const safeUser: UserProfile = user ?? { username: "guest", city: "Berlin", ageBand: "11-15" };
  const city =
    MOCK_CITIES.find((c) => c.city.toLowerCase() === safeUser.city.toLowerCase()) ??
    MOCK_CITIES[0];

  return (
    <div>
      {/* Page header */}
      <div className="mb-3 md:mb-4 text-slate-700">
        <span className="font-semibold">{city.city}</span> snapshot
        {city.country ? <span className="text-slate-500"> — {city.country}</span> : null}
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="cl-card cl-card-pad hover-lift"><SkyMood aqi={city.aqi} /></div>
        <div className="cl-card cl-card-pad hover-lift"><TreeBuddy renewablesPct={city.renewablesPct} /></div>
        <div className="cl-card cl-card-pad hover-lift"><WaterDroplet stress={city.waterStress} /></div>
        <div className="cl-card cl-card-pad hover-lift"><Thermometer tempAnomaly={city.tempAnomaly} /></div>
        <div className="cl-card cl-card-pad hover-lift">
          <CoastlineShield isCoastal={city.isCoastal} risk={city.seaLevelRiskPct} />
        </div>
        <div className="cl-card cl-card-pad hover-lift"><ActionStreak days={city.streakDays} /></div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float     { 0% { transform: translateY(0px) } 50% { transform: translateY(-4px) } 100% { transform: translateY(0px) } }
        @keyframes puff      { 0% { transform: scale(0.9); opacity: 0.9 } 60% { transform: scale(1.5); opacity: 0.35 } 100% { transform: scale(1.8); opacity: 0 } }
        @keyframes spin      { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes sway      { 0% { transform: rotate(0deg) } 50% { transform: rotate(2.3deg) } 100% { transform: rotate(0deg) } }
        @keyframes blink     { 0%,100% { opacity: 0.3 } 50% { opacity: 1 } }
        @keyframes ripple    { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @keyframes rise      { 0% { transform: translate(-50%, 0); opacity: .0 } 40% { opacity: .8 } 100% { transform: translate(-50%, -120px); opacity: 0 } }
        @keyframes shimmer   { 0%,100% { backdrop-filter: blur(0px) brightness(1) } 50% { backdrop-filter: blur(1.2px) brightness(1.05) } }
        @keyframes wave      { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes splash    { 0% { transform: scale(0.9); opacity: 0.7 } 50% { transform: scale(1.15); opacity: 0.4 } 100% { transform: scale(1.25); opacity: 0 } }
        @keyframes flicker   { 0%,100% { filter: brightness(1) } 50% { filter: brightness(1.12) } }
        @keyframes confetti  { 0% { transform: translateY(0) rotate(0deg); opacity: 1 } 100% { transform: translateY(120px) rotate(260deg); opacity: 0 } }
      `}</style>
    </div>
  );
}
