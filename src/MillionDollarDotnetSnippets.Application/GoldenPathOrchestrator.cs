using MillionDollarDotnetSnippets.Core;

namespace MillionDollarDotnetSnippets.Application;

public sealed class GoldenPathOrchestrator
{
    private readonly IRecordSource _recordSource;
    private readonly IRuleEngine _ruleEngine;
    private readonly IRecordValidator _recordValidator;

    public GoldenPathOrchestrator(
        IRecordSource recordSource,
        IRuleEngine ruleEngine,
        IRecordValidator recordValidator)
    {
        _recordSource = recordSource;
        _ruleEngine = ruleEngine;
        _recordValidator = recordValidator;
    }

    public async Task<IReadOnlyList<ProcessedRecord>> ProcessAsync(CancellationToken cancellationToken = default)
    {
        var records = await _recordSource.LoadAsync(cancellationToken);
        var output = new List<ProcessedRecord>(records.Count);

        foreach (var record in records)
        {
            var transformed = new Dictionary<string, string>(record.Fields, StringComparer.OrdinalIgnoreCase);
            var appliedRules = _ruleEngine.ApplyRules(record, transformed);
            var issues = _recordValidator.Validate(transformed);

            output.Add(new ProcessedRecord(record.Id, transformed, appliedRules, issues));
        }

        return output;
    }
}
