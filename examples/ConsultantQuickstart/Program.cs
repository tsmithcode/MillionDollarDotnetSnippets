using MillionDollarDotnetSnippets;

var beltRows = new List<BeltRow>
{
    new("B-100", "Fab", "12.5", "true"),
    new("B-200", "Fab", "18.75", "false"),
    new("B-300", "Assembly", "12.5", "true")
};

var groupedByDepartment = Phase1Snippets.GroupByKey(beltRows, row => row.Department);
var activeRows = beltRows.Where(row => Phase4Snippets.ParseBoolSafe(row.IsActive)).ToList();
var laborBySku = activeRows.ToDictionary(
    row => row.Sku,
    row => Phase4Snippets.ParseDecimalSafe(row.LaborHours));

var onboardingToken = Phase3Snippets.SecureToken(12);
var environment = Phase4Snippets.CurrentEnv();

Console.WriteLine("MillionDollarDotnetSnippets Quickstart");
Console.WriteLine($"Environment: {environment}");
Console.WriteLine($"Departments: {string.Join(", ", groupedByDepartment.Keys)}");
Console.WriteLine($"Labor hours tracked: {laborBySku.Sum(x => x.Value):0.##}");
Console.WriteLine($"Sample onboarding token: {onboardingToken}");

internal sealed record BeltRow(string Sku, string Department, string LaborHours, string IsActive);
