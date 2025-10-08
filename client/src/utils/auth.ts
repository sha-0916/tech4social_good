export interface UserRecord {
  username: string;
  email: string;
  password: string;
  city: string;
  country?: string;
  ageBand?: "5-10" | "11-15" | "16-20";
}

// Save a new user
export function saveUser(user: UserRecord) {
  const existing = JSON.parse(localStorage.getItem("cl_users") || "[]");
  existing.push(user);
  localStorage.setItem("cl_users", JSON.stringify(existing));
}

// Validate login credentials
export function validateLogin(email: string, password: string): UserRecord | null {
  const users: UserRecord[] = JSON.parse(localStorage.getItem("cl_users") || "[]");
  return users.find((u) => u.email === email && u.password === password) || null;
}

// Check if email already exists
export function emailExists(email: string): boolean {
  const users: UserRecord[] = JSON.parse(localStorage.getItem("cl_users") || "[]");
  return users.some((u) => u.email === email);
}
