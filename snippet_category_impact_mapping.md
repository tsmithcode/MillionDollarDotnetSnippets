# Implementation Capability Map

This file is the implementation map for the shipped helper surface.
It is intentionally factual and should support the product story rather than define it.

## Build Faster

Source: `src/MillionDollarDotnetSnippets/Phases/Phase1.ReflectionLinqDi.cs`

| Category | Snippets | Why it matters |
|---|---:|---|
| Reflection & Generics | 10 | Dynamic construction, property access, and runtime type work for flexible internal tools |
| LINQ + Collections | 8 | Faster joins, grouping, and reshaping for line-of-business data |
| JSON & Dictionary | 4 | Lightweight object serialization and key/value transformation |
| Dependency Injection | 3 | Faster wiring for modular services and plugin-style apps |

## Ship Safer

Source: `src/MillionDollarDotnetSnippets/Phases/Phase2.AsyncApiPipeline.cs`

| Category | Snippets | Why it matters |
|---|---:|---|
| Async Pipelines | 5 | Retry, fan-out, and safe task execution patterns |
| Minimal API | 5 | Simple API wiring helpers and error shaping |
| Memory & Performance | 5 | Span, pooled buffers, and lower-allocation string handling |
| Errors & Logging | 10 | Common wrappers for timing, exception handling, and structured logs |

## Automate More

Source: `src/MillionDollarDotnetSnippets/Phases/Phase3.ExpressionsCliAuthIo.cs`

| Category | Snippets | Why it matters |
|---|---:|---|
| Expression Trees | 5 | Runtime filtering, ordering, getters, and setters |
| Source Generation Hooks | 5 | Template and registry helpers for code-driven automation |
| CLI Utilities | 5 | Better operator experience for internal tools |
| Auth & Security | 5 | Hashing, tokens, and base64 helpers |
| File & Stream | 5 | Common text and stream workflows |

## Integrate Messy Systems

Source: `src/MillionDollarDotnetSnippets/Phases/Phase4.ValidationConfigEnumCache.cs`

| Category | Snippets | Why it matters |
|---|---:|---|
| Parsing & Conversion | 5 | Safer string-to-value conversion for external data |
| Enum & Attribute Tools | 5 | Cleaner metadata-driven UI and rules work |
| Data Validation | 5 | Faster guardrails for request and record handling |
| Config & Env Vars | 5 | Environment-aware apps with simpler configuration reads |
| Meta & Caching | 5 | Small in-memory caching for repeated lookups and computed values |

## Notes

- The repo now builds through `src/MillionDollarDotnetSnippets/MillionDollarDotnetSnippets.csproj`.
- The internal source still uses phase-based file names, but the market-facing product story should stay capability-first.
- Public claims in the README should stay consistent with this file.
