import { useMemo } from "react";

/**
 * Thermometer
 * Visualizes temperature anomaly (°C vs baseline).
 * Bands:
 *  <1.0  → Comfy (emerald)
 *  1.0–1.5 → Warm (amber)
 *  1.5–2.0 → Hot (orange)
 *  >2.0 → Very Hot (rose) + shimmer
 */
export default function Thermometer({ tempAnomaly }: { tempAnomaly: number }) {
  const band = useMemo(() => {
    if (tempAnomaly < 1.0) return "comfy";
    if (tempAnomaly < 1.5) return "warm";
    if (tempAnomaly < 2.0) return "hot";
    return "veryhot";
  }, [tempAnomaly]);

  const label = band === "comfy" ? "Comfy" : band === "warm" ? "Warm" : band === "hot" ? "Hot" : "Very Hot";
  const barColor =
    band === "comfy" ? "bg-emerald-500" : band === "warm" ? "bg-amber-400" : band === "hot" ? "bg-orange-500" : "bg-rose-500";

  // Map anomaly to % height (0→5%, 1→35%, 1.5→55%, 2→75%, 3+→100%)
  const pct = Math.max(0, Math.min(100, 5 + tempAnomaly * 30));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">City Thermometer</h3>
          <p className="text-sm text-gray-500">
            Temp anomaly: <span className="font-medium text-gray-700">{tempAnomaly.toFixed(1)}°C</span>
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            band === "comfy"
              ? "bg-emerald-100 text-emerald-700"
              : band === "warm"
              ? "bg-amber-100 text-amber-700"
              : band === "hot"
              ? "bg-orange-100 text-orange-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Vignette */}
      <div className="relative mt-3 h-44 rounded-xl bg-gradient-to-b from-yellow-50 to-slate-100 overflow-hidden">
        {/* Glass outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 120 160" className="h-40">
            <circle cx="60" cy="130" r="16" fill="none" stroke="rgba(15,23,42,0.25)" strokeWidth="4" />
            <path d="M60 25 L60 114" stroke="rgba(15,23,42,0.25)" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        {/* Mercury */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-40 w-[6px]">
            <div
              className={`${barColor} absolute bottom-[26px] left-1/2 -translate-x-1/2 w-[6px] rounded-t-full`}
              style={{ height: `${pct}%`, transition: "height 600ms ease" }}
            />
            <div className={`absolute bottom-[8px] left-1/2 -translate-x-1/2 h-8 w-8 rounded-full ${barColor} shadow-[0_0_12px_rgba(0,0,0,0.15)]`} />
          </div>
        </div>

        {/* Heat shimmer on hotter bands */}
        {(band === "hot" || band === "veryhot") && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 right-0 top-6 h-3 opacity-40 animate-[shimmer_3s_ease-in-out_infinite]" />
            <div className="absolute left-0 right-0 top-14 h-3 opacity-30 animate-[shimmer_3.2s_ease-in-out_infinite]" />
            <div className="absolute left-0 right-0 top-22 h-3 opacity-25 animate-[shimmer_2.8s_ease-in-out_infinite]" />
          </div>
        )}

        {/* Hint */}
        <div className="absolute bottom-2 left-0 right-0 text-center text-[11px] text-slate-600">
          {band === "comfy"
            ? "Nice today. Keep it cool 😎"
            : band === "warm"
            ? "Getting warmer—small actions help!"
            : band === "hot"
            ? "Hot. Choose shade & hydrate."
            : "Very hot! Stay cool & save energy."}
        </div>
      </div>
    </div>
  );
}
