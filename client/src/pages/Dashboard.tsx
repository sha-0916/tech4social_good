import { useMemo, useState } from "react";
import Header from "../components/Header";
import SkyMood from "../components/tiles/SkyMood";

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
  const [videoOk, setVideoOk] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>(MOCK_CITIES[0].city);

  const city = useMemo(
    () => MOCK_CITIES.find((c) => c.city === selectedCity) ?? MOCK_CITIES[0],
    [selectedCity]
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background video / poster (reuse your login assets for now) */}
      {videoOk ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/login_screen.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/login_screen_poster.png"
          onError={() => setVideoOk(false)}
        />
      ) : (
        <img
          src="/login_screen_poster.png"
          alt="Earth background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Foreground */}
      <div className="relative z-10 h-full w-full overflow-y-auto px-4 sm:px-6">
        <div className="mx-auto flex min-h-full max-w-5xl flex-col py-6">
          {/* Brand + simple top bar */}
          <div className="flex items-center justify-between">
            <Header tagline="Your Choices. Your Climate." />
            <div className="flex items-center gap-2">
              <label className="text-sm text-white/90">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="rounded-xl border border-white/30 bg-white/90 px-3 py-2 text-sm shadow"
              >
                {MOCK_CITIES.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city}, {c.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tiles grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SkyMood aqi={city.aqi} />
            {/* We will add the other tiles (2–6) here, one by one */}
          </div>

          <div className="mt-4 text-xs text-white/70">© 2025 ClimateLens</div>
        </div>
      </div>

      {/* Keyframes for subtle animations used by SkyMood */}
      <style>{`
        @keyframes float { 0% { transform: translateY(0px) } 50% { transform: translateY(-4px) } 100% { transform: translateY(0px) } }
        @keyframes puff  { 0% { transform: scale(0.9); opacity: 0.9 } 60% { transform: scale(1.5); opacity: 0.35 } 100% { transform: scale(1.8); opacity: 0 } }
        @keyframes spin  { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
