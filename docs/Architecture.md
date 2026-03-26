# Architecture

The repo now follows a consultant-acceleration framework shape rather than a flat snippet-only layout.

## Projects

- `MillionDollarDotnetSnippets.Core`
  Shared contracts, records, and interfaces.
- `MillionDollarDotnetSnippets.Application`
  Orchestration and workflow coordination.
- `MillionDollarDotnetSnippets.Infrastructure`
  File and system boundary implementations.
- `MillionDollarDotnetSnippets.RulesEngine`
  Config-driven rules and validation behavior.
- `MillionDollarDotnetSnippets.Extensions`
  Service registration and low-friction composition.
- `MillionDollarDotnetSnippets`
  Umbrella product package and snippet surface.

## Golden path

The quickstart app proves the core product story by showing one vertical slice:

1. load records
2. apply rules
3. validate output
4. print a useful result
