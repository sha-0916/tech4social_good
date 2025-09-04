export default function LoginForm({
  onSubmit,
  error,
  email,
  setEmail,
  password,
  setPassword,
}: {
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  email: string;
  setEmail: (s: string) => void;
  password: string;
  setPassword: (s: string) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="text-sm font-semibold text-gray-800">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="•••••••"
          required
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 px-4 py-3 font-semibold text-white hover:opacity-90 active:scale-95 transition"
      >
        Log in
      </button>
    </form>
  );
}
