# Telemetry Foundation

This document defines the current product telemetry model for the MDS web experience.

## Principles

- first-party only
- privacy-aware by default
- no third-party analytics dependency
- capture only product-significant behavior
- keep telemetry understandable to leadership and engineering

## Current events

- `page_view`
  captures visits to the wizard, proof, and leadership surfaces
- `wizard_step_changed`
  captures manual wizard navigation through the progress meter
- `wizard_selection_changed`
  captures persona, pain, and proof selections
- `wizard_recommendation_opened`
  captures when a user follows the recommended path

## What is intentionally not captured

- personal identity
- free-form text input
- full user agent strings
- IP storage in app code
- cross-site behavioral tracking

## Current implementation

- browser events post to `/api/telemetry`
- events respect `Do Not Track`
- a session-scoped random identifier is stored in `sessionStorage`
- server-side handling currently logs structured telemetry events for operational review

## Next telemetry upgrade

- route events into durable analytics storage
- add funnel reporting for wizard completion and proof engagement
- add leadership-view reporting for investor and executive review surfaces
- add release dashboards for adoption, engagement, and path quality
