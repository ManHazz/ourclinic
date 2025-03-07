using System;
using System.Text;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () =>
{
    return DisplayData("./excel/patient.xlsx");
});

app.Run();

static string DisplayData(string filepath)
{
    StringBuilder output = new StringBuilder();
    
    // Open the Excel File
    using (var workbook = new XLWorkbook(filepath))
    {
        var worksheet = workbook.Worksheet(1);
        var range = worksheet.RangeUsed();

        foreach (var row in range.Rows())
        {
            foreach (var cell in row.Cells())
            {
                output.Append(cell.Value + "\t");
            }
            output.AppendLine();
        }
    }
    
    return output.ToString();
}
