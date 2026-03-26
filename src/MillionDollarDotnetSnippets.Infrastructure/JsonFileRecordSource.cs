using System.Text.Json;
using MillionDollarDotnetSnippets.Core;

namespace MillionDollarDotnetSnippets.Infrastructure;

public sealed class JsonFileRecordSource : IRecordSource
{
    private readonly string _path;

    public JsonFileRecordSource(string path)
    {
        _path = path;
    }

    public async Task<IReadOnlyList<WorkRecord>> LoadAsync(CancellationToken cancellationToken = default)
    {
        await using var stream = File.OpenRead(_path);
        var records = await JsonSerializer.DeserializeAsync<List<WorkRecord>>(stream, cancellationToken: cancellationToken);
        return records ?? new List<WorkRecord>();
    }
}
