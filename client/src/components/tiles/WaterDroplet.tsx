import { useMemo } from "react";

/**
 * WaterDroplet
 * Visualizes water stress (Low/Medium/High) as a droplet tank.
 * - Low    → ~90% full, blue
 * - Medium → ~60% full, amber
 * - High   → ~30% full, red
 */
export default function WaterDroplet({
  stress,
}: {
  stress: "Low" | "Medium" | "High";
}) {
  const cfg = useMemo(() => {
    if (stress === "Low")
      return { level: 0.9, label: "Plenty", bar: "bg-sky-400", badge: "bg-blue-100 text-blue-700" };
    if (stress === "Medium")
      return { level: 0.6, label: "Use wisely", bar: "bg-amber-400", badge: "bg-amber-100 text-amber-700" };
    return { level: 0.3, label: "Save water", bar: "bg-rose-400", badge: "bg-rose-100 text-rose-700" };
  }, [stress]);

  const fillHeight = Math.max(0, Math.min(1, cfg.level)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Water Tank</h3>
          <p className="text-sm text-gray-500">
            Stress: <span className="font-medium text-gray-700">{stress}</span>
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${cfg.badge}`}>{cfg.label}</span>
      </div>

      {/* Tank vignette */}
      <div className="relative mt-3 h-44 rounded-xl bg-gradient-to-b from-sky-50 to-slate-100 overflow-hidden">
        {/* Droplet outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 120 160" className="h-40">
            <path
              d="M60 10 C60 10, 25 55, 25 90 C25 120, 40 150, 60 150 C80 150, 95 120, 95 90 C95 55, 60 10, 60 10 Z"
              fill="none"
              stroke="rgba(15,23,42,0.25)"
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* Fill container */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[96px] overflow-hidden rounded-b-[48px] rounded-t-[36px] border border-white/40 shadow-inner"
          style={{ height: "120px" }}
        >
          {/* Fill */}
          <div
            className={`absolute bottom-0 left-0 right-0 ${cfg.bar}`}
            style={{ height: `${fillHeight}%`, transition: "height 600ms ease", filter: "saturate(1.05)" }}
          />

          {/* gentle wave line */}
          <div
            className="absolute left-0 right-0 h-4 bg-white/50 opacity-50 animate-[ripple_3s_ease-in-out_infinite]"
            style={{ bottom: `${fillHeight}%` }}
          />

          {/* bubbles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 left-1/2 h-2 w-2 rounded-full bg-white/80 opacity-70 animate-[rise_4s_ease-in-out_infinite]"
              style={{
                transform: `translateX(${(i - 3) * 12}px)`,
                animationDelay: `${i * 0.35}s`,
              }}
            />
          ))}
        </div>

        {/* Hint text */}
        <div className="absolute bottom-2 left-0 right-0 text-center text-[11px] text-slate-600">
          {stress === "High"
            ? "Turn off taps • Fix leaks • Reuse water"
            : stress === "Medium"
            ? "Shorter showers • Water plants at dusk"
            : "Great! Keep saving water 💧"}
        </div>
      </div>
    </div>
  );
}
