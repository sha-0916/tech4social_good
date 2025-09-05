import { useMemo } from "react";

/**
 * TreeBuddy
 * - Visualizes renewable energy share as a growing plant.
 * - Mapping (renewablesPct):
 *   < 20%   → "seedling"
 *   20–39%  → "sprout"
 *   40–59%  → "bush"
 *   60%+    → "bigTree" (with sparkles)
 */
export default function TreeBuddy({ renewablesPct }: { renewablesPct: number }) {
  const stage = useMemo(() => {
    if (renewablesPct >= 60) return "bigTree";
    if (renewablesPct >= 40) return "bush";
    if (renewablesPct >= 20) return "sprout";
    return "seedling";
  }, [renewablesPct]);

  const label = useMemo(() => {
    switch (stage) {
      case "bigTree": return "Thriving";
      case "bush": return "Growing";
      case "sprout": return "Getting started";
      default: return "Needs help";
    }
  }, [stage]);

  return (
    <div className="rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Tree Buddy</h3>
          <p className="text-sm text-gray-500">
            Renewables: <span className="font-medium text-gray-700">{renewablesPct}%</span>
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            stage === "bigTree" ? "bg-green-100 text-green-700"
            : stage === "bush" ? "bg-emerald-100 text-emerald-700"
            : stage === "sprout" ? "bg-lime-100 text-lime-700"
            : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Plant vignette */}
      <div className="relative mt-3 h-44 rounded-xl bg-gradient-to-b from-emerald-100 to-emerald-200 overflow-hidden">
        {/* Soil */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-amber-800/70" />
        {/* Pot (subtle) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 h-8 w-16 rounded-b-xl bg-amber-700/70" />
        {/* Stem + Leaves */}
        <Plant stage={stage} />
        {/* Sparkles when thriving */}
        {stage === "bigTree" && <Sparkles />}
      </div>
    </div>
  );
}

function Plant({ stage }: { stage: "seedling" | "sprout" | "bush" | "bigTree" }) {
  // heights in px (approx)
  const stemHeight = stage === "seedling" ? 28 : stage === "sprout" ? 48 : stage === "bush" ? 70 : 90;
  const leafPairs = stage === "seedling" ? 1 : stage === "sprout" ? 2 : stage === "bush" ? 4 : 6;

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 origin-bottom animate-[sway_3.8s_ease-in-out_infinite]"
      style={{ height: stemHeight }}
    >
      {/* Stem */}
      <div className="w-[6px] h-full mx-auto rounded-full bg-emerald-700" />
      {/* Leaves */}
      {Array.from({ length: leafPairs }).map((_, i) => {
        const y = stemHeight - (i + 1) * (stemHeight / (leafPairs + 1));
        const spread = 16 + i * 4;
        return (
          <div key={i} className="absolute left-1/2" style={{ top: y }}>
            {/* Left leaf */}
            <div
              className="absolute -left-1 rounded-full bg-emerald-500"
              style={{
                width: spread,
                height: 10,
                transform: "translateX(-100%) rotate(-15deg)",
                boxShadow: "0 0 10px rgba(16,185,129,0.25)",
              }}
            />
            {/* Right leaf */}
            <div
              className="absolute left-1 rounded-full bg-emerald-500"
              style={{
                width: spread,
                height: 10,
                transform: "rotate(15deg)",
                boxShadow: "0 0 10px rgba(16,185,129,0.25)",
              }}
            />
          </div>
        );
      })}

      {/* Crown (bigTree) */}
      {stage === "bigTree" && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-20 w-28 rounded-full bg-emerald-600/90 shadow-[0_0_20px_rgba(16,185,129,0.35)]" />
      )}
      {/* Bushiness halo */}
      {stage === "bush" && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-14 w-20 rounded-full bg-emerald-600/80" />
      )}
    </div>
  );
}

function Sparkles() {
  const dots = [
    { left: "20%", top: "25%", delay: "0s" },
    { left: "70%", top: "18%", delay: "0.3s" },
    { left: "55%", top: "35%", delay: "0.6s" },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-[blink_1.6s_ease-in-out_infinite]"
          style={{ left: d.left, top: d.top, animationDelay: d.delay }}
        />
      ))}
    </>
  );
}
