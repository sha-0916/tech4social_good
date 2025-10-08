// src/Hub.tsx
import Dashboard from "./pages/Dashboard";
import AppShell from "./components/AppShell";

export default function Hub({
  username,
  onLogout,
}: {
  username: string;
  onLogout: () => void;
}) {
  return (
    <AppShell username={username} onLogout={onLogout}>
      <Dashboard user={{ username, city: "Berlin" }} />
    </AppShell>
  );
}
