// Shared client-side helpers for the admin panel, matching the backend's
// FRONTEND.md exactly: POST /auth/login for a JWT, then every /admin/*
// request carries it as a Bearer token. Base URL already includes /api.

const TOKEN_KEY = "adminToken";
const EXPIRES_KEY = "adminTokenExpiresAt";

function apiBase(): string {
  return import.meta.env.PUBLIC_API_URL ?? "http://localhost:8080/api";
}

export function getToken(): string | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiresAt = localStorage.getItem(EXPIRES_KEY);
    if (token && expiresAt && Date.parse(expiresAt) < Date.now()) {
      return null; // expired — treat as signed out
    }
    return token;
  } catch {
    return null; // private mode / storage disabled
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
  } catch {
    // ignore
  }
}

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch(`${apiBase()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : "Invalid username or password.",
    );
  }

  const { token, expiresAt } = data as { token: string; expiresAt: string };
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRES_KEY, expiresAt);
  } catch {
    // token just won't persist across reloads
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** POST/PATCH/DELETE against an /admin/* route. Path is relative, e.g. "/admin/posts". */
export async function adminRequest(
  path: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown,
): Promise<unknown> {
  const token = getToken();
  if (!token) throw new Error("Session expired — log in again.");

  const res = await fetch(`${apiBase()}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    clearToken();
    throw new Error("Session expired — log in again.");
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : `Request failed (${res.status})`,
    );
  }

  return data;
}

export function showStatus(el: HTMLElement, kind: "ok" | "error", message: string) {
  el.hidden = false;
  el.textContent = message;
  el.className = `mt-4 text-sm font-medium ${kind === "error" ? "text-accent font-semibold" : "text-ink"}`;
}
