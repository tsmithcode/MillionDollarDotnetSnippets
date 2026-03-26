using System.Net.Http.Json;
using MillionDollarDotnetSnippets.Core;

namespace MillionDollarDotnetSnippets.Infrastructure;

public sealed class HttpJsonRecordSource : IRecordSource
{
    private readonly HttpClient _httpClient;
    private readonly string _path;

    public HttpJsonRecordSource(HttpClient httpClient, string path)
    {
        _httpClient = httpClient;
        _path = path;
    }

    public async Task<IReadOnlyList<WorkRecord>> LoadAsync(CancellationToken cancellationToken = default)
    {
        var records = await _httpClient.GetFromJsonAsync<List<WorkRecord>>(_path, cancellationToken);
        return records ?? new List<WorkRecord>();
    }
}
