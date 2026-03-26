# Getting Started

## 1. Build the solution

```bash
dotnet build MillionDollarDotnetSnippets.slnx
```

## 2. Run the golden path demo

```bash
dotnet run --project examples/ConsultantQuickstart/ConsultantQuickstart.csproj
```

## 3. Understand the project shape

- `src/MillionDollarDotnetSnippets.Core` for contracts and shared models
- `src/MillionDollarDotnetSnippets.Application` for orchestration
- `src/MillionDollarDotnetSnippets.Infrastructure` for ingestion and external boundaries
- `src/MillionDollarDotnetSnippets.RulesEngine` for config-driven rules
- `src/MillionDollarDotnetSnippets.Extensions` for low-friction registration
- `src/MillionDollarDotnetSnippets` for the umbrella snippet library surface
