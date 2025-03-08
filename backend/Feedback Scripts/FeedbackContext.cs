using OfficeOpenXml;
using backend.excel;

public class Feedback : ExcelBase
{
    public string Mood { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Verification { get; set; } = string.Empty;

    public Feedback() { }

    public override string GetFilePath()
    {
        string relativePath = Path.Combine("..", "backend", "excel", "feedback-db.xlsx");
        string fullPath = Path.GetFullPath(relativePath);
        return fullPath;
    }


    public static bool SaveToExcel(Feedback feedback, out string errorMessage)
    {
        errorMessage = string.Empty;

        Feedback instance = new Feedback();
        string filePath = instance.GetFilePath();

        try
        {
            if (!File.Exists(filePath))
            {
                errorMessage = "Excel does not exist";
                errorMessage = filePath;
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
