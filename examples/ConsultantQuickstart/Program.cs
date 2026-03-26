using Microsoft.Extensions.DependencyInjection;
using MillionDollarDotnetSnippets;
using MillionDollarDotnetSnippets.Application;
using MillionDollarDotnetSnippets.Core;
using MillionDollarDotnetSnippets.Extensions;
using System.Text.Json;

var rules = new List<RuleDefinition>
{
    new("Promote urgent work", "Priority", "Urgent", "Status", "Escalated"),
    new("Route CAD work", "WorkType", "CAD", "Queue", "Engineering Automation"),
    new("Route ERP work", "WorkType", "ERP", "Queue", "Operations Systems")
};

var inputPath = Path.Combine(AppContext.BaseDirectory, "Data", "input.json");
var inputRecords = await LoadInputRecordsAsync(inputPath);

Console.WriteLine("Golden Path Demo");
Console.WriteLine("================");
Console.WriteLine($"Environment: {IntegrateMessySystems.CurrentEnv()}");
Console.WriteLine();

await RunFileModeAsync(inputPath, rules);
await RunHttpModeAsync(inputRecords, rules);

static async Task RunFileModeAsync(string inputPath, List<RuleDefinition> rules)
{
    var services = new ServiceCollection();
    services.AddGoldenPathDemo(inputPath, rules);

    using var provider = services.BuildServiceProvider();
    var orchestrator = provider.GetRequiredService<GoldenPathOrchestrator>();
    var processed = await orchestrator.ProcessAsync();

    PrintResults("File source mode", processed);
}

static async Task RunHttpModeAsync(IReadOnlyList<WorkRecord> inputRecords, List<RuleDefinition> rules)
{
    using var httpClient = new HttpClient(new StubJsonMessageHandler(inputRecords))
    {
        BaseAddress = new Uri("https://demo.local/")
    };

    var services = new ServiceCollection();
    services.AddGoldenPathDemoFromHttpClient(httpClient, "api/workitems", rules);

    using var provider = services.BuildServiceProvider();
    var orchestrator = provider.GetRequiredService<GoldenPathOrchestrator>();
    var processed = await orchestrator.ProcessAsync();

    PrintResults("HTTP source mode", processed);
}

static async Task<IReadOnlyList<WorkRecord>> LoadInputRecordsAsync(string inputPath)
{
    await using var stream = File.OpenRead(inputPath);
    return await JsonSerializer.DeserializeAsync<List<WorkRecord>>(stream) ?? new List<WorkRecord>();
}

static void PrintResults(string mode, IReadOnlyList<ProcessedRecord> processed)
{
    Console.WriteLine(mode);
    Console.WriteLine(new string('-', mode.Length));

    foreach (var record in processed)
    {
        Console.WriteLine($"Record: {record.Id}");
        Console.WriteLine($"  Queue: {record.Fields.GetValueOrDefault("Queue", "Unassigned")}");
        Console.WriteLine($"  Status: {record.Fields.GetValueOrDefault("Status", "Unset")}");
        Console.WriteLine($"  Applied Rules: {(record.AppliedRules.Count == 0 ? "None" : string.Join(", ", record.AppliedRules))}");
        Console.WriteLine($"  Validation Issues: {(record.ValidationIssues.Count == 0 ? "None" : string.Join("; ", record.ValidationIssues.Select(x => x.Message)))}");
        Console.WriteLine("  Rule Trace:");
        foreach (var trace in record.RuleTrace)
            Console.WriteLine($"    - {trace.RuleName}: {trace.Outcome}");
        Console.WriteLine();
    }

    var groupedByQueue = BuildFaster.GroupByKey(processed.ToList(), record => record.Fields.GetValueOrDefault("Queue", "Unassigned"));
    Console.WriteLine($"Queues produced: {string.Join(", ", groupedByQueue.Keys)}");
    Console.WriteLine();
}

sealed class StubJsonMessageHandler : HttpMessageHandler
{
    private readonly IReadOnlyList<WorkRecord> _inputRecords;

    public StubJsonMessageHandler(IReadOnlyList<WorkRecord> inputRecords)
    {
        _inputRecords = inputRecords;
    }

    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var payload = JsonSerializer.Serialize(_inputRecords);
        var response = new HttpResponseMessage(System.Net.HttpStatusCode.OK)
        {
            Content = new StringContent(payload, System.Text.Encoding.UTF8, "application/json")
        };

        return Task.FromResult(response);
    }
}
