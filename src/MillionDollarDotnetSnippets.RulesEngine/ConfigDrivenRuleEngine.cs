using MillionDollarDotnetSnippets.Core;

namespace MillionDollarDotnetSnippets.RulesEngine;

public sealed class ConfigDrivenRuleEngine : IRuleEngine
{
    private readonly IReadOnlyList<RuleDefinition> _rules;

    public ConfigDrivenRuleEngine(IReadOnlyList<RuleDefinition> rules)
    {
        _rules = rules;
    }

    public RuleEvaluationResult ApplyRules(WorkRecord record, IDictionary<string, string> output)
    {
        var applied = new List<string>();
        var trace = new List<RuleTrace>(_rules.Count);

        foreach (var rule in _rules)
        {
            if (!record.Fields.TryGetValue(rule.InputField, out var inputValue))
            {
                trace.Add(new RuleTrace(
                    rule.Name,
                    rule.InputField,
                    null,
                    rule.ExpectedValue,
                    false,
                    "Skipped because the input field was missing."));
                continue;
            }

            if (!string.Equals(inputValue, rule.ExpectedValue, StringComparison.OrdinalIgnoreCase))
            {
                trace.Add(new RuleTrace(
                    rule.Name,
                    rule.InputField,
                    inputValue,
                    rule.ExpectedValue,
                    false,
                    $"Skipped because '{inputValue}' did not match '{rule.ExpectedValue}'."));
                continue;
            }

            output[rule.OutputField] = rule.OutputValue;
            applied.Add(rule.Name);
            trace.Add(new RuleTrace(
                rule.Name,
                rule.InputField,
                inputValue,
                rule.ExpectedValue,
                true,
                $"Applied and set '{rule.OutputField}' to '{rule.OutputValue}'."));
        }

        return new RuleEvaluationResult(applied, trace);
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
