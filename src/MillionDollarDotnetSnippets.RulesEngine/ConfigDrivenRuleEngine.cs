using MillionDollarDotnetSnippets.Core;

namespace MillionDollarDotnetSnippets.RulesEngine;

public sealed class ConfigDrivenRuleEngine : IRuleEngine
{
    private readonly IReadOnlyList<RuleDefinition> _rules;

    public ConfigDrivenRuleEngine(IReadOnlyList<RuleDefinition> rules)
    {
        _rules = rules;
    }

    public IReadOnlyList<string> ApplyRules(WorkRecord record, IDictionary<string, string> output)
    {
        var applied = new List<string>();

        foreach (var rule in _rules)
        {
            if (!record.Fields.TryGetValue(rule.InputField, out var inputValue))
                continue;

            if (!string.Equals(inputValue, rule.ExpectedValue, StringComparison.OrdinalIgnoreCase))
                continue;

            output[rule.OutputField] = rule.OutputValue;
            applied.Add(rule.Name);
        }

        return applied;
    }
}

public sealed class RequiredFieldValidator : IRecordValidator
{
    private readonly IReadOnlyList<string> _requiredFields;

    public RequiredFieldValidator(params string[] requiredFields)
    {
        _requiredFields = requiredFields;
    }

    public IReadOnlyList<ValidationIssue> Validate(IDictionary<string, string> output)
    {
        var issues = new List<ValidationIssue>();

        foreach (var field in _requiredFields)
        {
            if (!output.TryGetValue(field, out var value) || string.IsNullOrWhiteSpace(value))
                issues.Add(new ValidationIssue("missing_field", $"Required field '{field}' was not produced."));
        }

        return issues;
    }
}
