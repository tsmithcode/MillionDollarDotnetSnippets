using System.ComponentModel;
using System.Globalization;
using System.Reflection;

namespace MillionDollarDotnetSnippets;

public static class Phase4Snippets
{
    private static readonly Dictionary<string, object?> CacheStore = new(StringComparer.Ordinal);

    public static int ParseIntSafe(string? value, int fallback = 0) =>
        int.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var result) ? result : fallback;

    public static decimal ParseDecimalSafe(string? value, decimal fallback = 0m) =>
        decimal.TryParse(value, NumberStyles.Number, CultureInfo.InvariantCulture, out var result) ? result : fallback;

    public static bool ParseBoolSafe(string? value, bool fallback = false) =>
        bool.TryParse(value, out var result) ? result : fallback;

    public static List<string> ParseCsvLine(string? line) =>
        string.IsNullOrWhiteSpace(line)
            ? new List<string>()
            : line.Split(',', StringSplitOptions.TrimEntries).ToList();

    public static string ToQueryString(Dictionary<string, string?> values)
    {
        if (values.Count == 0)
            return string.Empty;

        return string.Join(
            "&",
            values
                .Where(x => !string.IsNullOrWhiteSpace(x.Key))
                .Select(x => $"{Uri.EscapeDataString(x.Key)}={Uri.EscapeDataString(x.Value ?? string.Empty)}"));
    }

    public static string GetEnumDescription<TEnum>(TEnum value) where TEnum : struct, Enum
    {
        var member = typeof(TEnum).GetMember(value.ToString()).FirstOrDefault();
        return member?.GetCustomAttribute<DescriptionAttribute>()?.Description ?? value.ToString();
    }

    public static string GetEnumDisplay<TEnum>(TEnum value) where TEnum : struct, Enum => GetEnumDescription(value);

    public static bool HasAttribute<TAttribute>(Enum value) where TAttribute : Attribute
    {
        var member = value.GetType().GetMember(value.ToString()).FirstOrDefault();
        return member?.GetCustomAttribute<TAttribute>() != null;
    }

    public static TEnum ParseEnum<TEnum>(string? value, TEnum fallback) where TEnum : struct, Enum =>
        Enum.TryParse<TEnum>(value, true, out var parsed) ? parsed : fallback;

    public static List<string> EnumNames<TEnum>() where TEnum : struct, Enum => Enum.GetNames(typeof(TEnum)).ToList();

    public static bool IsPresent(string? value) => !string.IsNullOrWhiteSpace(value);

    public static string MustBePresent(string? value, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException($"{fieldName} must be present.", fieldName);

        return value;
    }

    public static List<string> TrimAllStrings(IEnumerable<string?> values) =>
        values.Select(v => v?.Trim() ?? string.Empty).ToList();

    public static bool IsValid<T>(T value, params Func<T, bool>[] rules) => rules.All(rule => rule(value));

    public static List<string> Validate<T>(T value, params (string Error, Func<T, bool> Rule)[] rules) =>
        rules.Where(rule => !rule.Rule(value)).Select(rule => rule.Error).ToList();

    public static string GetEnv(string key, string? fallback = null) =>
        Environment.GetEnvironmentVariable(key) ?? fallback ?? string.Empty;

    public static bool HasEnv(string key) => !string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable(key));

    public static string CurrentEnv() =>
        GetEnv("ASPNETCORE_ENVIRONMENT", GetEnv("DOTNET_ENVIRONMENT", "Production"));

    public static Dictionary<string, string> LoadEnv(IEnumerable<string> lines)
    {
        var values = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        foreach (var line in lines)
        {
            if (string.IsNullOrWhiteSpace(line) || line.TrimStart().StartsWith("#", StringComparison.Ordinal))
                continue;

            var parts = line.Split('=', 2, StringSplitOptions.TrimEntries);
            if (parts.Length == 2 && !string.IsNullOrWhiteSpace(parts[0]))
                values[parts[0]] = parts[1];
        }

        return values;
    }

    public static string RequireEnv(string key)
    {
        var value = Environment.GetEnvironmentVariable(key);
        if (string.IsNullOrWhiteSpace(value))
            throw new InvalidOperationException($"Missing required environment variable: {key}");

        return value;
    }

    public static T Memoize<T>(string key, Func<T> factory)
    {
        if (CacheStore.TryGetValue(key, out var cached) && cached is T existing)
            return existing;

        var created = factory();
        CacheStore[key] = created;
        return created;
    }

    public static void SetCache<T>(string key, T value) => CacheStore[key] = value;

    public static T? InCache<T>(string key) =>
        CacheStore.TryGetValue(key, out var cached) && cached is T typed ? typed : default;

    public static bool ClearCache(string key) => CacheStore.Remove(key);

    public static void ClearAllCache() => CacheStore.Clear();
}
