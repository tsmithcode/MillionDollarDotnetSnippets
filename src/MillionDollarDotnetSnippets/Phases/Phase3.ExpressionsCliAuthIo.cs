using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;

namespace MillionDollarDotnetSnippets;

public static class Phase3Snippets
{
    public static Func<T, object?> CreateGetter<T>(string propName)
    {
        var param = Expression.Parameter(typeof(T), "x");
        var body = Expression.Convert(Expression.PropertyOrField(param, propName), typeof(object));
        return Expression.Lambda<Func<T, object?>>(body, param).Compile();
    }

    public static Func<T, bool> BuildPredicate<T>(string prop, object value)
    {
        var param = Expression.Parameter(typeof(T), "x");
        var body = Expression.Equal(Expression.PropertyOrField(param, prop), Expression.Constant(value));
        return Expression.Lambda<Func<T, bool>>(body, param).Compile();
    }

    public static Action<T, object?> CreateSetter<T>(string propName)
    {
        var target = Expression.Parameter(typeof(T), "target");
        var value = Expression.Parameter(typeof(object), "value");
        var property = typeof(T).GetProperty(propName) ?? throw new InvalidOperationException($"Property '{propName}' not found.");
        var converted = Expression.Convert(value, property.PropertyType);
        var body = Expression.Assign(Expression.Property(target, property), converted);
        return Expression.Lambda<Action<T, object?>>(body, target, value).Compile();
    }

    public static List<T> FilterByProp<T>(List<T> source, string prop, object value) =>
        source.Where(BuildPredicate<T>(prop, value)).ToList();

    public static List<T> OrderByProp<T>(List<T> source, string prop)
    {
        var param = Expression.Parameter(typeof(T), "x");
        var body = Expression.PropertyOrField(param, prop);
        var lambda = Expression.Lambda(body, param);
        var method = typeof(Enumerable).GetMethods()
            .First(m => m.Name == "OrderBy" && m.GetParameters().Length == 2)
            .MakeGenericMethod(typeof(T), body.Type);

        var ordered = (IEnumerable<T>)method.Invoke(null, new object[] { source, lambda.Compile() })!;
        return ordered.ToList();
    }

    [AttributeUsage(AttributeTargets.Class)]
    public sealed class GenerateMappingAttribute : Attribute;

    public static void RegisterMappers(Dictionary<string, Func<object, object>> mapRegistry)
    {
        mapRegistry["UserDto"] = input => new { Name = input.GetType().GetProperty("Name")?.GetValue(input) };
    }

    public static object MapUsingRegistry(object input, string key, Dictionary<string, Func<object, object>> registry) =>
        registry[key](input);

    public static string InjectCode(string baseCode, string insert) =>
        baseCode.Replace("// <AUTO-INJECT>", insert, StringComparison.Ordinal);

    public static string GenerateCodeTemplate(string className, IEnumerable<string> props)
    {
        var builder = new StringBuilder();
        builder.AppendLine($"public class {className} {{");
        foreach (var prop in props)
            builder.AppendLine($"    public string {prop} {{ get; set; }} = string.Empty;");

        builder.AppendLine("}");
        return builder.ToString();
    }

    public static void WriteColor(string text, ConsoleColor color)
    {
        var old = Console.ForegroundColor;
        Console.ForegroundColor = color;
        Console.WriteLine(text);
        Console.ForegroundColor = old;
    }

    public static bool Confirm(string message)
    {
        Console.Write($"{message} (y/n): ");
        var input = Console.ReadLine();
        return string.Equals(input, "y", StringComparison.OrdinalIgnoreCase);
    }

    public static void DrawBox(string title)
    {
        Console.WriteLine($"+{new string('-', title.Length + 2)}+");
        Console.WriteLine($"| {title} |");
        Console.WriteLine($"+{new string('-', title.Length + 2)}+");
    }

    public static void WriteError(string text) => Console.Error.WriteLine($"[ERROR] {text}");

    public static void WriteBlock(string title, IEnumerable<string> lines)
    {
        Console.WriteLine(title);
        foreach (var line in lines)
            Console.WriteLine($"  - {line}");
    }

    public static string Sha256(string text)
    {
        using var sha = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(text);
        var hash = sha.ComputeHash(bytes);
        return Convert.ToHexString(hash);
    }

    public static string SecureToken(int length = 32)
    {
        var bytes = RandomNumberGenerator.GetBytes(length);
        return Convert.ToHexString(bytes);
    }

    public static bool CheckPassword(string input, string hash) => Sha256(input) == hash;

    public static string ToBase64(string text) => Convert.ToBase64String(Encoding.UTF8.GetBytes(text));

    public static string FromBase64(string base64) => Encoding.UTF8.GetString(Convert.FromBase64String(base64));

    public static List<string> ReadLines(string path) => File.ReadAllLines(path).ToList();

    public static void WriteLines(string path, IEnumerable<string> lines) => File.WriteAllLines(path, lines);

    public static void AppendLine(string path, string line) => File.AppendAllText(path, line + Environment.NewLine);

    public static async Task<string> ReadStreamAsync(Stream stream)
    {
        using var reader = new StreamReader(stream);
        return await reader.ReadToEndAsync();
    }

    public static async Task WriteTextAsync(string path, string content)
    {
        await using var writer = new StreamWriter(path);
        await writer.WriteAsync(content);
    }
}
