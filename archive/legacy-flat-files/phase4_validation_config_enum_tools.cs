// ---------------------------
// 100 Code Snippets for the 1 Million Dollar .NET 8 Consultant
// Phase 4: Snippets 76-100 (Parsing, Validation, Config, Enum Tools, Caching)
// ---------------------------

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;

namespace MillionDollarDotnetSnippets;

public static class Phase4Snippets
{
    // ---------------------------
    // 📊 Parsing & Conversion (76-80)
    // ---------------------------

    /// <summary>Parse int with fallback.</summary>
    public static int ParseIntSafe(string? value, int fallback = 0) =>
        int.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var result) ? result : fallback;

    /// <summary>Parse decimal with fallback.</summary>
    public static decimal ParseDecimalSafe(string? value, decimal fallback = 0m) =>
        decimal.TryParse(value, NumberStyles.Number, CultureInfo.InvariantCulture, out var result) ? result : fallback;

    /// <summary>Parse bool with fallback.</summary>
    public static bool ParseBoolSafe(string? value, bool fallback = false) =>
        bool.TryParse(value, out var result) ? result : fallback;

    /// <summary>Parse a simple CSV line without quoted-field support.</summary>
    public static List<string> ParseCsvLine(string? line) =>
        string.IsNullOrWhiteSpace(line)
            ? new List<string>()
            : line.Split(',', StringSplitOptions.TrimEntries).ToList();

    /// <summary>Convert key/value pairs into a query string.</summary>
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

    // ---------------------------
    // 🧾 Enum & Attribute Tools (81-85)
    // ---------------------------

    /// <summary>Get description attribute value or enum name.</summary>
    public static string GetEnumDescription<TEnum>(TEnum value) where TEnum : struct, Enum
    {
        var member = typeof(TEnum).GetMember(value.ToString()).FirstOrDefault();
        return member?.GetCustomAttribute<DescriptionAttribute>()?.Description ?? value.ToString();
    }

    /// <summary>Get display text for enum value.</summary>
    public static string GetEnumDisplay<TEnum>(TEnum value) where TEnum : struct, Enum =>
        GetEnumDescription(value);

    /// <summary>Check whether enum value member has an attribute.</summary>
    public static bool HasAttribute<TAttribute>(Enum value) where TAttribute : Attribute
    {
        var member = value.GetType().GetMember(value.ToString()).FirstOrDefault();
        return member?.GetCustomAttribute<TAttribute>() != null;
    }

    /// <summary>Parse enum with fallback.</summary>
    public static TEnum ParseEnum<TEnum>(string? value, TEnum fallback) where TEnum : struct, Enum =>
        Enum.TryParse<TEnum>(value, true, out var parsed) ? parsed : fallback;

    /// <summary>Return all enum names.</summary>
    public static List<string> EnumNames<TEnum>() where TEnum : struct, Enum =>
        Enum.GetNames(typeof(TEnum)).ToList();

    // ---------------------------
    // 🧮 Data Validation (86-90)
    // ---------------------------

    /// <summary>Check that a string is present.</summary>
    public static bool IsPresent(string? value) => !string.IsNullOrWhiteSpace(value);

    /// <summary>Throw when a required string is missing.</summary>
    public static string MustBePresent(string? value, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException($"{fieldName} must be present.", fieldName);

        return value;
    }

    /// <summary>Trim all string values in a sequence.</summary>
    public static List<string> TrimAllStrings(IEnumerable<string?> values) =>
        values.Select(v => v?.Trim() ?? string.Empty).ToList();

    /// <summary>Check an object against a list of rules.</summary>
    public static bool IsValid<T>(T value, params Func<T, bool>[] rules) => rules.All(rule => rule(value));

    /// <summary>Return validation errors for failed rules.</summary>
    public static List<string> Validate<T>(T value, params (string Error, Func<T, bool> Rule)[] rules) =>
        rules.Where(rule => !rule.Rule(value)).Select(rule => rule.Error).ToList();

    // ---------------------------
    // 🌍 Config & Env Vars (91-95)
    // ---------------------------

    /// <summary>Get an environment variable with optional fallback.</summary>
    public static string GetEnv(string key, string? fallback = null) =>
        Environment.GetEnvironmentVariable(key) ?? fallback ?? string.Empty;

    /// <summary>Return true when an environment variable is present.</summary>
    public static bool HasEnv(string key) => !string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable(key));

    /// <summary>Get the current environment name using common .NET keys.</summary>
    public static string CurrentEnv() =>
        GetEnv("ASPNETCORE_ENVIRONMENT", GetEnv("DOTNET_ENVIRONMENT", "Production"));

    /// <summary>Load simple KEY=VALUE pairs from text lines.</summary>
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

    /// <summary>Require a non-empty environment variable.</summary>
    public static string RequireEnv(string key)
    {
        var value = Environment.GetEnvironmentVariable(key);
        if (string.IsNullOrWhiteSpace(value))
            throw new InvalidOperationException($"Missing required environment variable: {key}");

        return value;
    }

    // ---------------------------
    // 🧠 Meta & Caching (96-100)
    // ---------------------------

    private static readonly Dictionary<string, object?> CacheStore = new(StringComparer.Ordinal);

    /// <summary>Return a cached value or create and store it.</summary>
    public static T Memoize<T>(string key, Func<T> factory)
    {
        if (CacheStore.TryGetValue(key, out var cached) && cached is T existing)
            return existing;

        var created = factory();
        CacheStore[key] = created;
        return created;
    }

    /// <summary>Store a value in cache.</summary>
    public static void SetCache<T>(string key, T value) => CacheStore[key] = value;

    /// <summary>Get a value from cache if present.</summary>
    public static T? InCache<T>(string key) =>
        CacheStore.TryGetValue(key, out var cached) && cached is T typed ? typed : default;

    /// <summary>Remove a single cache entry.</summary>
    public static bool ClearCache(string key) => CacheStore.Remove(key);

    /// <summary>Remove all cache entries.</summary>
    public static void ClearAllCache() => CacheStore.Clear();
}
