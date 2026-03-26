// ---------------------------
// 100 Code Snippets for the 1 Million Dollar .NET 8 Consultant
// Phase 2: Snippets 26-50 (Async Pipelines, Minimal API, Memory, Errors, Logging)
// ---------------------------

using System;
using System.Buffers;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace MillionDollarDotnetSnippets;

public static class Phase2Snippets
{
    // ---------------------------
    // ⚙️ Async Pipelines & Tasks (26-30)
    // ---------------------------

    /// <summary>Run a list of tasks in parallel and wait for all.</summary>
    public static async Task WhenAll(params Task[] tasks) => await Task.WhenAll(tasks);

    /// <summary>Run tasks with result and return array.</summary>
    public static async Task<T[]> WhenAll<T>(params Task<T>[] tasks) => await Task.WhenAll(tasks);

    /// <summary>Delay with cancellation token support.</summary>
    public static async Task Delay(int ms, CancellationToken token) => await Task.Delay(ms, token);

    /// <summary>Execute function with retry.</summary>
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

    /// <summary>Fire and forget with exception logging.</summary>
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

    // ---------------------------
    // 🧩 Minimal API Utilities (31-35)
    // ---------------------------

    /// <summary>Configure GET endpoint.</summary>
    public static RouteHandlerBuilder MapGet<T>(WebApplication app, string route, Func<T> handler) =>
        app.MapGet(route, () => handler());

    /// <summary>Configure POST endpoint with input/output.</summary>
    public static RouteHandlerBuilder MapPost<TIn, TOut>(WebApplication app, string route, Func<TIn, TOut> handler) =>
        app.MapPost(route, (TIn input) => handler(input));

    /// <summary>Add endpoint discovery and call Swagger registration if available.</summary>
    public static void EnableSwagger(WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        InvokeSwaggerExtension(builder.Services, "AddSwaggerGen");
    }

    /// <summary>Enable Swagger middleware when the relevant package is available.</summary>
    public static void UseSwaggerDocs(WebApplication app)
    {
        InvokeSwaggerExtension(app, "UseSwagger");
        InvokeSwaggerExtension(app, "UseSwaggerUI");
    }

    /// <summary>Return problem result from error.</summary>
    public static IResult Problem(Exception ex) => Results.Problem(ex.Message);

    // ---------------------------
    // 🧠 Memory & Performance (36-40)
    // ---------------------------

    /// <summary>Convert string to span for perf ops.</summary>
    public static ReadOnlySpan<char> AsSpan(this string s) => s.AsSpan();

    /// <summary>Parse int from ReadOnlySpan.</summary>
    public static int ParseInt(ReadOnlySpan<char> span) => int.Parse(span);

    /// <summary>Copy buffer into new string.</summary>
    public static string SpanToString(ReadOnlySpan<char> span) => new(span);

    /// <summary>Split into read-only slices backed by the original string.</summary>
    public static List<ReadOnlyMemory<char>> FastSplit(this string value, char sep)
    {
        var memory = value.AsMemory();
        var parts = new List<ReadOnlyMemory<char>>();
        var start = 0;

        for (var i = 0; i < value.Length; i++)
        {
            if (value[i] != sep)
                continue;

            parts.Add(memory.Slice(start, i - start));
            start = i + 1;
        }

        parts.Add(memory[start..]);
        return parts;
    }

    /// <summary>Rent a buffer from ArrayPool.</summary>
    public static byte[] RentBuffer(int size) => ArrayPool<byte>.Shared.Rent(size);

    // ---------------------------
    // ❌ Exception Handling (41-45)
    // ---------------------------

    /// <summary>Try-catch wrapper with fallback.</summary>
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

    /// <summary>Log exception and rethrow.</summary>
    public static void LogAndThrow(Exception ex, Action<string> log)
    {
        log(ex.Message);
        throw ex;
    }

    /// <summary>Wrap function and return error-safe result.</summary>
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

    /// <summary>Capture detailed exception info.</summary>
    public static string ExceptionDetails(Exception ex) =>
        $"{ex.GetType().Name}: {ex.Message}{Environment.NewLine}{ex.StackTrace}";

    /// <summary>Throw if null.</summary>
    public static T ThrowIfNull<T>(T? obj, string msg) => obj ?? throw new ArgumentNullException(msg);

    // ---------------------------
    // 📋 Logging + Timing (46-50)
    // ---------------------------

    /// <summary>Basic stopwatch timer.</summary>
    public static TimeSpan Time(Action action)
    {
        var sw = Stopwatch.StartNew();
        action();
        sw.Stop();
        return sw.Elapsed;
    }

    /// <summary>Log elapsed time for action.</summary>
    public static void LogTime(Action action, Action<string> log)
    {
        var sw = Stopwatch.StartNew();
        action();
        sw.Stop();
        log($"Elapsed: {sw.ElapsedMilliseconds}ms");
    }

    /// <summary>Wrap log start/end with action.</summary>
    public static void LogAround(string label, Action<string> log, Action action)
    {
        log($"[START] {label}");
        action();
        log($"[END] {label}");
    }

    /// <summary>Inline logger function.</summary>
    public static Action<T> GetLogger<T>(Action<string> log, string label) =>
        value => log($"{label}: {value}");

    /// <summary>Log object as formatted JSON.</summary>
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
