---
title: "Building an ngrok alternative in Go"
description: "Designing 1master: reverse tunnels, a tiny CLI, and shipping it with GitHub Actions."
dek: "Designing 1master: reverse tunnels, a tiny CLI, and shipping it with GitHub Actions."
pubDate: 2026-06-15
tag: "Go"
category: "Go"
tone: "sky"
readingTime: 7
heroCaption: "1master · go + docker + github actions"
---

<!-- Outline draft — expand each section before publishing. -->

## Why self-host a tunnel

A tunnel is a small piece of infrastructure with a large amount of trust attached to it: every request to your local service passes through it. Running my own meant the trust boundary stopped at a machine I control.

## The reverse tunnel

How the agent dials out, how connections are multiplexed back, and what the protocol looks like on the wire.

## Shipping it

One-command deploys with Docker, and a release pipeline in GitHub Actions.
