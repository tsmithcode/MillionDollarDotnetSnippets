# Security and Trust Baseline

This document defines the current trust posture for the public MDS product surface.

## What is enforced in app code today

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `Origin-Agent-Cluster: ?1`
- `Permissions-Policy` disabling camera, microphone, geolocation, and browsing-topics
- a compatibility-hardened `Content-Security-Policy` with inline script and style allowance for the current Next.js runtime plus restrictions on framing and object embedding
- `poweredByHeader: false` in Next.js

## Why this matters

- enterprise evaluators can see clear browser hardening instead of default hosting behavior
- framing and object-embedding abuse paths are closed
- MIME sniffing is disabled
- browser capability access is denied by default
- origin isolation and cross-origin resource boundaries are more explicit
- trust posture becomes part of release quality, not hidden infrastructure trivia

## Current limitation

The current Content Security Policy allows inline scripts and styles for App Router compatibility and runtime reliability.

That means the site currently favors stable production execution plus explicit documentation over a stricter script posture that would degrade the user experience.

## Next trust upgrade

- remove inline script allowance once the runtime can support a stricter CSP without breaking hydration or route interactivity
- tighten script posture with hashes or nonce-compatible rendering once framework support is stable
- add runtime verification of key response headers in release review
- add dependency and supply-chain review cadence
- define enterprise trust sign-off in the release checklist

## Release expectation

Security and trust settings are not optional polish.

If core response headers or trust posture regress, release can be blocked.
