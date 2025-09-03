import { useState } from "react";

export default function App() {
  const [videoOk, setVideoOk] = useState(true);

  const goNext = () => {
    // For now, just a placeholder.
    // Later this will navigate to the Onboarding screen (region + age).
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
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow">
          Your Choices. Your Climate.
        </h1>
        <p className="mt-3 max-w-xl text-white/90">
          See climate change in <span className="font-semibold">your region</span> and what you can do today.
        </p>

        {/* Auth card (mocked for now) */}
        <div className="mt-8 w-full max-w-sm rounded-2xl bg-white/90 p-5 shadow-2xl backdrop-blur">
          <button
            className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 active:scale-95 transition"
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
