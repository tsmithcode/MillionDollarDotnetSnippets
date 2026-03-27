# Architecture

The repo now follows a consultant-acceleration framework shape rather than a flat snippet-only layout.

## Projects

- `MillionDollarDotnetSnippets.Core`
  Shared contracts, records, and interfaces.
- `MillionDollarDotnetSnippets.Application`
  Orchestration and workflow coordination.
- `MillionDollarDotnetSnippets.Infrastructure`
  File and HTTP boundary implementations.
- `MillionDollarDotnetSnippets.RulesEngine`
  Config-driven rules and validation behavior.
- `MillionDollarDotnetSnippets.Extensions`
  Service registration and low-friction composition.
- `MillionDollarDotnetSnippets`
  Umbrella product package and snippet surface.

## Product system boundaries

- `app/`, `components/`, `lib/`, and `tests/e2e/`
  Public web product surface, guided onboarding, executive narrative, and browser/device proof.
- `src/MillionDollarDotnetSnippets.*`
  Framework product system, including contracts, orchestration, rules, integrations, and capability-first packaging.
- `examples/ConsultantQuickstart`
  Golden-path proof slice that demonstrates the framework in a consultant-grade workflow.
- `docs/`
  Operating system for adoption, governance, architecture truth, and appraisal clarity.

## Package intent

- `MillionDollarDotnetSnippets.Core`
  Stable contracts, records, and interfaces with the lowest dependency footprint.
- `MillionDollarDotnetSnippets.Application`
  Workflow orchestration, use-case coordination, and cross-module composition rules.
- `MillionDollarDotnetSnippets.Infrastructure`
  External boundaries such as file and HTTP ingestion, with future room for database, queue, and ERP-facing adapters.
- `MillionDollarDotnetSnippets.RulesEngine`
  Config-driven rules, validation, transformation logic, and auditable decision behavior.
- `MillionDollarDotnetSnippets.Extensions`
  Dependency registration and product assembly helpers that make adoption low-friction.
- `MillionDollarDotnetSnippets`
  Capability-first public package surface for framework users who should not need to think in internal module names.

## Golden path

The quickstart app proves the core product story by showing one vertical slice:

1. load records
2. support both file and HTTP-backed ingestion modes
3. apply rules
4. validate output
5. print an auditable result

## Phase 1 architecture truth

Phase 1 is focused on making the product system explicit rather than implied:

- website and framework are one product, not separate narratives
- quickstart is the current proof spine, not a side sample
- docs are expected to describe the same boundaries the code uses
- the next flagship integration slice should extend the current proof path rather than start a disconnected demo

Detailed Phase 1 execution lives in [architecture-truth-pass.md](./architecture-truth-pass.md).
