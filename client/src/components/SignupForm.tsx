// Self-contained SignupForm to avoid type import cycles.
// Uses internal union types for AgeBand and a local City shape.
type AgeBand = "5-10" | "11-15" | "16-20";
type City = { name: string; country: string };

export default function SignupForm({
  onSubmit,
  error,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  ageBand,
  setAgeBand,
  city,
  setCity,
  country,
  setCountry,
  suggestions,
}: {
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  username: string;
  setUsername: (s: string) => void;
  email: string;
  setEmail: (s: string) => void;
  password: string;
  setPassword: (s: string) => void;
  ageBand: AgeBand;
  setAgeBand: (a: AgeBand) => void;
  city: string;
  setCity: (s: string) => void;
  country: string;
  setCountry: (s: string) => void;
  suggestions: City[] | undefined;
}) {
  const bands: AgeBand[] = ["5-10", "11-15", "16-20"];
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  return (
    <form onSubmit={onSubmit} className="space-y-3 animate-[fadeIn_.25s_ease]">
      <label className="block">
        <span className="text-sm font-semibold text-gray-800">Username</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="cool_earth_hero"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-gray-800">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="you@example.com"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-gray-800">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="min 6 characters"
          required
        />
      </label>

      <div>
        <span className="text-sm font-semibold text-gray-800">Age group</span>
        <div className="mt-2 flex items-center justify-start gap-2">
          {bands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setAgeBand(b)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                ageBand === b
                  ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              aria-pressed={ageBand === b}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-gray-800">City</span>
        <input
          list="city-list-signup"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Start typing…"
          required
        />
        <datalist id="city-list-signup">
          {safeSuggestions.map((c) => (
            <option key={`${c.name}-${c.country}`} value={c.name}>
              {c.name}, {c.country}
            </option>
          ))}
        </datalist>
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-gray-800">Country</span>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Auto-filled when a known city is selected"
          readOnly={!!country}
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 px-4 py-3 font-semibold text-white hover:opacity-90 active:scale-95 transition"
      >
        Create account
      </button>
    </form>
  );
}