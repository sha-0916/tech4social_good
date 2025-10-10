// src/components/AppShell.tsx
import { useState } from "react";
import { Leaf, Circle } from "lucide-react"; // uses lucide-react icons

interface AppShellProps {
  username: string;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function AppShell({ username, onLogout, children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      {/* --- Top Navbar --- */}
      <header className="flex justify-between items-center px-6 py-3 shadow-sm bg-white/70 backdrop-blur sticky top-0 z-20">
        {/* --- Logo + App Name --- */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            {/* Lens circle */}
            <Circle size={26} className="text-green-500" strokeWidth={2.5} />
            {/* Leaf accent */}
            <Leaf
              size={16}
              className="absolute -right-2 top-1 text-emerald-500 rotate-[15deg]"
              strokeWidth={2.5}
            />
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-sm">
            ClimateLens
          </h1>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            className="font-semibold text-slate-700 hover:text-slate-900 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {username}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-lg z-30">
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* --- Main content area --- */}
      <main className="flex-1 p-4 sm:p-6">{children}</main>

      {/* --- Footer --- */}
      <footer className="text-center text-xs text-slate-500 py-4 border-t border-slate-200">
        © {new Date().getFullYear()} ClimateLens. All rights reserved.
      </footer>
    </div>
  );
}
