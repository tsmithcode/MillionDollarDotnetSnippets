using MillionDollarDotnetSnippets.Core;

namespace MillionDollarDotnetSnippets;

public static class IntegrateMessySystems
{
    public static int ParseIntSafe(string? value, int fallback = 0) => Phase4Snippets.ParseIntSafe(value, fallback);

    public static decimal ParseDecimalSafe(string? value, decimal fallback = 0m) =>
        Phase4Snippets.ParseDecimalSafe(value, fallback);

    public static List<string> ParseCsvLine(string? line) => Phase4Snippets.ParseCsvLine(line);

    public static string CurrentEnv() => Phase4Snippets.CurrentEnv();

    public static Dictionary<string, string> LoadEnv(IEnumerable<string> lines) => Phase4Snippets.LoadEnv(lines);

    public static T Memoize<T>(string key, Func<T> factory) => Phase4Snippets.Memoize(key, factory);

    public static RuleEvaluationResult ApplyRules(
        WorkRecord record,
        IDictionary<string, string> output,
        IReadOnlyList<RuleDefinition> rules) =>
        new MillionDollarDotnetSnippets.RulesEngine.ConfigDrivenRuleEngine(rules).ApplyRules(record, output);
}
