# Performance Budget Baseline

This document defines the current budget guardrails for the MDS web product.

Budgets are measured from the built output using gzip size so the check tracks what users are more likely to feel over the network.

## Current budgets

- shared first-load JS: `<= 105 kB gzip`
- homepage first-load payload: `<= 140 kB gzip`
- content pages (`/about`, `/proof`, `/leadership`) first-load payload: `<= 136 kB gzip`
- route-specific JS chunk per page: `<= 8 kB gzip`
- layout CSS: `<= 5 kB gzip`

## Why these budgets exist

- keep the premium surface honest on constrained devices
- prevent the hero path from silently regressing
- make route growth visible in CI before it ships
- give the Performance Engineering Lead a real operating line, not a vague aspiration

## Current baseline after the deferred-hero pass

- shared first-load JS: about `100.7 kB gzip`
- homepage first-load payload: about `137.4 kB gzip`
- about/proof/leadership first-load payload: about `133.6 kB gzip`
- homepage route-specific JS chunk: about `7.1 kB gzip`
- content page route-specific JS chunk: about `3.2 kB gzip`
- layout CSS: about `3.4 kB gzip`

## Release expectation

Performance is now a release-managed concern.

If budgets regress materially, CI should fail and the release should be treated as at risk until the delta is explained or corrected.
