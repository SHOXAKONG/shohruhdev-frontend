---
title: "dbt Fusion migration: 35 deprecations later"
description: "What broke moving to the Fusion engine, and how I fixed a SIGSEGV in the SQL analyzer."
dek: "What broke moving to the Fusion engine, and how I fixed a SIGSEGV in the SQL analyzer."
pubDate: 2026-06-02
tag: "dbt"
category: "Data"
tone: "violet"
readingTime: 6
heroCaption: "dbt fusion · staging + marts"
---

<!-- Outline draft — expand each section before publishing. -->

## 35 deprecation warnings

Most were mechanical — config keys that moved, tests that wanted a new signature. Worth clearing them all before switching engines, because after the switch you can't tell a real failure from a warning you'd been ignoring.

## The SIGSEGV

A crash in the SQL analyzer, what triggered it, and the model I rewrote to avoid it.

## Was it worth it

Compile times, and what the stricter analyzer caught that the old parser waved through.
