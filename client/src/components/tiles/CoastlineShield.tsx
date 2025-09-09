import { useMemo } from "react";

/**
 * CoastlineShield
 * Visualizes sea-level rise risk.
 * - If not coastal → calm shoreline + "Inland — low risk" badge.
 * - If coastal:
 *    risk "Low" or 0–5%   → gentle waves, far from house
 *    6–15%                 → waves closer, buoy warning
 *    >15%                  → waves near house, stronger motion
 */
export default function CoastlineShield({
  isCoastal,
  risk, // number (%) or "Low"
}: {
  isCoastal: boolean;
  risk: number | "Low";
}) {
  const normalized = useMemo(() => {
    if (!isCoastal) return { pct: 0, band: "inland" as const, label: "Inland — low risk" };
    if (risk === "Low") return { pct: 3, band: "low" as const, label: "Low risk" };
    const pct = Math.max(0, Math.min(40, risk)); // cap to 40% for visuals
    const band = pct <= 5 ? ("low" as const) : pct <= 15 ? ("med" as const) : ("high" as const);
    const label = band === "low" ? "Low risk" : band === "med" ? "Watch zones" : "High risk";
    return { pct, band, label };
  }, [isCoastal, risk]);

  const badgeClasses =
    normalized.band === "inland"
      ? "bg-slate-100 text-slate-700"
      : normalized.band === "low"
      ? "bg-sky-100 text-sky-700"
      : normalized.band === "med"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";

  // Waterline position: 0 (far) → 100 (very close)
  // Map from pct risk to waterline Y
  const waterProximity = !isCoastal
    ? 10
    : normalized.band === "low"
    ? 20
    : normalized.band === "med"
    ? 40
    : 60;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Coastline Shield</h3>
          <p className="text-sm text-gray-500">
            {isCoastal ? (
              <>
                Sea-level risk:{" "}
                <span className="font-medium text-gray-700">
                  {typeof risk === "number" ? `${risk}% population at risk` : risk}
                </span>
              </>
            ) : (
              <span className="font-medium text-gray-700">Not a coastal city</span>
            )}
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${badgeClasses}`}>{normalized.label}</span>
      </div>

      {/* Shoreline vignette */}
      <div className="relative mt-3 h-44 rounded-xl overflow-hidden bg-gradient-to-b from-sky-100 to-slate-100">
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200/60 to-transparent" />

        {/* Sun */}
        <div className="absolute -top-3 left-3 h-10 w-10 rounded-full bg-yellow-300 shadow-[0_0_24px_rgba(250,204,21,0.6)]" />

        {/* Distant hills */}
        <div className="absolute bottom-24 left-0 right-0 h-10 bg-emerald-300/40 rounded-[50%]" />
        <div className="absolute bottom-22 left-0 right-0 h-8 bg-emerald-400/50 rounded-[50%]" />

        {/* Beach (foreground land) */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-amber-200" />

        {/* House on the shore */}
        <div className="absolute bottom-16 left-6">
          <div className="relative w-12 h-10">
            <div className="absolute bottom-0 w-12 h-8 bg-slate-200 rounded-sm border border-slate-300" />
            <div className="absolute -top-3 left-0 w-12 h-4 bg-rose-400 clip-roof" />
            <div className="absolute bottom-1 left-1 w-3 h-3 bg-white rounded-sm border border-slate-300" />
            <div className="absolute bottom-1 right-1 w-5 h-4 bg-white rounded-sm border border-slate-300" />
          </div>
        </div>

        {/* Water (animated) — draw from right side towards shore */}
        <div className="absolute bottom-16 right-0 left-20 h-[calc(100%-64px)]">
          {/* Base sea */}
          <div className="absolute inset-0 bg-sky-400/70" />
          {/* Waves layers */}
          <Wave y={waterProximity} speed={5} opacity={0.6} />
          <Wave y={waterProximity + 6} speed={6.5} opacity={0.45} />
          <Wave y={waterProximity + 12} speed={7.5} opacity={0.35} />

          {/* Warning buoy for med/high */}
          {(normalized.band === "med" || normalized.band === "high") && (
            <div
              className="absolute"
              style={{ left: "50%", bottom: `${waterProximity + 8}px` }}
            >
              <div className="relative w-3 h-6">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-4 bg-amber-400 rounded-[4px]" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3 h-2 bg-white/90 rounded-sm" />
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-amber-500 animate-[blink_1.4s_ease-in-out_infinite]" />
              </div>
            </div>
          )}
        </div>

        {/* High-risk splash near house */}
        {normalized.band === "high" && (
          <div className="absolute left-12 bottom-18 w-8 h-8 rounded-full bg-white/50 opacity-60 animate-[splash_1.8s_ease-in-out_infinite]" />
        )}

        {/* Legend / hint */}
        <div className="absolute bottom-2 left-0 right-0 text-center text-[11px] text-slate-600">
          {isCoastal
            ? normalized.band === "low"
              ? "Healthy dunes and mangroves help protect coasts."
              : normalized.band === "med"
              ? "Plan coastal protection & early warnings."
              : "Protect homes & restore natural barriers."
            : "Inland city — focus on heat, water & air quality."}
        </div>
      </div>

      {/* Small CSS helpers for the roof */}
      <style>{`
        .clip-roof { 
          clip-path: polygon(0 100%, 50% 0, 100% 100%);
        }
      `}</style>
    </div>
  );
}

function Wave({ y, speed, opacity }: { y: number; speed: number; opacity: number }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className="absolute left-0 right-0"
      style={{
        bottom: `${y}px`,
        opacity,
        animation: `wave ${speed}s linear infinite`,
      }}
    >
      <path
        d="M0 20 Q25 10, 50 20 T100 20 T150 20 T200 20 V40 H0 Z"
        fill="rgba(59,130,246,0.9)"
      />
      <style>{`
        @keyframes wave {
          0% { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
      `}</style>
    </svg>
  );
}
