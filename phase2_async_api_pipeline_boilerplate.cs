// ---------------------------
// 100 Code Snippets for the 1 Million Dollar .NET 8 Consultant
// Phase 1: Snippets 1–25 (Reflection, Generics, LINQ, JSON, and DI)
// Phase 2: Snippets 26–50 (Async Pipelines, Minimal API, Memory, Errors, Logging)
// ---------------------------

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Buffers;
using System.Diagnostics;

// (Snippets 1–25 unchanged above...)

// ---------------------------
// ⚙️ Async Pipelines & Tasks (26–30)
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
    for (int i = 0; i < attempts; i++)
    {
        try { return await func(); }
        catch when (i < attempts - 1) { await Task.Delay(200); }
    }
    throw new Exception("Max retry attempts reached.");
}

/// <summary>Fire and forget with exception logging.</summary>
public static void FireAndForget(Task task, Action<Exception>? onError = null)
{
    _ = Task.Run(async () =>
    {
        try { await task; }
        catch (Exception ex) { onError?.Invoke(ex); }
    });
}

// ---------------------------
// 🧩 Minimal API Utilities (31–35)
// ---------------------------

/// <summary>Configure GET endpoint.</summary>
public static void MapGet<T>(WebApplication app, string route, Func<T> handler) =>
    app.MapGet(route, () => handler());

/// <summary>Configure POST endpoint with input/output.</summary>
public static void MapPost<TIn, TOut>(WebApplication app, string route, Func<TIn, TOut> handler) =>
    app.MapPost(route, (TIn input) => handler(input));

/// <summary>Add OpenAPI support.</summary>
public static void EnableSwagger(WebApplicationBuilder builder)
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

/// <summary>Enable Swagger middleware.</summary>
public static void UseSwaggerDocs(WebApplication app)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

/// <summary>Return problem result from error.</summary>
public static IResult Problem(Exception ex) => Results.Problem(ex.Message);

// ---------------------------
// 🧠 Memory & Performance (36–40)
// ---------------------------

/// <summary>Convert string to Span for perf ops.</summary>
public static Span<char> AsSpan(this string s) => s.AsSpan();

/// <summary>Parse int from ReadOnlySpan.</summary>
public static int ParseInt(ReadOnlySpan<char> span) => int.Parse(span);

/// <summary>Copy buffer into new string.</summary>
public static string SpanToString(Span<char> span) => new string(span);

/// <summary>Zero-alloc string split using Span.</summary>
public static IEnumerable<ReadOnlySpan<char>> FastSplit(this ReadOnlySpan<char> span, char sep)
{
    int start = 0;
    for (int i = 0; i < span.Length; i++)
    {
        if (span[i] == sep)
        {
            yield return span.Slice(start, i - start);
            start = i + 1;
        }
    }
    yield return span[start..];
}

/// <summary>Rent a buffer from ArrayPool.</summary>
public static byte[] RentBuffer(int size) => ArrayPool<byte>.Shared.Rent(size);

// ---------------------------
// ❌ Exception Handling (41–45)
// ---------------------------

/// <summary>Try-catch wrapper with fallback.</summary>
public static T TryOr<T>(Func<T> tryFunc, T fallback)
{
    try { return tryFunc(); } catch { return fallback; }
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
    try { return (true, func()); } catch { return (false, default); }
}

/// <summary>Capture detailed exception info.</summary>
public static string ExceptionDetails(Exception ex) =>
    $"{ex.GetType().Name}: {ex.Message}\n{ex.StackTrace}";

/// <summary>Throw if null.</summary>
public static T ThrowIfNull<T>(T? obj, string msg) => obj ?? throw new ArgumentNullException(msg);

// ---------------------------
// 📋 Logging + Timing (46–50)
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
public static void LogJson<T>(T obj, Action<string> log)
{
    log(JsonSerializer.Serialize(obj, new JsonSerializerOptions { WriteIndented = true }));
}
