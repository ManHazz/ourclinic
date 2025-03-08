using OfficeOpenXml;
using System;
using System.IO;

public class Feedback
{
    public required int Id { get; set; }
    public required int Mood { get; set; }
    public required string Description { get; set; }
    public required string Verification { get; set; }

    private static readonly string filePath = "./excel/feedback-db.xlsx"; // Encapsulation

    public static bool SaveToExcel(Feedback feedback, out string errorMessage)
    {
        errorMessage = string.Empty;

        try
        {
            if (!File.Exists(filePath))
            {
                errorMessage = "Excel file not found.";
                return false;
            }

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (ExcelPackage package = new ExcelPackage(new FileInfo(filePath)))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets[0];

                int lastRow = worksheet.Dimension?.End.Row ?? 1;
                int newRow = lastRow + 1;

                worksheet.Cells[newRow, 1].Value = newRow - 1;
                worksheet.Cells[newRow, 2].Value = feedback.Mood;
                worksheet.Cells[newRow, 3].Value = feedback.Description;
                worksheet.Cells[newRow, 4].Value = feedback.Verification;

                package.SaveAs(new FileInfo(filePath));
            }

            return true;
        }
        catch (Exception ex)
        {
            errorMessage = $"Internal server error: {ex.Message}";
            return false;
        }
    }
}
