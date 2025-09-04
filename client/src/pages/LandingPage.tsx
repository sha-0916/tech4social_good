import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

// Local types to avoid any cross-file type dependency issues
type AgeBand = "5-10" | "11-15" | "16-20";
type City = { name: string; country: string };
type AuthMode = "login" | "signup";

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

export default function LandingPage() {
  const [videoOk, setVideoOk] = useState(true);
  const [mode, setMode] = useState<AuthMode>("login");

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
    alert("Login successful (mock). Next: show dashboard for your region.");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    if (username.trim().length < 3) return setSignupError("Username must be at least 3 characters.");
    if (!isEmail(signupEmail)) return setSignupError("Please enter a valid email address.");
    if (!strongEnough(signupPassword)) return setSignupError("Password must be at least 6 characters.");
    if (!city.trim()) return setSignupError("Please enter your city.");
    alert(`Signup successful (mock):
- Username: ${username}
- Email: ${signupEmail}
- Age group: ${ageBand}
- City: ${city}
- Country: ${country || "(detect later)"}`);
    setMode("login");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background video / poster */}
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

      {/* Foreground */}
      <div className="relative z-10 h-full w-full overflow-y-auto px-4 sm:px-6">
        <div className="mx-auto flex min-h-full max-w-2xl items-center">
          <div className="w-full flex flex-col items-center gap-4 md:gap-6 py-8">
            {/* Branding */}
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

            {/* Auth card */}
            <div className="w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur text-left">
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
              <p className="mt-3 text-xs text-gray-500">
                We don’t need real names. Your data stays on this device for the demo.
              </p>
            </div>

            <div className="text-[11px] text-white/70 pt-2">© 2025 ClimateLens</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
