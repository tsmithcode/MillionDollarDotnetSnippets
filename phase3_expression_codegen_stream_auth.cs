// ---------------------------
// 100 Code Snippets for the 1 Million Dollar .NET 8 Consultant
// Phase 1: Snippets 1–25 (Reflection, Generics, LINQ, JSON, and DI)
// Phase 2: Snippets 26–50 (Async Pipelines, Minimal API, Memory, Errors, Logging)
// Phase 3: Snippets 51–75 (Source Gen, Expressions, CLI, Auth, Streams, Mapping)
// ---------------------------

using System;
using System.Buffers;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

// (Snippets 1–50 unchanged above...)

// ---------------------------
// 🧬 Expression Tree & Dynamic Query (51–55)
// ---------------------------

/// <summary>Create property accessor lambda.</summary>
public static Func<T, object?> CreateGetter<T>(string propName)
{
    var param = Expression.Parameter(typeof(T), "x");
    var body = Expression.Convert(Expression.PropertyOrField(param, propName), typeof(object));
    return Expression.Lambda<Func<T, object?>>(body, param).Compile();
}

/// <summary>Build dynamic predicate.</summary>
public static Func<T, bool> BuildPredicate<T>(string prop, object value)
{
    var param = Expression.Parameter(typeof(T), "x");
    var body = Expression.Equal(Expression.Property(param, prop), Expression.Constant(value));
    return Expression.Lambda<Func<T, bool>>(body, param).Compile();
}

/// <summary>Build property setter lambda.</summary>
public static Action<T, object?> CreateSetter<T>(string propName)
{
    var target = Expression.Parameter(typeof(T));
    var value = Expression.Parameter(typeof(object));
    var converted = Expression.Convert(value, typeof(T).GetProperty(propName)!.PropertyType);
    var body = Expression.Assign(Expression.Property(target, propName), converted);
    return Expression.Lambda<Action<T, object?>>(body, target, value).Compile();
}

/// <summary>Filter list by predicate dynamically.</summary>
public static List<T> FilterByProp<T>(List<T> source, string prop, object value) =>
    source.Where(BuildPredicate<T>(prop, value)).ToList();

/// <summary>Order list by property dynamically.</summary>
public static List<T> OrderByProp<T>(List<T> source, string prop)
{
    var param = Expression.Parameter(typeof(T));
    var body = Expression.Property(param, prop);
    var lambda = Expression.Lambda(body, param);
    var method = typeof(Enumerable).GetMethods()
        .First(m => m.Name == "OrderBy" && m.GetParameters().Length == 2)
        .MakeGenericMethod(typeof(T), body.Type);
    return (List<T>)method.Invoke(null, new object[] { source, lambda })!;
}

// ---------------------------
// 🧵 Source Generation Hooks (56–60)
// ---------------------------

/// <summary>Mark class for generation.</summary>
[AttributeUsage(AttributeTargets.Class)]
public class GenerateMappingAttribute : Attribute { }

/// <summary>Simulated source-gen mapping registration.</summary>
public static void RegisterMappers(Dictionary<string, Func<object, object>> mapRegistry)
{
    mapRegistry["UserDto"] = input => new { Name = input.GetType().GetProperty("Name")?.GetValue(input) };
}

/// <summary>Convert object using named generator.</summary>
public static object MapUsingRegistry(object input, string key, Dictionary<string, Func<object, object>> registry)
{
    return registry[key](input);
}

/// <summary>Simulate partial injection.</summary>
public static string InjectCode(string baseCode, string insert) =>
    baseCode.Replace("// <AUTO-INJECT>", insert);

/// <summary>Simulate template-based code gen.</summary>
public static string GenerateCodeTemplate(string className, IEnumerable<string> props)
{
    var sb = new StringBuilder();
    sb.AppendLine($"public class {className} {{");
    foreach (var p in props) sb.AppendLine($"    public string {p} {{ get; set; }}");
    sb.AppendLine("}");
    return sb.ToString();
}

// ---------------------------
// 🛠️ CLI Console Enhancers (61–65)
// ---------------------------

/// <summary>Write line in color.</summary>
public static void WriteColor(string text, ConsoleColor color)
{
    var old = Console.ForegroundColor;
    Console.ForegroundColor = color;
    Console.WriteLine(text);
    Console.ForegroundColor = old;
}

/// <summary>Prompt for yes/no input.</summary>
public static bool Confirm(string message)
{
    Console.Write($"{message} (y/n): ");
    var input = Console.ReadLine();
    return input?.ToLower() == "y";
}

/// <summary>Draw ASCII box.</summary>
public static void DrawBox(string title)
{
    Console.WriteLine($"+{new string('-', title.Length + 2)}+");
    Console.WriteLine($"| {title} |");
    Console.WriteLine($"+{new string('-', title.Length + 2)}+");
}

/// <summary>Write error to stderr.</summary>
public static void WriteError(string text)
{
    Console.Error.WriteLine($"[ERROR] {text}");
}

/// <summary>Write indented block.</summary>
public static void WriteBlock(string title, IEnumerable<string> lines)
{
    Console.WriteLine(title);
    foreach (var line in lines)
        Console.WriteLine($"  - {line}");
}

// ---------------------------
// 🔐 Auth + Secure Helpers (66–70)
// ---------------------------

/// <summary>Hash string using SHA256.</summary>
public static string Sha256(string text)
{
    using var sha = SHA256.Create();
    var bytes = Encoding.UTF8.GetBytes(text);
    var hash = sha.ComputeHash(bytes);
    return Convert.ToHexString(hash);
}

/// <summary>Generate secure random token.</summary>
public static string SecureToken(int length = 32)
{
    var bytes = RandomNumberGenerator.GetBytes(length);
    return Convert.ToHexString(bytes);
}

/// <summary>Simple password check.</summary>
public static bool CheckPassword(string input, string hash) => Sha256(input) == hash;

/// <summary>Base64 encode text.</summary>
public static string ToBase64(string text) => Convert.ToBase64String(Encoding.UTF8.GetBytes(text));

/// <summary>Base64 decode string.</summary>
public static string FromBase64(string base64) => Encoding.UTF8.GetString(Convert.FromBase64String(base64));

// ---------------------------
// 📂 File & Stream Utilities (71–75)
// ---------------------------

/// <summary>Read all lines from file.</summary>
public static List<string> ReadLines(string path) => File.ReadAllLines(path).ToList();

/// <summary>Write lines to file.</summary>
public static void WriteLines(string path, IEnumerable<string> lines) => File.WriteAllLines(path, lines);

/// <summary>Append single line to file.</summary>
public static void AppendLine(string path, string line) => File.AppendAllText(path, line + Environment.NewLine);

/// <summary>Read stream as string.</summary>
public static async Task<string> ReadStreamAsync(Stream stream)
{
    using var reader = new StreamReader(stream);
    return await reader.ReadToEndAsync();
}

/// <summary>Write string to file async.</summary>
public static async Task WriteTextAsync(string path, string content)
{
    using var writer = new StreamWriter(path);
    await writer.WriteAsync(content);
}
