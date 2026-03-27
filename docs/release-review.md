# Release Review

This document defines the manual release review expectations for the MDS web product.

## Critical pages

- homepage
- about
- proof
- wizard recommendation state

## Manual review expectations

- first viewport is stable on desktop and mobile
- keyboard focus is always visible
- reduced-motion mode does not hide critical meaning
- 3D stage does not block interaction or distort layout
- primary CTA remains obvious
- founder and proof pages still feel aligned to the homepage narrative
- trust posture remains aligned with the documented security baseline
- skip-link interaction moves focus into main content
- external navigation is clearly disclosed

## Automated review expectations

- production build passes
- performance budgets pass
- Playwright suite passes across Chromium, WebKit, mobile, and reduced-motion project
- security headers are present on the public product surface
- external-link disclosure and skip-link focus behavior are covered by the browser gate
- failure artifacts are retained for screenshots, traces, and video

## Release blocker rule

If any critical page fails browser proof, keyboard proof, or reduced-motion proof, the release should be treated as blocked until resolved.
