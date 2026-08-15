const KEYS = {
  token: "token",
  refresh: "refreshToken",
  schoolInfo: "schoolInfo",
  user: "user",
  school: "school",
  expiry: "tokenExpiry",
} as const;

export const token = {
  // ── Access token ───────────────────────────────────────────────
  getToken(): string | null {
    return localStorage.getItem(KEYS.token);
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiry = localStorage.getItem(KEYS.expiry);
    if (!token || !expiry) return false;
    return Date.now() < parseInt(expiry, 10);
  },

  // ── Login ──────────────────────────────────────────────────────
  login(accessToken: string, expiresIn: number) {
    localStorage.setItem(KEYS.token, accessToken);
    const expiry = Date.now() + expiresIn * 1000;
    localStorage.setItem(KEYS.expiry, expiry.toString());
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
    localStorage.removeItem(KEYS.token);
    localStorage.removeItem(KEYS.refresh);
    localStorage.removeItem(KEYS.expiry);
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