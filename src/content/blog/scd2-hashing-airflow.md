---
title: "SCD2 without tears: hashing rows in Airflow"
description: "A clean pattern for slowly-changing dimensions that survives re-runs and late-arriving data."
dek: "A clean pattern for slowly-changing dimensions that survives re-runs and late-arriving data."
pubDate: 2026-07-09
tag: "ETL"
category: "Data"
tone: "coral"
readingTime: 6
heroCaption: "zoho_scd2.py · airflow + postgres"
---

<!-- Outline draft — expand each section before publishing. -->

## Why row hashing

SCD2 tables go wrong in two ways: they miss a change, or they record a change that never happened. Hashing the business columns of a row gives you one comparable value per record, so "did this change?" stops being a hand-written column-by-column comparison that drifts every time the source adds a field.

## Making the DAG idempotent

The whole point is that a re-run of yesterday's interval produces the same table it produced the first time. That means closing and opening validity windows from the source timestamps, never from `now()`.

## Late-arriving data

Notes on backfills and out-of-order updates.
