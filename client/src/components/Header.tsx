import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

export default function Header({ tagline = "Your Choices. Your Climate." }: { tagline?: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(tagline.slice(0, i + 1));
      i++;
      if (i >= tagline.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [tagline]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3 md:gap-4">
        <LogoMark size={56} className="drop-shadow-lg" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-lg">
          ClimateLens
        </h1>
      </div>
      <p className="mt-2 text-lg md:text-xl italic text-white/90 min-h-[1.5em]">
        {displayed}
      </p>
    </div>
  );
}
