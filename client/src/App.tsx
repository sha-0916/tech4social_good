import { useState } from "react";

export default function App() {
  const [videoOk, setVideoOk] = useState(true);

  const goNext = () => {
    alert("Get Started → Onboarding (region + age)");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background video or fallback image */}
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

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Foreground content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* App name + tagline */}
        <div className="flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-lg">
            ClimateLens
          </h1>
          <p className="mt-2 text-lg md:text-xl italic text-white/90">
            Your Choices. Your Climate.
          </p>
        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-white/90 text-lg md:text-xl">
          See climate change in <span className="font-semibold">your region</span> and what you can do today.
        </p>

        {/* Auth card (mocked for now) */}
        <div className="mt-8 w-full max-w-sm rounded-2xl bg-white/90 p-5 shadow-2xl backdrop-blur">
          <button
            className="w-full rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 px-4 py-3 font-semibold text-white hover:opacity-90 active:scale-95 transition"
            onClick={goNext}
          >
            Get Started
          </button>
          <div className="mt-3 text-sm text-gray-600">
            Already have an account?{" "}
            <button className="font-semibold text-green-700 hover:underline" onClick={goNext}>
              Log in
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            No real names. You can change age later.
          </p>
        </div>
      </div>
    </div>
  );
}
