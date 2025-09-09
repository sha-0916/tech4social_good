import { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

type UserProfile = {
  username: string;
  city: string;
  country?: string;
  ageBand?: "5-10" | "11-15" | "16-20";
};

export default function App() {
  const [screen, setScreen] = useState<"landing" | "dashboard">("landing");
  const [user, setUser] = useState<UserProfile | null>(null);

  const goToDashboard = (profile: UserProfile) => {
    setUser(profile);
    setScreen("dashboard");
  };

  return (
    <ErrorBoundary>
      {screen === "landing" ? (
        <LandingPage
          // called after successful login form submit
          onLoginSuccess={(profile) => goToDashboard(profile)}
          // called after successful signup form submit
          onSignupSuccess={(profile) => goToDashboard(profile)}
        />
      ) : (
        <Dashboard
          user={
            user ?? {
              username: "guest",
              city: "Berlin",
              ageBand: "11-15",
            }
          }
        />
      )}
    </ErrorBoundary>
  );
}
