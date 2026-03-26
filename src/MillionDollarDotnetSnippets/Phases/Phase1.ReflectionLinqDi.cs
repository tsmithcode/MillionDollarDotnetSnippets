using System.Reflection;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;

namespace MillionDollarDotnetSnippets;

public static class Phase1Snippets
{
    public static T Create<T>() where T : new() => new();

    public static object? CreateByName(string fullName) =>
        Activator.CreateInstance(Type.GetType(fullName) ?? throw new InvalidOperationException("Type not found"));

    public static List<Type> GetTypesImplementing<T>() =>
        AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(a => a.GetTypes())
            .Where(t => typeof(T).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
            .ToList();

    public static void SetProp(object obj, string prop, object? value) =>
        obj.GetType().GetProperty(prop)?.SetValue(obj, value);

    public static object? GetProp(object obj, string prop) =>
        obj.GetType().GetProperty(prop)?.GetValue(obj);

    public static void MapProps(object source, object target)
    {
        var sourceProps = source.GetType().GetProperties();
        var targetProps = target.GetType().GetProperties();

        foreach (var property in sourceProps)
        {
            var match = targetProps.FirstOrDefault(x => x.Name == property.Name && x.PropertyType == property.PropertyType);
            if (match != null)
                match.SetValue(target, property.GetValue(source));
        }
    }

    public static List<string> GetPropNames(object obj) =>
        obj.GetType().GetProperties().Select(p => p.Name).ToList();

    public static Type MakeGeneric(Type genericType, params Type[] args) => genericType.MakeGenericType(args);

    public static object? InvokeMethod(object target, string method, params object[] parameters)
    {
        var methodInfo = target.GetType().GetMethod(method);
        return methodInfo?.Invoke(target, parameters);
    }

    public static bool HasProp(object obj, string name) => obj.GetType().GetProperty(name) != null;

    public static Dictionary<TKey, List<T>> GroupByKey<T, TKey>(List<T> list, Func<T, TKey> key)
        where TKey : notnull =>
        list.GroupBy(key).ToDictionary(g => g.Key, g => g.ToList());

    public static List<TResult> SelectManyFlatten<T, TResult>(List<T> list, Func<T, IEnumerable<TResult>> selector) =>
        list.SelectMany(selector).ToList();

    public static Dictionary<TKey, T> SafeToDictionary<T, TKey>(List<T> list, Func<T, TKey> key)
        where TKey : notnull =>
        list.GroupBy(key).ToDictionary(g => g.Key, g => g.First());

    public static List<TResult> LeftJoin<T1, T2, TKey, TResult>(
        List<T1> list1,
        List<T2> list2,
        Func<T1, TKey> key1,
        Func<T2, TKey> key2,
        Func<T1, T2?, TResult> result) =>
        list1.Select(i1 =>
            result(i1, list2.FirstOrDefault(i2 => EqualityComparer<TKey>.Default.Equals(key1(i1), key2(i2))))).ToList();

    public static decimal SumByProp<T>(List<T> list, string prop) =>
        list.Sum(x => Convert.ToDecimal(x?.GetType().GetProperty(prop)?.GetValue(x) ?? 0));

    public static List<TValue> DistinctBy<T, TValue>(List<T> list, Func<T, TValue> selector) =>
        list.Select(selector).Distinct().ToList();

    public static List<T> FindDuplicates<T, TKey>(List<T> list, Func<T, TKey> keySelector) =>
        list.GroupBy(keySelector).Where(g => g.Count() > 1).SelectMany(g => g).ToList();

    public static List<(T1, T2)> ZipToTuple<T1, T2>(List<T1> first, List<T2> second) =>
        first.Zip(second, (a, b) => (a, b)).ToList();

    public static string ToJson<T>(T obj) => JsonSerializer.Serialize(obj);

    public static T? FromJson<T>(string json) => JsonSerializer.Deserialize<T>(json);

    public static Dictionary<string, object?> ToDictionary(object obj) =>
        obj.GetType().GetProperties().ToDictionary(p => p.Name, p => p.GetValue(obj));

    public static Dictionary<string, object?> MergeDictionaries(
        Dictionary<string, object?> left,
        Dictionary<string, object?> right)
    {
        foreach (var pair in right)
            left[pair.Key] = pair.Value;

        return left;
    }

    public static void RegisterAll<TInterface>(IServiceCollection services)
    {
        var types = GetTypesImplementing<TInterface>();
        foreach (var type in types)
            services.AddTransient(typeof(TInterface), type);
    }

    public static void AddSingletonByType(IServiceCollection services, Type serviceType) =>
        services.AddSingleton(serviceType);

    public static object? ResolveService(IServiceProvider provider, Type type) =>
        provider.GetService(type);
}
