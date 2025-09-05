import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./pages/Dashboard";

export default function App() {
  // Temporary mock until login wires this up
  const mockUser = {
    username: "cool_earth_hero",
    city: "Berlin",
    ageBand: "11-15" as const,
  };

  return (
    <ErrorBoundary>
      <Dashboard user={mockUser} />
    </ErrorBoundary>
  );
}
