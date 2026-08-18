---
title: "Killing OOM on production Postgres"
description: "When shared memory exhaustion started the OOM killer — and the settings that stopped it."
dek: "When shared memory exhaustion started the OOM killer — and the settings that stopped it."
pubDate: 2026-06-28
tag: "Postgres"
category: "Postgres"
tone: "mint"
readingTime: 5
heroCaption: "postgres · shared_buffers + work_mem"
---

<!-- Outline draft — expand each section before publishing. -->

## The symptom

Queries that had run for months started dying mid-flight, and the logs showed the server being killed rather than failing cleanly — the signature of the kernel's OOM killer picking off a backend.

## Where the memory actually went

Per-connection `work_mem` multiplied by parallel workers and connection count, on top of `shared_buffers`, is the number that matters — not `shared_buffers` alone.

## The settings that fixed it

What I changed, and how I verified it held under load.
