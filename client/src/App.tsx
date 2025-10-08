// src/App.tsx
import { useEffect, useState } from "react";
import Hub from "./Hub";
import AuthToggle from "./components/AuthToggle";
import type { AuthMode } from "./components/AuthToggle";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { saveUser, validateLogin, emailExists } from "./utils/auth";

export default function App() {
  const [videoOk, setVideoOk] = useState(true);
  const [goApp, setGoApp] = useState(false);

  // UI control
  const [showAuth, setShowAuth] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [ageBand, setAgeBand] = useState<"5-10" | "11-15" | "16-20">("11-15");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Typing effect
  const tagline = "Your Choices. Your Climate.";
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(tagline.slice(0, i + 1));
      i++;
      if (i === tagline.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // --- LOGIN HANDLER ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    const user = validateLogin(email, password);
    if (user) {
      console.log("Login success:", user);
      setUsername(user.username);
      setCity(user.city);
      setCountry(user.country || "");
      setAgeBand(user.ageBand || "11-15");
      setGoApp(true);
    } else {
      setError("Invalid email or password");
    }
  };

  // --- SIGNUP HANDLER ---
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !city) {
      setError("All fields required");
      return;
    }

    if (emailExists(email)) {
      setError("This email is already registered");
      return;
    }

    const newUser = { username, email, password, city, country, ageBand };
    saveUser(newUser);
    console.log("Signup success:", newUser);
    setGoApp(true);
  };

  // If logged in → Dashboard
  if (goApp) {
  const handleLogout = () => {
    // Clear current session and return to landing screen
    setGoApp(false);
    setShowAuth(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setError(null);
  };

  return <Hub username={username || "guest"} onLogout={handleLogout} />;
}

  return (
    <div className="relative min-h-screen w-full overflow-auto">
      {/* Background video */}
      {videoOk ? (
        <video
          className="fixed inset-0 h-full w-full object-cover -z-10"
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
          className="fixed inset-0 h-full w-full object-cover -z-10"
        />
      )}
      <div className="fixed inset-0 bg-black/50 -z-10" aria-hidden="true" />

      {/* Foreground */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center py-12">
        {/* Logo + tagline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-lg">
          ClimateLens
        </h1>
        <p className="mt-2 text-lg md:text-xl italic text-white/90 min-h-[1.5em]">
          {displayedText}
        </p>

        <p className="mt-6 max-w-xl text-white/90 text-lg md:text-xl">
          See climate change in{" "}
          <span className="font-semibold">your region</span> and what you can do today.
        </p>

        {/* Auth card */}
        <div className="mt-8 w-full max-w-sm rounded-2xl bg-white/90 p-5 shadow-2xl backdrop-blur">
          {!showAuth ? (
            <>
              <button
                className="w-full rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 px-4 py-3 font-semibold text-white hover:opacity-90 active:scale-95 transition"
                onClick={() => {
                  setMode("signup");
                  setShowAuth(true);
                }}
              >
                Get Started
              </button>
              <div className="mt-3 text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  className="font-semibold text-green-700 hover:underline"
                  onClick={() => {
                    setMode("login");
                    setShowAuth(true);
                  }}
                >
                  Log in
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                No real names. You can change age later.
              </p>
            </>
          ) : (
            <>
              <AuthToggle mode={mode} onChange={setMode} />
              {mode === "login" ? (
                <LoginForm
                  onSubmit={handleLogin}
                  error={error}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                />
              ) : (
                <SignupForm
                  onSubmit={handleSignup}
                  error={error}
                  username={username}
                  setUsername={setUsername}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  ageBand={ageBand}
                  setAgeBand={setAgeBand}
                  city={city}
                  setCity={setCity}
                  country={country}
                  setCountry={setCountry}
                  suggestions={[
                    { name: "Berlin", country: "Germany" },
                    { name: "Paris", country: "France" },
                    { name: "New York", country: "United States" },
                    { name: "Delhi", country: "India" },
                    { name: "Nairobi", country: "Kenya" },
                  ]}
                />
              )}
              <button
                className="mt-4 text-sm text-gray-600 underline hover:text-gray-900 transition"
                onClick={() => setShowAuth(false)}
              >
                ← Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
