# Security and Trust Baseline

This document defines the current trust posture for the public MDS product surface.

## What is enforced in app code today

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Cross-Origin-Opener-Policy: same-origin`
- `Permissions-Policy` disabling camera, microphone, geolocation, and browsing-topics
- a baseline `Content-Security-Policy` that blocks framing, object embedding, and cross-origin default execution
- `poweredByHeader: false` in Next.js

## Why this matters

- enterprise evaluators can see clear browser hardening instead of default hosting behavior
- framing and object-embedding abuse paths are closed
- MIME sniffing is disabled
- browser capability access is denied by default
- trust posture becomes part of release quality, not hidden infrastructure trivia

## Current limitation

The current Content Security Policy still allows inline script and inline style execution because the App Router runtime needs a simpler compatibility posture today.

That means the current CSP is a meaningful improvement, but not the final form.

## Next trust upgrade

- move to nonce-based CSP for scripts and styles
- add runtime verification of key response headers in release review
- add dependency and supply-chain review cadence
- define enterprise trust sign-off in the release checklist

## Release expectation

Security and trust settings are not optional polish.

If core response headers or trust posture regress, release can be blocked.
