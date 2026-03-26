using System.Buffers;
using System.Diagnostics;
using System.Reflection;
using System.Runtime.ExceptionServices;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace MillionDollarDotnetSnippets;

public static class Phase2Snippets
{
    public static async Task WhenAll(params Task[] tasks) => await Task.WhenAll(tasks);

    public static async Task<T[]> WhenAll<T>(params Task<T>[] tasks) => await Task.WhenAll(tasks);

    public static async Task Delay(int ms, CancellationToken token) => await Task.Delay(ms, token);

    public static async Task<T> RetryAsync<T>(Func<Task<T>> func, int attempts = 3)
    {
        for (var i = 0; i < attempts; i++)
        {
            try
            {
                return await func();
            }
            catch when (i < attempts - 1)
            {
                await Task.Delay(200);
            }
        }

        throw new InvalidOperationException("Max retry attempts reached.");
    }

    public static void FireAndForget(Task task, Action<Exception>? onError = null)
    {
        _ = Task.Run(async () =>
        {
            try
            {
                await task;
            }
            catch (Exception ex)
            {
                onError?.Invoke(ex);
            }
        });
    }

    public static RouteHandlerBuilder MapGet<T>(WebApplication app, string route, Func<T> handler) =>
        app.MapGet(route, () => handler());

    public static RouteHandlerBuilder MapPost<TIn, TOut>(WebApplication app, string route, Func<TIn, TOut> handler) =>
        app.MapPost(route, (TIn input) => handler(input));

    public static void EnableSwagger(WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        InvokeSwaggerExtension(builder.Services, "AddSwaggerGen");
    }

    public static void UseSwaggerDocs(WebApplication app)
    {
        InvokeSwaggerExtension(app, "UseSwagger");
        InvokeSwaggerExtension(app, "UseSwaggerUI");
    }

    public static IResult Problem(Exception ex) => Results.Problem(ex.Message);

    public static ReadOnlySpan<char> AsSpan(this string value) => value.AsSpan();

    public static int ParseInt(ReadOnlySpan<char> span) => int.Parse(span);

    public static string SpanToString(ReadOnlySpan<char> span) => new(span);

    public static List<ReadOnlyMemory<char>> FastSplit(this string value, char separator)
    {
        var memory = value.AsMemory();
        var parts = new List<ReadOnlyMemory<char>>();
        var start = 0;

        for (var i = 0; i < value.Length; i++)
        {
            if (value[i] != separator)
                continue;

            parts.Add(memory.Slice(start, i - start));
            start = i + 1;
        }

        parts.Add(memory[start..]);
        return parts;
    }

    public static byte[] RentBuffer(int size) => ArrayPool<byte>.Shared.Rent(size);

    public static T TryOr<T>(Func<T> tryFunc, T fallback)
    {
        try
        {
            return tryFunc();
        }
        catch
        {
            return fallback;
        }
    }

    public static void LogAndThrow(Exception ex, Action<string> log)
    {
        log(ex.Message);
        ExceptionDispatchInfo.Capture(ex).Throw();
    }

    public static (bool Success, T? Result) TryWrap<T>(Func<T> func)
    {
        try
        {
            return (true, func());
        }
        catch
        {
            return (false, default);
        }
    }

    public static string ExceptionDetails(Exception ex) =>
        $"{ex.GetType().Name}: {ex.Message}{Environment.NewLine}{ex.StackTrace}";

    public static T ThrowIfNull<T>(T? obj, string msg) => obj ?? throw new ArgumentNullException(msg);

    public static TimeSpan Time(Action action)
    {
        var sw = Stopwatch.StartNew();
        action();
        sw.Stop();
        return sw.Elapsed;
    }

    public static void LogTime(Action action, Action<string> log)
    {
        var sw = Stopwatch.StartNew();
        action();
        sw.Stop();
        log($"Elapsed: {sw.ElapsedMilliseconds}ms");
    }

    public static void LogAround(string label, Action<string> log, Action action)
    {
        log($"[START] {label}");
        action();
        log($"[END] {label}");
    }

    public static Action<T> GetLogger<T>(Action<string> log, string label) => value => log($"{label}: {value}");

    public static void LogJson<T>(T obj, Action<string> log) =>
        log(JsonSerializer.Serialize(obj, new JsonSerializerOptions { WriteIndented = true }));

    private static void InvokeSwaggerExtension(object target, string methodName)
    {
        var extensionMethod = AppDomain.CurrentDomain
            .GetAssemblies()
            .Where(a => a.GetName().Name?.Contains("Swagger", StringComparison.OrdinalIgnoreCase) == true)
            .SelectMany(a => a.GetTypes())
            .Where(t => t.IsSealed && t.IsAbstract)
            .SelectMany(t => t.GetMethods(BindingFlags.Public | BindingFlags.Static))
            .FirstOrDefault(m =>
                m.Name == methodName &&
                m.GetParameters().Length == 1 &&
                m.GetParameters()[0].ParameterType.IsInstanceOfType(target));

        extensionMethod?.Invoke(null, new[] { target });
    }
}
