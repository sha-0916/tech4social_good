import { useState } from "react";
import AppShell from "./components/AppShell";
import Dashboard from "./pages/Dashboard";
import Simulator from "./pages/Simulator";
import Challenges from "./pages/Challenges";
import Profile from "./pages/Profile";

export type TabKey = "dashboard" | "simulator" | "challenges" | "profile";

export default function Hub({ username = "guest" }: { username?: string }) {
  const [active, setActive] = useState<TabKey>("dashboard");

  const navItems: { key: TabKey; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "simulator", label: "Simulator" },
    { key: "challenges", label: "Challenges" },
    { key: "profile", label: "Profile" },
  ];

  // Render current page content (NOTE: pages do NOT import AppShell)
  let content: React.ReactNode = null;
  switch (active) {
    case "dashboard":
      content = <Dashboard />;
      break;
    case "simulator":
      content = <Simulator />;
      break;
    case "challenges":
      content = <Challenges />;
      break;
    case "profile":
      content = <Profile />;
      break;
  }

  return (
    <AppShell
      username={username}
      navItems={navItems}
      activeTab={active}
      onTabChange={setActive}
    >
      {content}
    </AppShell>
  );
}
