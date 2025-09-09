import Header from "./Header";

export default function AppShell({
  username,
  children,
  rightArea,
}: {
  username?: string;
  children: React.ReactNode;
  rightArea?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Background layer (visible, not a pseudo) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          /* gradient base matches body but this is stronger */
          background:
            "radial-gradient(800px 400px at 10% -10%, rgba(34,197,94,0.25), transparent 70%)," +
            "radial-gradient(700px 380px at 100% 0%, rgba(59,130,246,0.22), transparent 70%)," +
            "radial-gradient(700px 380px at 0% 100%, rgba(124,58,237,0.22), transparent 70%)," +
            "linear-gradient(180deg, var(--cl-bg-start) 0%, var(--cl-bg-end) 100%)",
          filter: "blur(6px)",
        }}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Header compact showTagline={false} className="!mb-0" />
          <div className="flex items-center gap-3">
            {rightArea}
            {username && (
              <div className="text-xs sm:text-sm text-slate-600">
                Hi, <span className="font-semibold">{username}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 text-center text-xs text-slate-500">
          © 2025 ClimateLens
        </div>
      </footer>
    </div>
  );
}
