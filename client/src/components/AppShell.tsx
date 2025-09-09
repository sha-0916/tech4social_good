import Header from "./Header";

export default function AppShell({
  username,
  children,
  rightArea,
}: {
  username?: string;
  children: React.ReactNode;
  rightArea?: React.ReactNode; // optional top-right slot
}) {
  return (
    <div className="min-h-screen w-full fun-bg flex flex-col">
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
