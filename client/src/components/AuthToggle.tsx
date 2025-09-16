export type AuthMode = "login" | "signup";

export default function AuthToggle({
  mode,
  onChange,
}: {
  mode: AuthMode;
  onChange: (m: AuthMode) => void;
}) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
      <button
        type="button"
        onClick={() => onChange("login")}
        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
          mode === "login" ? "bg-white shadow" : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Log in
      </button>
      <button
        type="button"
        onClick={() => onChange("signup")}
        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
          mode === "signup" ? "bg-white shadow" : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Sign up
      </button>
    </div>
  );
}