---
title: "A WoE scorecard in plain SQL"
description: "Building a probability-of-default model for the verification team without leaving Postgres."
dek: "Building a probability-of-default model for the verification team without leaving Postgres."
pubDate: 2026-05-08
tag: "Data"
category: "Data"
tone: "aqua"
readingTime: 9
heroCaption: "woe scorecard · postgres only"
---

<!-- Outline draft — expand each section before publishing. -->

## Why SQL and not a notebook

The scorecard had to run where the data already lived and be readable by the people who own the decision. A model nobody on the verification team can audit doesn't get used, however good its AUC is.

## Binning and weight of evidence

Coarse-classing the features, computing WoE per bin, and keeping the bins stable as new data arrives.

## Scoring and monitoring

Turning WoE into points, and watching for drift.
