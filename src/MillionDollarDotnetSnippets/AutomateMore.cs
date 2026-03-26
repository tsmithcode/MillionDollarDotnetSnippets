namespace MillionDollarDotnetSnippets;

public static class AutomateMore
{
    public static Func<T, object?> CreateGetter<T>(string propName) => Phase3Snippets.CreateGetter<T>(propName);

    public static Action<T, object?> CreateSetter<T>(string propName) => Phase3Snippets.CreateSetter<T>(propName);

    public static List<T> OrderByProp<T>(List<T> source, string prop) => Phase3Snippets.OrderByProp(source, prop);

    public static string GenerateCodeTemplate(string className, IEnumerable<string> props) =>
        Phase3Snippets.GenerateCodeTemplate(className, props);

    public static Task<string> ReadStreamAsync(Stream stream) => Phase3Snippets.ReadStreamAsync(stream);

    public static void WriteBlock(string title, IEnumerable<string> lines) => Phase3Snippets.WriteBlock(title, lines);
}
