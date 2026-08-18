---
title: "OAuth2 stateless vs session: the Spring trap"
description: "The subtle conflict between STATELESS sessions and Google OAuth2 login in Spring Security 6."
dek: "The subtle conflict between STATELESS sessions and Google OAuth2 login in Spring Security 6."
pubDate: 2026-05-21
tag: "Java"
category: "Java"
tone: "amber"
readingTime: 5
heroCaption: "spring security 6 · jwt + oauth2 login"
---

<!-- Outline draft — expand each section before publishing. -->

## A JWT API with a login page

Set `SessionCreationPolicy.STATELESS` for your JWT API, then add `oauth2Login()` for Google, and the redirect comes back failing on state — because the authorization request was stored in a session you just told Spring never to create.

## The two ways out

Store the authorization request somewhere that survives a stateless filter chain, or scope the stateless policy to the API paths only.

## What I shipped

The configuration I ended up with, and why.
