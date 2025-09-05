import { useMemo } from "react";

/**
 * SkyMood
 * - Visualizes air quality as a kid-friendly sky vignette.
 * - AQI mapping:
 *   0–50:     "clear"     → bright blue sky, happy sun, no clouds
 *   51–100:   "hazy"      → slight haze, 1 cloud
 *   101–150:  "smoggy"    → gray haze, 2 clouds
 *   151+:     "verySmoggy"→ heavy haze, 3 clouds + cough puff
 */
export default function SkyMood({ aqi }: { aqi: number }) {
  const state = useMemo(() => {
    if (aqi <= 50) return "clear";
    if (aqi <= 100) return "hazy";
    if (aqi <= 150) return "smoggy";
    return "verySmoggy";
  }, [aqi]);

  const moodText = useMemo(() => {
    switch (state) {
      case "clear": return "Clear skies";
      case "hazy": return "A little hazy";
      case "smoggy": return "Smoggy";
      default: return "Very smoggy";
    }
  }, [state]);

  const bgGradient = useMemo(() => {
    switch (state) {
      case "clear":
        return "bg-gradient-to-b from-sky-400 to-sky-600";
      case "hazy":
        return "bg-gradient-to-b from-sky-300 to-sky-500";
      case "smoggy":
        return "bg-gradient-to-b from-slate-400 to-slate-600";
      default:
        return "bg-gradient-to-b from-gray-500 to-gray-700";
    }
  }, [state]);

  const hazeOverlayOpacity = useMemo(() => {
    switch (state) {
      case "clear": return "opacity-0";
      case "hazy": return "opacity-20";
      case "smoggy": return "opacity-40";
      default: return "opacity-60";
    }
  }, [state]);

  const cloudCount = useMemo(() => {
    switch (state) {
      case "clear": return 0;
      case "hazy": return 1;
      case "smoggy": return 2;
      default: return 3;
    }
  }, [state]);

  return (
    <div className="rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Sky Mood</h3>
          <p className="text-sm text-gray-500">AQI: <span className="font-medium text-gray-700">{aqi}</span></p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            aqi <= 50 ? "bg-green-100 text-green-700"
            : aqi <= 100 ? "bg-yellow-100 text-yellow-700"
            : aqi <= 150 ? "bg-orange-100 text-orange-700"
            : "bg-red-100 text-red-700"
          }`}
        >
          {moodText}
        </span>
      </div>

      {/* Vignette */}
      <div className={`relative mt-3 h-44 rounded-xl overflow-hidden ${bgGradient}`}>
        {/* Sun */}
        <div className="absolute -top-4 -left-4 h-28 w-28">
          <div className="absolute inset-0 rounded-full bg-yellow-300 shadow-[0_0_40px_rgba(250,204,21,0.6)]" />
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 h-14 w-[3px] bg-yellow-200 origin-bottom rounded-full"
                style={{ transform: `rotate(${i * 45}deg) translateY(-28px)` }}
              />
            ))}
          </div>
        </div>

        {/* Clouds */}
        {Array.from({ length: cloudCount }).map((_, i) => (
          <Cloud key={i} index={i} />
        ))}

        {/* Haze overlay */}
        <div className={`absolute inset-0 bg-gray-500 ${hazeOverlayOpacity} transition-opacity duration-500`} />

        {/* Cough puff for very smoggy */}
        {aqi > 150 && <CoughPuff />}
      </div>
    </div>
  );
}

function Cloud({ index }: { index: number }) {
  const positions = [
    { left: "38%", top: "18%" },
    { left: "65%", top: "35%" },
    { left: "20%", top: "45%" },
  ];
  const pos = positions[index % positions.length];

  return (
    <div
      className="absolute animate-[float_5s_ease-in-out_infinite] opacity-90"
      style={{ left: pos.left, top: pos.top, animationDelay: `${index * 0.6}s` }}
    >
      {/* simple cloud using 3 circles */}
      <div className="relative h-10 w-16">
        <div className="absolute left-3 top-3 h-6 w-6 rounded-full bg-white/90" />
        <div className="absolute left-7 top-2 h-8 w-8 rounded-full bg-white/90" />
        <div className="absolute left-11 top-4 h-6 w-6 rounded-full bg-white/90" />
        <div className="absolute left-2 top-7 h-4 w-14 rounded-full bg-white/90" />
      </div>
    </div>
  );
}

function CoughPuff() {
  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-1">
      <span className="text-white/90 text-xs">🌫️</span>
      <div className="h-2 w-2 rounded-full bg-white/80 animate-[puff_1.6s_ease-in-out_infinite]" />
    </div>
  );
}
