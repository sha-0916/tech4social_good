// Mock auth service (replace with real API/Firebase later)
export async function loginUser(email: string, password: string) {
  // simulate latency
  await new Promise((r) => setTimeout(r, 300));
  // basic mock validation
  if (!/\S+@\S+\.\S+/.test(email) || password.length < 6) {
    throw new Error("Invalid credentials");
  }
  return { userId: "mock-user-123", email };
}

export async function signupUser(params: {
  username: string;
  email: string;
  password: string;
  ageBand: "5-10" | "11-15" | "16-20";
  city: string;
  country?: string;
}) {
  await new Promise((r) => setTimeout(r, 400));
  if (params.username.trim().length < 3) throw new Error("Username too short");
  if (!/\S+@\S+\.\S+/.test(params.email)) throw new Error("Invalid email");
  if (params.password.length < 6) throw new Error("Weak password");
  if (!params.city.trim()) throw new Error("City required");
  return { userId: "mock-user-456", ...params };
}
