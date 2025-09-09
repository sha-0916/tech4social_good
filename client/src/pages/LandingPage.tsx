import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

// Local types (keep self-contained)
type AgeBand = "5-10" | "11-15" | "16-20";
type City = { name: string; country: string };
type AuthMode = "login" | "signup";
type Stage = "intro" | "auth";

const DEMO_CITIES: City[] = [
  { name: "Berlin", country: "Germany" },
  { name: "Munich", country: "Germany" },
  { name: "Hamburg", country: "Germany" },
  { name: "Paris", country: "France" },
  { name: "Lyon", country: "France" },
  { name: "Madrid", country: "Spain" },
  { name: "Barcelona", country: "Spain" },
  { name: "Rome", country: "Italy" },
  { name: "Milan", country: "Italy" },
  { name: "London", country: "United Kingdom" },
  { name: "Dublin", country: "Ireland" },
  { name: "Warsaw", country: "Poland" },
  { name: "New York", country: "United States" },
  { name: "San Francisco", country: "United States" },
  { name: "Nairobi", country: "Kenya" },
  { name: "Lagos", country: "Nigeria" },
  { name: "Delhi", country: "India" },
  { name: "Bengaluru", country: "India" },
  { name: "Tokyo", country: "Japan" },
  { name: "Seoul", country: "South Korea" },
];

export default function LandingPage({
  onLoginSuccess,
  onSignupSuccess,
}: {
  onLoginSuccess?: (profile: { username: string; city: string; ageBand?: AgeBand }) => void;
  onSignupSuccess?: (profile: { username: string; city: string; ageBand?: AgeBand }) => void;
}) {
  // background video fallback
  const [videoOk, setVideoOk] = useState(true);

  // stage + auth mode
  const [stage, setStage] = useState<Stage>("intro");
  const [mode, setMode] = useState<AuthMode>("signup");

  // login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // signup state
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [ageBand, setAgeBand] = useState<AgeBand>("11-15");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);

  // suggestions + auto-fill country
  const citySuggestions = useMemo(() => {
    if (!city.trim()) return DEMO_CITIES.slice(0, 8);
    const q = city.toLowerCase();
    return DEMO_CITIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 8);
  }, [city]);

  useEffect(() => {
    const match = DEMO_CITIES.find((c) => c.name.toLowerCase() === city.trim().toLowerCase());
    setCountry(match ? match.country : "");
  }, [city]);

  // validators
  const isEmail = (e: string) => /\S+@\S+\.\S+/.test(e);
  const strongEnough = (p: string) => p.length >= 6;

  // handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!isEmail(loginEmail)) return setLoginError("Please enter a valid email address.");
    if (!strongEnough(loginPassword)) return setLoginError("Password must be at least 6 characters.");

    // ✅ Navigate to dashboard (mock profile)
    onLoginSuccess?.({
      username: loginEmail.split("@")[0] || "user",
      city: city || "Berlin",
      ageBand: "11-15",
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    if (username.trim().length < 3) return setSignupError("Username must be at least 3 characters.");
    if (!isEmail(signupEmail)) return setSignupError("Please enter a valid email address.");
    if (!strongEnough(signupPassword)) return setSignupError("Password must be at least 6 characters.");
    if (!city.trim()) return setSignupError("Please enter your city.");

    // ✅ Navigate to dashboard with collected profile
    onSignupSuccess?.({
      username,
      city,
      ageBand,
    });
  };

  // intro → auth
  const startSignup = () => {
    setMode("signup");
    setStage("auth");
  };
  const startLogin = () => {
    setMode("login");
    setStage("auth");
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Foreground content */}
      {stage === "intro" ? (
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* App name + animated tagline */}
          <Header tagline="Your Choices. Your Climate." />

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-white/90 text-lg md:text-xl">
            See climate change in <span className="font-semibold">your region</span> and what you can do today.
          </p>

          {/* Auth card (intro version) */}
          <div className="mt-8 w-full max-w-sm rounded-2xl bg-white/90 p-5 shadow-2xl backdrop-blur">
            <button
              className="w-full rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 px-4 py-3 font-semibold text-white hover:opacity-90 active:scale-95 transition"
              onClick={startSignup}
            >
              Get Started
            </button>
            <div className="mt-3 text-sm text-gray-600">
              Already have an account?{" "}
              <button className="font-semibold text-green-700 hover:underline" onClick={startLogin}>
                Log in
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">No real names. You can change age later.</p>
          </div>
        </div>
      ) : (
        // Auth stage: allow scrolling for tall signup form but keep tight cluster
        <div className="relative z-10 h-full w-full overflow-y-auto px-4 sm:px-6 text-center">
          <div className="mx-auto flex min-h-full max-w-2xl items-center">
            <div className="w-full flex flex-col items-center gap-4 md:gap-6 py-8">
              {/* Keep the same header at top */}
              <Header tagline="Your Choices. Your Climate." />

              {/* Toggle */}
              <div className="w-full max-w-md">
                <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      mode === "login" ? "bg-white shadow" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      mode === "signup" ? "bg-white shadow" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Sign up
                  </button>
                </div>
              </div>

              {/* Card with selected form */}
              <div className="w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur text-left animate-[fadeIn_.25s_ease]">
                {mode === "login" ? (
                  <LoginForm
                    onSubmit={handleLogin}
                    error={loginError}
                    email={loginEmail}
                    setEmail={setLoginEmail}
                    password={loginPassword}
                    setPassword={setLoginPassword}
                  />
                ) : (
                  <SignupForm
                    onSubmit={handleSignup}
                    error={signupError}
                    username={username}
                    setUsername={setUsername}
                    email={signupEmail}
                    setEmail={setSignupEmail}
                    password={signupPassword}
                    setPassword={setSignupPassword}
                    ageBand={ageBand}
                    setAgeBand={setAgeBand}
                    city={city}
                    setCity={setCity}
                    country={country}
                    setCountry={setCountry}
                    suggestions={citySuggestions}
                  />
                )}

                {/* Back to intro */}
                <div className="mt-3 text-sm text-gray-600 text-center">
                  <button type="button" onClick={() => setStage("intro")} className="hover:underline" title="Back">
                    ← Back
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-white/70 pt-2">© 2025 ClimateLens</div>
            </div>
          </div>
        </div>
      )}

      {/* Keyframes used in small fades */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
