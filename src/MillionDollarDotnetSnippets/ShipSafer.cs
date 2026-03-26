using System.Text.Json;
using MillionDollarDotnetSnippets.Core;

namespace MillionDollarDotnetSnippets;

public static class ShipSafer
{
    public static Task<T> RetryAsync<T>(Func<Task<T>> func, int attempts = 3) =>
        Phase2Snippets.RetryAsync(func, attempts);

    public static (bool Success, T? Result) TryWrap<T>(Func<T> func) => Phase2Snippets.TryWrap(func);

    public static void LogJson<T>(T obj, Action<string> log) => Phase2Snippets.LogJson(obj, log);

    public static string MustBePresent(string? value, string fieldName) => Phase4Snippets.MustBePresent(value, fieldName);

    public static bool IsValid<T>(T value, params Func<T, bool>[] rules) => Phase4Snippets.IsValid(value, rules);

    public static IReadOnlyList<ValidationIssue> ValidateRequired(IDictionary<string, string> output, params string[] requiredFields) =>
        new MillionDollarDotnetSnippets.RulesEngine.RequiredFieldValidator(requiredFields).Validate(output);
}
