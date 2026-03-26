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

## Golden path

The quickstart app proves the core product story by showing one vertical slice:

1. load records
2. support both file and HTTP-backed ingestion modes
3. apply rules
4. validate output
5. print an auditable result
