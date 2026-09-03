# Frontend Integration Guide

Base URL (local dev): `http://localhost:8080/api`
All requests/responses are JSON. Set `Content-Type: application/json` on any request with a body.

Interactive docs (try requests in the browser): `http://localhost:8080/swagger/index.html`

CORS is restricted to the origins listed in the backend's `ALLOWED_ORIGINS` env var (comma-separated). If your frontend runs on a different origin/port, ask for it to be added there.

---

## Errors

Non-2xx responses return:
```json
{ "error": "human-readable message" }
```
`204 No Content` responses (successful `DELETE`, contact `POST`) have no body.

Common status codes: `400` bad input/validation, `401` missing/invalid/expired token, `404` not found, `500` server error.

---

## Authentication

There is a single admin account (bootstrapped server-side — no public signup). Everything under `/admin/*` requires a Bearer JWT.

### `POST /auth/login` — public

Request:
```json
{ "username": "admin", "password": "..." }
```
Response `200`:
```json
{ "token": "eyJhbGciOi...", "expiresAt": "2026-08-26T14:11:32.59208+05:00" }
```
`401` on wrong credentials. Tokens expire after **24 hours** — there is no refresh endpoint; just log in again.

Send the token on every admin request:
```
Authorization: Bearer <token>
```

### `GET /admin/me` — admin
Returns `{ "username": "admin" }`. Useful to check whether a stored token is still valid.

### Example (fetch)
```ts
async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  const { token, expiresAt } = await res.json();
  localStorage.setItem("adminToken", token);
  localStorage.setItem("adminTokenExpiresAt", expiresAt);
  return token;
}

async function adminFetch(path: string, init: RequestInit = {}) {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    // token missing/expired — redirect to login
  }
  return res;
}
```

---

## Partial updates (`PATCH`)

Every `PATCH` endpoint only changes the fields you include in the body — omitted fields are left untouched. Don't send fields you don't want to change; sending `null` for one that's normally nullable *does* clear it.

---

## Projects

| Method | Path | Auth |
|---|---|---|
| GET | `/projects` | public |
| GET | `/projects/{slug}` | public |
| POST | `/admin/projects` | admin |
| PATCH | `/admin/projects/{slug}` | admin |
| DELETE | `/admin/projects/{slug}` | admin |

**ProjectResponse**
```ts
{
  slug: string; title: string; category: string; tone: string;
  problem: string; approach: string; result: string; outcome: string;
  href: string | null;
}
```
`GET /projects` returns `ProjectResponse[]`.

**Create body** — all required except `href`:
```ts
{ slug, title, category, tone, problem, approach, result, outcome, href? }
```

**Update body** — all optional:
```ts
{ title?, category?, tone?, problem?, approach?, result?, outcome?, href? }
```

---

## Blog Posts

| Method | Path | Auth |
|---|---|---|
| GET | `/posts` | public |
| GET | `/posts/{slug}` | public |
| POST | `/admin/posts` | admin |
| PATCH | `/admin/posts/{slug}` | admin |
| DELETE | `/admin/posts/{slug}` | admin |

**BlogPostResponse**
```ts
{
  slug: string; title: string; description: string; dek: string | null;
  pubDate: string; tag: string; category: string; tone: string;
  readingTime: number; featured: boolean;
  featuredLine: string | null; heroCaption: string | null;
  body?: string;                 // omitted on the list endpoint
  headings?: { depth: number; text: string; slug: string }[]; // omitted on the list endpoint
}
```
> `GET /posts` (list) intentionally omits `body` and `headings` — fetch `GET /posts/{slug}` for the full post. `headings` is auto-derived server-side from `<h2>` tags found in `body`; you don't send it.

**Create body** — required: `slug, title, description, pubDate, tag, category, tone`. Optional: `dek, readingTime, featured, featuredLine, heroCaption, body`.

**Update body** — all optional, same field names.

---

## Skills

| Method | Path | Auth |
|---|---|---|
| GET | `/skills` | public |
| POST | `/admin/skills` | admin |
| PATCH | `/admin/skills/{id}` | admin |
| DELETE | `/admin/skills/{id}` | admin |

**SkillResponse**
```ts
{ id: number; title: string; sub: string; items: string[] }
```

**Create body** — required: `title, sub`. Optional: `items: string[]`.
**Update body** — all optional: `title?, sub?, items?: string[]`.

`{id}` in the URL is the numeric `id` from `SkillResponse` (returned from list/create — there's no separate GET-by-id endpoint).

---

## Contact

| Method | Path | Auth |
|---|---|---|
| POST | `/contact` | public |
| GET | `/admin/contact` | admin |
| GET | `/admin/contact/{id}` | admin |
| PATCH | `/admin/contact/{id}` | admin |
| DELETE | `/admin/contact/{id}` | admin |

**ContactMessageResponse**
```ts
{ id: number; name: string; email: string; message: string }
```

**Submit body** (public form) — all required:
```ts
{ name: string; email: string; message: string }
```
Server-side validation: `email` must be a valid address, `message` must be at least 5 characters (trimmed). Invalid input → `400`.

**Update body** (admin) — all optional: `name?, email?, message?`.

---

## Site Config

Single global settings object — no id, always one record.

| Method | Path | Auth |
|---|---|---|
| GET | `/site-config` | public |
| PATCH | `/admin/site-config` | admin |

**SiteConfigResponse**
```ts
{
  profile: {
    name: string; initials: string; role: string; company: string;
    email: string; github: string; githubLabel: string;
    bio: string; authorBio: string;
  };
  navItems: { label: string; href: string }[];
  blogCategories: string[] | null;
}
```

**Update body** — all optional, and each is replaced as a whole unit if present (no deep merge within `profile` or the arrays):
```ts
{
  profile?: { name, initials, role, company, email, github, githubLabel, bio, authorBio };
  navItems?: { label: string; href: string }[];
  blogCategories?: string[];
}
```

---

## Quick reference — all routes

```
POST   /auth/login                    public
GET    /admin/me                      admin

GET    /projects                      public
GET    /projects/{slug}               public
POST   /admin/projects                admin
PATCH  /admin/projects/{slug}         admin
DELETE /admin/projects/{slug}         admin

GET    /posts                         public
GET    /posts/{slug}                  public
POST   /admin/posts                   admin
PATCH  /admin/posts/{slug}            admin
DELETE /admin/posts/{slug}            admin

GET    /skills                        public
POST   /admin/skills                  admin
PATCH  /admin/skills/{id}             admin
DELETE /admin/skills/{id}             admin

POST   /contact                       public
GET    /admin/contact                 admin
GET    /admin/contact/{id}            admin
PATCH  /admin/contact/{id}            admin
DELETE /admin/contact/{id}            admin

GET    /site-config                   public
PATCH  /admin/site-config             admin
```
