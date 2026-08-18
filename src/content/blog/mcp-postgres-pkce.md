---
title: "Wiring Claude to a Postgres warehouse with MCP & PKCE"
description: "How I built an MCP server that lets Claude query our warehouse safely — the OAuth 2.0 / PKCE handshake, the SQL guardrails, and the mistakes I made with open redirects along the way."
dek: "An MCP server can hand a model real database access. Here's how I made that safe — the auth handshake, the SQL guardrails, and what I got wrong first."
pubDate: 2026-07-18
tag: "MCP"
category: "Data"
tone: "violet"
readingTime: 8
featured: true
featuredLine: "Turning natural language into governed SQL."
heroCaption: "octane-mcp · fastapi + oauth2/pkce + nginx"
---

## The problem

Giving a language model direct access to a production warehouse sounds reckless — and it is, unless every layer between the model and the database is doing its job. The goal was simple to state: let a teammate ask a question in plain English and get a correct answer from our PostgreSQL warehouse, **without** ever letting the model run something destructive or read data it shouldn't.

The server sits behind nginx with SSL, authenticates through OAuth 2.0 with PKCE, and only ever exposes a narrow, read-only surface over a curated set of mart tables.

> The model should feel powerful and be tightly boxed in. Those two goals are not in tension if the boundary is drawn in the right place.

## The PKCE handshake

PKCE exists so a public client can prove it started the flow it's finishing. The client generates a random verifier, hashes it into a challenge, and the two are checked against each other at token exchange. In FastAPI it's a few endpoints:

```python
# exchange the auth code for a token, verifying the challenge
async def exchange(code: str, verifier: str):
    challenge = sha256_b64(verifier)
    if challenge != stored_challenge(code):
        raise HTTPException(400, "PKCE mismatch")
    return issue_token(code)
```

The important part is that the verifier never travels over the wire until the final exchange — the initial redirect only carries the hash.

## Guarding the SQL

Auth gets you a trusted caller; it doesn't stop a trusted caller from writing a bad query. Everything the model can reach is:

- Read-only, on a role with no write grants at all
- Scoped to a handful of mart tables, never raw ingestion tables
- Passed through a parser that rejects anything that isn't a single `SELECT`

The mart layer matters more than the parser. Because **mart_transaction_line_items** is the single source of truth, there's only one correct place to answer transaction questions — so "correct" and "safe" end up being the same query shape.

## What I got wrong

My first version had an open-redirect hole in the OAuth callback and, embarrassingly, a path where a crafted request could bypass the PKCE check entirely. A security pass caught both. The lesson wasn't "add more auth" — it was that the **redirect allowlist and the challenge check are load-bearing**, and every branch that skips them is a vulnerability, not a shortcut.

If you're building something similar: write the abuse cases down first, then make the safe path the only path.
