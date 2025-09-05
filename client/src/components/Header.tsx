import React, { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

type HeaderProps = {
  tagline?: string;
  /** Smaller, left-aligned header for app screens */
  compact?: boolean;
  /** Show tagline (typed) under the wordmark. Defaults true unless compact is set. */
  showTagline?: boolean;
  /** Additional classes for outer wrapper */
  className?: string;
};

export default function Header({
  tagline = "Your Choices. Your Climate.",
  compact = false,
  showTagline,
  className = "",
}: HeaderProps) {
  // default: show tagline unless compact
  const actuallyShowTagline = showTagline ?? !compact;

  // typing effect
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!actuallyShowTagline) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(tagline.slice(0, i + 1));
      i++;
      if (i >= tagline.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [tagline, actuallyShowTagline]);

  if (compact) {
    // compact, left-aligned brand row
    return (
      <div className={`flex flex-col items-start ${className}`}>
        <div className="flex items-center gap-2">
          <LogoMark size={32} className="drop-shadow-sm" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            ClimateLens
          </h1>
        </div>
        {actuallyShowTagline && (
          <p className="mt-0.5 text-sm italic text-gray-600 min-h-[1.25em]">
            {displayed}
          </p>
        )}
      </div>
    );
  }

  // default (landing) – centered, large
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-3 md:gap-4">
        <LogoMark size={56} className="drop-shadow-lg" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-lg">
          ClimateLens
        </h1>
      </div>
      {actuallyShowTagline && (
        <p className="mt-2 text-lg md:text-xl italic text-white/90 min-h-[1.5em]">
          {displayed}
        </p>
      )}
    </div>
  );
}
