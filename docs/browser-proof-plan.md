# Browser Proof Plan

## Goal

Move from build proof to real browser and device proof in production-like conditions.

## What must be proven

- the guided path works for zero-knowledge users
- the quickstart instructions succeed without author knowledge
- accessibility-critical flows are operable by keyboard
- explanatory states are visible when options are allowed or blocked
- the product holds together on desktop and mobile-sized viewports

## Proof layers

### Browser coverage

- landing or wizard entry
- founder/about page
- guided path selection flow
- proof screen with expected outputs

### Device coverage

- desktop
- tablet
- mobile portrait

### Accessibility coverage

- tab order
- focus visibility
- heading order
- contrast
- SVG fallback meaning in text

## Minimum tooling expectation

- browser automation in CI
- stable smoke path for the public experience
- screenshot snapshots for release review
- one production-like preview environment used before release

## Release gate

The site should not ship as “premium” or “accessible” unless browser, device, and keyboard paths are green in a production-like preview.
