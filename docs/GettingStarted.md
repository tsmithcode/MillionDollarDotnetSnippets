# Getting Started

## 1. Build the solution

```bash
dotnet build MillionDollarDotnetSnippets.slnx
```

## 2. Run the golden path demo

```bash
dotnet run --project examples/ConsultantQuickstart/ConsultantQuickstart.csproj
```

Expected result:

- records load from both a sample input file and an HTTP-backed source
- rules either apply or explain why they did not apply
- validation reports missing required outputs
- the terminal shows an audit-friendly rule trace for each record

Fast success markers:

- you see both `File source mode` and `HTTP source mode`
- `WORK-1001` routes to `Engineering Automation`
- `WORK-1002` shows a validation issue because `Status` was not produced
- the final queue summary prints `Engineering Automation, Operations Systems`

## 3. Understand the project shape

- `src/MillionDollarDotnetSnippets.Core` for contracts and shared models
- `src/MillionDollarDotnetSnippets.Application` for orchestration
- `src/MillionDollarDotnetSnippets.Infrastructure` for ingestion and external boundaries
- `src/MillionDollarDotnetSnippets.RulesEngine` for config-driven rules
- `src/MillionDollarDotnetSnippets.Extensions` for low-friction registration
- `src/MillionDollarDotnetSnippets` for the umbrella snippet library surface

## 4. Prefer the capability-first surface

- `BuildFaster`
- `ShipSafer`
- `AutomateMore`
- `IntegrateMessySystems`
