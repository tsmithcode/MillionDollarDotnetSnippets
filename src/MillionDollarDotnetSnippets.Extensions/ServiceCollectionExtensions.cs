using Microsoft.Extensions.DependencyInjection;
using MillionDollarDotnetSnippets.Application;
using MillionDollarDotnetSnippets.Core;
using MillionDollarDotnetSnippets.Infrastructure;
using MillionDollarDotnetSnippets.RulesEngine;

namespace MillionDollarDotnetSnippets.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGoldenPathDemo(
        this IServiceCollection services,
        string inputPath,
        IReadOnlyList<RuleDefinition> rules,
        params string[] requiredFields)
    {
        services.AddSingleton<IRecordSource>(_ => new JsonFileRecordSource(inputPath));
        services.AddSingleton<IRuleEngine>(_ => new ConfigDrivenRuleEngine(rules));
        services.AddSingleton<IRecordValidator>(_ => BuildValidator(requiredFields));
        services.AddSingleton<GoldenPathOrchestrator>();
        return services;
    }

    public static IServiceCollection AddGoldenPathDemoFromHttpEndpoint(
        this IServiceCollection services,
        Uri baseAddress,
        string path,
        IReadOnlyList<RuleDefinition> rules,
        params string[] requiredFields)
    {
        services.AddSingleton<IRecordSource>(_ =>
        {
            var client = new HttpClient
            {
                BaseAddress = baseAddress
            };

            return new HttpJsonRecordSource(client, path);
        });
        services.AddSingleton<IRuleEngine>(_ => new ConfigDrivenRuleEngine(rules));
        services.AddSingleton<IRecordValidator>(_ => BuildValidator(requiredFields));
        services.AddSingleton<GoldenPathOrchestrator>();
        return services;
    }

    public static IServiceCollection AddGoldenPathDemoFromHttpClient(
        this IServiceCollection services,
        HttpClient httpClient,
        string path,
        IReadOnlyList<RuleDefinition> rules,
        params string[] requiredFields)
    {
        services.AddSingleton<IRecordSource>(_ => new HttpJsonRecordSource(httpClient, path));
        services.AddSingleton<IRuleEngine>(_ => new ConfigDrivenRuleEngine(rules));
        services.AddSingleton<IRecordValidator>(_ => BuildValidator(requiredFields));
        services.AddSingleton<GoldenPathOrchestrator>();
        return services;
    }

    private static IRecordValidator BuildValidator(string[] requiredFields)
    {
        var effectiveFields = requiredFields.Length == 0
            ? ["Status"]
            : requiredFields;

        return new RequiredFieldValidator(effectiveFields);
    }
}
