const KEYS = {
  token: "token",
  refresh: "refreshToken",
  schoolInfo: "schoolInfo",
  user: "user",
  school: "school",
} as const;

export const token = {
  // ── Access token ───────────────────────────────────────────────
  getToken(): string | null {
    return localStorage.getItem(KEYS.token);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // ── Login ──────────────────────────────────────────────────────
  login(accessToken: string, refreshToken: string) {
    localStorage.setItem(KEYS.token, accessToken);
    localStorage.setItem(KEYS.refresh, refreshToken);
  },

  // ── Refresh token ──────────────────────────────────────────────
  getRefreshToken(): string | null {
    return localStorage.getItem(KEYS.refresh);
  },

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(KEYS.token, accessToken);
    localStorage.setItem(KEYS.refresh, refreshToken);
  },

  // ── Logout / clear ─────────────────────────────────────────────
  logout() {

  },

  clearAll() {
    this.logout();
  },

  clearTokens() {
    this.logout();
  },
};

export const localData = {
  save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  retrieve<T>(key: string): T | null {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : null;
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};



export async function Hashing(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}