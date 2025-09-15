import Header from "./Header";

export type NavItem = { key: string; label: string };

export default function AppShell({
  username,
  children,
  navItems,
  activeTab,
  onTabChange,
}: {
  username?: string;
  children: React.ReactNode;
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Background layer (subtle gradient) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
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
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Header compact showTagline={false} className="!mb-0" />
          <div className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = item.key === activeTab;
              return (
                <button
                  key={item.key}
                  onClick={() => onTabChange(item.key)}
                  className={`text-sm font-medium border-b-2 pb-1 transition ${
                    isActive
                      ? "text-blue-600 border-blue-600"
                      : "text-slate-600 border-transparent hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          {username && (
            <div className="text-xs sm:text-sm text-slate-600">
              Hi, <span className="font-semibold">{username}</span>
            </div>
          )}
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden border-t border-slate-200 flex justify-around bg-white/80 backdrop-blur">
          {navItems.map((item) => {
            const isActive = item.key === activeTab;
            return (
              <button
                key={item.key}
                onClick={() => onTabChange(item.key)}
                className={`flex-1 py-2 text-center text-xs font-medium ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-slate-600"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-3 text-center text-xs text-slate-500">
          © 2025 ClimateLens
        </div>
      </footer>
    </div>
  );
}
