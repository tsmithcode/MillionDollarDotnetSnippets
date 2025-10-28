// ---------------------------
// 100 Code Snippets for the 1 Million Dollar .NET 8 Consultant
// Phase 1: Snippets 1–25 (Reflection, Generics, LINQ, JSON, and DI)
// ---------------------------

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json;

// ---------------------------
// 🔁 Reflection + Generics (1–10)
// ---------------------------

/// <summary>Create instance of generic type T.</summary>
public static T Create<T>() where T : new() => new();

/// <summary>Instantiate type by full name.</summary>
public static object? CreateByName(string fullName) =>
    Activator.CreateInstance(Type.GetType(fullName) ?? throw new("Type not found"));

/// <summary>Get all types that implement interface T.</summary>
public static List<Type> GetTypesImplementing<T>() =>
    AppDomain.CurrentDomain.GetAssemblies()
        .SelectMany(a => a.GetTypes())
        .Where(t => typeof(T).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
        .ToList();

/// <summary>Set property by name using reflection.</summary>
public static void SetProp(object obj, string prop, object? value) =>
    obj.GetType().GetProperty(prop)?.SetValue(obj, value);

/// <summary>Get property value by name.</summary>
public static object? GetProp(object obj, string prop) =>
    obj.GetType().GetProperty(prop)?.GetValue(obj);

/// <summary>Map matching properties from source to target.</summary>
public static void MapProps(object source, object target)
{
    var src = source.GetType().GetProperties();
    var tgt = target.GetType().GetProperties();
    foreach (var p in src)
    {
        var match = tgt.FirstOrDefault(x => x.Name == p.Name && x.PropertyType == p.PropertyType);
        if (match != null) match.SetValue(target, p.GetValue(source));
    }
}

/// <summary>Get public property names of an object.</summary>
public static List<string> GetPropNames(object obj) =>
    obj.GetType().GetProperties().Select(p => p.Name).ToList();

/// <summary>Build generic type at runtime.</summary>
public static Type MakeGeneric(Type genericType, params Type[] args) =>
    genericType.MakeGenericType(args);

/// <summary>Scan and invoke method dynamically.</summary>
public static object? InvokeMethod(object target, string method, params object[] parameters)
{
    var mi = target.GetType().GetMethod(method);
    return mi?.Invoke(target, parameters);
}

/// <summary>Check if object has property.</summary>
public static bool HasProp(object obj, string name) =>
    obj.GetType().GetProperty(name) != null;

// ---------------------------
// ⚡ LINQ Power Moves (11–18)
// ---------------------------

/// <summary>Group by key selector.</summary>
public static Dictionary<TKey, List<T>> GroupByKey<T, TKey>(List<T> list, Func<T, TKey> key)
    where TKey : notnull => list.GroupBy(key).ToDictionary(g => g.Key, g => g.ToList());

/// <summary>Project and flatten collection.</summary>
public static List<TResult> SelectManyFlatten<T, TResult>(List<T> list, Func<T, IEnumerable<TResult>> selector) =>
    list.SelectMany(selector).ToList();

/// <summary>Safe ToDictionary with duplicate handling.</summary>
public static Dictionary<TKey, T> SafeToDictionary<T, TKey>(List<T> list, Func<T, TKey> key)
    where TKey : notnull => list.GroupBy(key).ToDictionary(g => g.Key, g => g.First());

/// <summary>Left join two lists by key.</summary>
public static List<TResult> LeftJoin<T1, T2, TKey, TResult>(
    List<T1> list1, List<T2> list2,
    Func<T1, TKey> key1, Func<T2, TKey> key2,
    Func<T1, T2?, TResult> result)
{
    return list1.Select(i1 =>
        result(i1, list2.FirstOrDefault(i2 => EqualityComparer<TKey>.Default.Equals(key1(i1), key2(i2))))).ToList();
}

/// <summary>Aggregate numeric property.</summary>
public static decimal SumByProp<T>(List<T> list, string prop)
{
    return list.Sum(x => Convert.ToDecimal(x?.GetType().GetProperty(prop)?.GetValue(x) ?? 0));
}

/// <summary>Get distinct values by selector.</summary>
public static List<TValue> DistinctBy<T, TValue>(List<T> list, Func<T, TValue> selector) =>
    list.Select(selector).Distinct().ToList();

/// <summary>Find duplicates by key selector.</summary>
public static List<T> FindDuplicates<T, TKey>(List<T> list, Func<T, TKey> keySelector)
{
    return list.GroupBy(keySelector).Where(g => g.Count() > 1).SelectMany(g => g).ToList();
}

/// <summary>Zip two collections into tuple.</summary>
public static List<(T1, T2)> ZipToTuple<T1, T2>(List<T1> l1, List<T2> l2) =>
    l1.Zip(l2, (a, b) => (a, b)).ToList();

// ---------------------------
// 🚀 JSON + Dictionary Utils (19–22)
// ---------------------------

/// <summary>Serialize to JSON.</summary>
public static string ToJson<T>(T obj) => JsonSerializer.Serialize(obj);

/// <summary>Deserialize from JSON.</summary>
public static T? FromJson<T>(string json) => JsonSerializer.Deserialize<T>(json);

/// <summary>Object to dictionary (by props).</summary>
public static Dictionary<string, object?> ToDictionary(object obj) =>
    obj.GetType().GetProperties().ToDictionary(p => p.Name, p => p.GetValue(obj));

/// <summary>Merge two dictionaries.</summary>
public static Dictionary<string, object?> MergeDictionaries(Dictionary<string, object?> d1, Dictionary<string, object?> d2)
{
    foreach (var kv in d2) d1[kv.Key] = kv.Value;
    return d1;
}

// ---------------------------
// 🧱 Dependency Injection (23–25)
// ---------------------------

/// <summary>Register all implementations of interface as transient.</summary>
public static void RegisterAll<TInterface>(IServiceCollection services)
{
    var types = GetTypesImplementing<TInterface>();
    foreach (var type in types)
        services.AddTransient(typeof(TInterface), type);
}

/// <summary>Register concrete as singleton by generic type.</summary>
public static void AddSingletonByType(IServiceCollection services, Type serviceType)
{
    services.AddSingleton(serviceType);
}

/// <summary>Resolve service dynamically.</summary>
public static object? ResolveService(IServiceProvider provider, Type type)
{
    return provider.GetService(type);
}
