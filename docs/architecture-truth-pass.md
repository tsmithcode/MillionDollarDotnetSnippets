# Architecture Truth Pass

This document is the Phase 1 execution artifact for the sovereign-budget program.

## Phase mission

Align the website, .NET framework, samples, docs, telemetry, and release model into one explicit product architecture.

## Active owners

- Senior .NET Architect / Library Owner
- Platform / Release Engineer
- Enterprise Platform and Architecture Director

## Added specialists for this phase

- Enterprise Platform and Architecture Director
- Developer Platform and Packaging Director
- Enterprise Integration Architecture Lead

## Product system map

### 1. Public web product surface

Owned surfaces:

- guided wizard
- founder authority surface
- proof surface
- leadership surface
- browser/device proof

Purpose:

- turn the framework into an understandable, premium, executive-readable product

Current boundary:

- website explains and proves the framework
- website does not replace the framework package itself

### 2. Framework product system

Owned surfaces:

- contracts and records
- orchestration
- integration boundaries
- rules and validation
- capability-first API surface

Purpose:

- provide the reusable product engine behind the public promise

Current boundary:

- the framework is the source of technical truth
- the website, docs, and quickstart must not promise capabilities the framework does not support

### 3. Proof and adoption system

Owned surfaces:

- quickstart example
- docs spine
- telemetry
- release and browser proof

Purpose:

- prove the framework in a way that helps zero-knowledge users, technical evaluators, and executive readers reach the same conclusion

Current boundary:

- quickstart is the current flagship proof slice
- docs and telemetry exist to reinforce the same product truth

## Package and distribution strategy

### Current package posture

- internal modules are separated correctly enough to support a real product architecture
- the umbrella package is the intended public entrypoint
- package intent is present, but packaging strategy is not yet fully productized

### Phase 1 packaging decisions

- keep `MillionDollarDotnetSnippets` as the capability-first public package surface
- treat `Core`, `Application`, `Infrastructure`, `RulesEngine`, and `Extensions` as internal product modules first and external packages only if adoption needs justify it
- keep the quickstart as the proof reference implementation for the umbrella package
- keep the website and docs aligned to capability-first language, not internal project names

### Immediate packaging outputs expected from this phase

- clear package intent in docs
- clearer install and adoption story
- explicit statement that the umbrella package is the main product entrypoint

## Flagship enterprise integration slice

### Why this is the next moat

The current proof path already demonstrates value through file and HTTP ingestion, rules, and validation.
The highest-ROI next proof is not a new disconnected sample.
It is an extension of the same workflow into messier, higher-value system boundaries.

### Target slice for the next phase after architecture alignment

Build one enterprise-grade delivery flow that:

- ingests from a more realistic business-system boundary
- applies config-driven rules
- emits auditable diagnostic output
- produces a business-facing routed outcome

### Preferred first extension

- ERP or line-of-business integration style slice

That slice should emphasize:

- retries
- idempotency direction
- validation visibility
- rules trace clarity
- executive-readable outcome proof

## Boundaries the team should now treat as fixed

- website is the premium explanatory and proof surface
- framework projects are the reusable product engine
- quickstart is the current flagship proof slice
- docs are part of the product system, not supporting clutter
- browser/device proof is part of release truth, not optional polish

## Expected score movement for this phase

| Area | Current | Expected |
|---|---:|---:|
| .NET framework depth | 6.9 | 8.4 |
| Packaging / adoption / DX | 6.4 | 8.3 |
| Integration architecture | 6.3 | 8.1 |

## Completion signal

Phase 1 is complete when:

- the repo can explain its product system boundaries without ambiguity
- package intent and adoption intent are aligned
- the next flagship integration slice is explicitly chosen
- later phases no longer need to invent architecture truth on the fly
