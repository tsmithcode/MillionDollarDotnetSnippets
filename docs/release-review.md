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

## Automated review expectations

- production build passes
- Playwright suite passes across Chromium, WebKit, mobile, and reduced-motion project
- failure artifacts are retained for screenshots, traces, and video

## Release blocker rule

If any critical page fails browser proof, keyboard proof, or reduced-motion proof, the release should be treated as blocked until resolved.
