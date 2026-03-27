using Microsoft.Extensions.DependencyInjection;
using MillionDollarDotnetSnippets;
using MillionDollarDotnetSnippets.Application;
using MillionDollarDotnetSnippets.Core;
using MillionDollarDotnetSnippets.Extensions;
using System.Text.Json;

var rules = new List<RuleDefinition>
{
    new("Promote urgent work", "Priority", "Urgent", "Status", "Escalated"),
    new("Route ERP operations", "WorkType", "ERP", "Queue", "Enterprise Operations"),
    new("Route CAD engineering", "WorkType", "CAD", "Queue", "Engineering Automation"),
    new("Assign ERP connector profile", "SourceSystem", "ERP", "ConnectorProfile", "ERP-Bridge"),
    new("Assign CAD connector profile", "SourceSystem", "CAD", "ConnectorProfile", "CAD-Relay"),
    new("US work keeps same-day SLA", "Region", "US", "SlaWindow", "SameDay"),
    new("EU work keeps next-business SLA", "Region", "EU", "SlaWindow", "NextBusinessDay"),
    new("Platinum tier requires executive approval", "CustomerTier", "Platinum", "ApprovalLane", "Executive Review"),
    new("Gold tier requires operations approval", "CustomerTier", "Gold", "ApprovalLane", "Operations Review")
};

var inputPath = Path.Combine(AppContext.BaseDirectory, "Data", "input.json");
var inputRecords = await LoadInputRecordsAsync(inputPath);

Console.WriteLine("Golden Path Demo");
Console.WriteLine("================");
Console.WriteLine($"Environment: {IntegrateMessySystems.CurrentEnv()}");
Console.WriteLine("Scenario: ERP and CAD work routing with connector assignment, SLA windows, and approval lanes");
Console.WriteLine();

var requiredFields = new[] { "Status", "Queue", "ConnectorProfile", "SlaWindow" };
await RunFileModeAsync(inputPath, rules, requiredFields);
await RunHttpModeAsync(inputRecords, rules, requiredFields);

static async Task RunFileModeAsync(string inputPath, List<RuleDefinition> rules, string[] requiredFields)
{
    var services = new ServiceCollection();
    services.AddGoldenPathDemo(inputPath, rules, requiredFields);

    using var provider = services.BuildServiceProvider();
    var orchestrator = provider.GetRequiredService<GoldenPathOrchestrator>();
    var processed = await orchestrator.ProcessAsync();

    PrintResults("File source mode", processed);
}

static async Task RunHttpModeAsync(IReadOnlyList<WorkRecord> inputRecords, List<RuleDefinition> rules, string[] requiredFields)
{
    using var httpClient = new HttpClient(new StubJsonMessageHandler(inputRecords))
    {
        BaseAddress = new Uri("https://demo.local/")
    };

    var services = new ServiceCollection();
    services.AddGoldenPathDemoFromHttpClient(httpClient, "api/workitems", rules, requiredFields);

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
        Console.WriteLine($"  Connector Profile: {record.Fields.GetValueOrDefault("ConnectorProfile", "Unset")}");
        Console.WriteLine($"  SLA Window: {record.Fields.GetValueOrDefault("SlaWindow", "Unset")}");
        Console.WriteLine($"  Approval Lane: {record.Fields.GetValueOrDefault("ApprovalLane", "Standard Delivery")}");
        Console.WriteLine($"  Applied Rules: {(record.AppliedRules.Count == 0 ? "None" : string.Join(", ", record.AppliedRules))}");
        Console.WriteLine($"  Validation Issues: {(record.ValidationIssues.Count == 0 ? "None" : string.Join("; ", record.ValidationIssues.Select(x => x.Message)))}");
        Console.WriteLine("  Rule Trace:");
        foreach (var trace in record.RuleTrace)
            Console.WriteLine($"    - {trace.RuleName}: {trace.Outcome}");
        Console.WriteLine();
    }

    var groupedByQueue = BuildFaster.GroupByKey(processed.ToList(), record => record.Fields.GetValueOrDefault("Queue", "Unassigned"));
    var executiveReviewCount = processed.Count(record => string.Equals(
        record.Fields.GetValueOrDefault("ApprovalLane"),
        "Executive Review",
        StringComparison.OrdinalIgnoreCase));
    var validationFailureCount = processed.Count(record => record.ValidationIssues.Count > 0);

    Console.WriteLine($"Queues produced: {string.Join(", ", groupedByQueue.Keys)}");
    Console.WriteLine($"Executive review workload: {executiveReviewCount}");
    Console.WriteLine($"Records with validation failures: {validationFailureCount}");
    Console.WriteLine($"Flagship slice summary: {processed.Count} records processed through connector, SLA, and approval routing");
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
