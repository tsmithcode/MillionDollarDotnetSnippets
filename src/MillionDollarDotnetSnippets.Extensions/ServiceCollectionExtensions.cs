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
        IReadOnlyList<RuleDefinition> rules)
    {
        services.AddSingleton<IRecordSource>(_ => new JsonFileRecordSource(inputPath));
        services.AddSingleton<IRuleEngine>(_ => new ConfigDrivenRuleEngine(rules));
        services.AddSingleton<IRecordValidator>(_ => new RequiredFieldValidator("Status"));
        services.AddSingleton<GoldenPathOrchestrator>();
        return services;
    }
}
