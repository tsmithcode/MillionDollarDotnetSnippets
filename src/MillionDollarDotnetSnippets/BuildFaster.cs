using Microsoft.Extensions.DependencyInjection;

namespace MillionDollarDotnetSnippets;

public static class BuildFaster
{
    public static object? CreateByName(string fullName) => Phase1Snippets.CreateByName(fullName);

    public static void MapProps(object source, object target) => Phase1Snippets.MapProps(source, target);

    public static Dictionary<TKey, List<T>> GroupByKey<T, TKey>(List<T> list, Func<T, TKey> key)
        where TKey : notnull =>
        Phase1Snippets.GroupByKey(list, key);

    public static Dictionary<TKey, T> SafeToDictionary<T, TKey>(List<T> list, Func<T, TKey> key)
        where TKey : notnull =>
        Phase1Snippets.SafeToDictionary(list, key);

    public static string ToJson<T>(T obj) => Phase1Snippets.ToJson(obj);

    public static void RegisterAll<TInterface>(IServiceCollection services) => Phase1Snippets.RegisterAll<TInterface>(services);
}
