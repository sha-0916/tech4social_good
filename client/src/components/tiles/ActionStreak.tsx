import { useMemo } from "react";

/**
 * ActionStreak
 * Visualizes the user's daily eco-action streak.
 * Tiers:
 *  0–3    → tiny flame
 *  4–7    → medium flame
 *  8–14   → big flame
 *  15+    → legendary flame + confetti
 */
export default function ActionStreak({ days }: { days: number }) {
  const tier = useMemo(() => {
    if (days >= 15) return "legendary";
    if (days >= 8) return "big";
    if (days >= 4) return "medium";
    return "tiny";
  }, [days]);

  const label =
    tier === "legendary" ? "Legendary streak" :
    tier === "big" ? "On fire!" :
    tier === "medium" ? "Heating up" :
    "Just started";

  // flame size + color grades by tier
  const flameHeight = tier === "legendary" ? 96 : tier === "big" ? 80 : tier === "medium" ? 64 : 44;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Action Streak</h3>
          <p className="text-sm text-gray-500">
            Days in a row: <span className="font-medium text-gray-700">{days}</span>
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            tier === "legendary" ? "bg-rose-100 text-rose-700"
            : tier === "big" ? "bg-orange-100 text-orange-700"
            : tier === "medium" ? "bg-amber-100 text-amber-700"
            : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Flame vignette */}
      <div className="relative mt-3 h-44 rounded-xl overflow-hidden bg-gradient-to-b from-orange-50 to-slate-100">
        {/* Pedestal */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-2 w-24 rounded bg-slate-300/70" />

        {/* Flame (stacked shapes) */}
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2">
          <Flame height={flameHeight} />
        </div>

        {/* Confetti on milestones */}
        {tier === "legendary" && <ConfettiBurst />}

        {/* Hint */}
        <div className="absolute bottom-2 left-0 right-0 text-center text-[11px] text-slate-600">
          {tier === "legendary"
            ? "🔥 Amazing streak! Keep the planet proud."
            : tier === "big"
            ? "Great pace—aim for 15+ days!"
            : tier === "medium"
            ? "Nice! Try daily mini-actions."
            : "Do one small action today to grow the flame."}
        </div>
      </div>
    </div>
  );
}

function Flame({ height }: { height: number }) {
  // outer → inner layers
  const outer = Math.max(40, height);
  const mid = Math.max(28, height - 20);
  const inner = Math.max(18, height - 36);

  return (
    <div className="relative">
      {/* Outer flame */}
      <div
        className="mx-auto w-12 rounded-full bg-gradient-to-b from-orange-400 to-rose-500 shadow-[0_8px_20px_rgba(244,63,94,0.35)] animate-[flicker_1.8s_ease-in-out_infinite]"
        style={{ height: outer, clipPath: "path('M24 0 C10 18, 0 36, 12 52 C24 68, 36 68, 48 52 C60 36, 38 18, 24 0 Z')" }}
      />
      {/* Mid flame */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-9 rounded-full bg-gradient-to-b from-amber-300 to-orange-500 opacity-90 animate-[flicker_1.6s_ease-in-out_infinite]"
        style={{ height: mid, clipPath: "path('M18 0 C8 12, 0 28, 9 38 C18 48, 26 48, 36 38 C44 28, 30 12, 18 0 Z')" }}
      />
      {/* Inner flame */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] w-6 rounded-full bg-gradient-to-b from-yellow-200 to-amber-400 opacity-95 animate-[flicker_1.4s_ease-in-out_infinite]"
        style={{ height: inner, clipPath: "path('M12 0 C6 8, 0 18, 6 26 C12 34, 18 34, 24 26 C30 18, 18 8, 12 0 Z')" }}
      />
      {/* Glow */}
      <div className="absolute -inset-6 rounded-full bg-orange-300/20 blur-2xl" />
    </div>
  );
}

function ConfettiBurst() {
  const pieces = new Array(16).fill(0).map((_, i) => ({
    left: `${8 + (i * 5)}%`,
    delay: `${(i % 8) * 0.15}s`,
    rotate: `${(i % 6) * 15}deg`,
  }));
  const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <>
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute top-4 h-2 w-2 rounded-sm animate-[confetti_2.2s_ease-in-out_infinite]"
          style={{
            left: p.left,
            background: colors[i % colors.length],
            transform: `rotate(${p.rotate})`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
}
