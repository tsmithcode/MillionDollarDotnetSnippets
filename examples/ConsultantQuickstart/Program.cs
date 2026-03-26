using Microsoft.Extensions.DependencyInjection;
using MillionDollarDotnetSnippets.Application;
using MillionDollarDotnetSnippets.Core;
using MillionDollarDotnetSnippets.Extensions;
using MillionDollarDotnetSnippets;

var services = new ServiceCollection();

var rules = new List<RuleDefinition>
{
    new("Promote urgent work", "Priority", "Urgent", "Status", "Escalated"),
    new("Route CAD work", "WorkType", "CAD", "Queue", "Engineering Automation"),
    new("Route ERP work", "WorkType", "ERP", "Queue", "Operations Systems")
};

var inputPath = Path.Combine(AppContext.BaseDirectory, "Data", "input.json");

services.AddGoldenPathDemo(inputPath, rules);

var provider = services.BuildServiceProvider();
var orchestrator = provider.GetRequiredService<GoldenPathOrchestrator>();
var processed = await orchestrator.ProcessAsync();

Console.WriteLine("Golden Path Demo");
Console.WriteLine("================");
Console.WriteLine($"Environment: {Phase4Snippets.CurrentEnv()}");
Console.WriteLine();

foreach (var record in processed)
{
    Console.WriteLine($"Record: {record.Id}");
    Console.WriteLine($"  Queue: {record.Fields.GetValueOrDefault("Queue", "Unassigned")}");
    Console.WriteLine($"  Status: {record.Fields.GetValueOrDefault("Status", "Unset")}");
    Console.WriteLine($"  Applied Rules: {(record.AppliedRules.Count == 0 ? "None" : string.Join(", ", record.AppliedRules))}");
    Console.WriteLine($"  Validation Issues: {(record.ValidationIssues.Count == 0 ? "None" : string.Join("; ", record.ValidationIssues.Select(x => x.Message)))}");
    Console.WriteLine();
}
