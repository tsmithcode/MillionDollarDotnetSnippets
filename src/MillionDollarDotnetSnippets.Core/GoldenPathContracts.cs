namespace MillionDollarDotnetSnippets.Core;

public sealed record WorkRecord(string Id, Dictionary<string, string> Fields);

public sealed record ValidationIssue(string Code, string Message);

public sealed record RuleTrace(
    string RuleName,
    string InputField,
    string? ActualValue,
    string ExpectedValue,
    bool Matched,
    string Outcome);

public sealed record RuleDefinition(
    string Name,
    string InputField,
    string ExpectedValue,
    string OutputField,
    string OutputValue);

public sealed record ProcessedRecord(
    string Id,
    Dictionary<string, string> Fields,
    IReadOnlyList<string> AppliedRules,
    IReadOnlyList<ValidationIssue> ValidationIssues,
    IReadOnlyList<RuleTrace> RuleTrace);

public interface IRecordSource
{
    Task<IReadOnlyList<WorkRecord>> LoadAsync(CancellationToken cancellationToken = default);
}

public interface IRuleEngine
{
    RuleEvaluationResult ApplyRules(WorkRecord record, IDictionary<string, string> output);
}

public interface IRecordValidator
{
    IReadOnlyList<ValidationIssue> Validate(IDictionary<string, string> output);
}

public sealed record RuleEvaluationResult(
    IReadOnlyList<string> AppliedRules,
    IReadOnlyList<RuleTrace> RuleTrace);
