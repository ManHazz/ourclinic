using OfficeOpenXml;
using backend.excel;

public class Appointment : Patient {
    public string Doctor { get; set; } = string.Empty;
    public string Day { get; set; } = string.Empty; // monday, etc..
    public string TimeSlot { get; set; } = string.Empty; // day/night


    public override string GetFilePath()
    {
        string relativePath = Path.Combine("..", "backend", "excel", "patient-db.xlsx");
        string fullPath = Path.GetFullPath(relativePath);
        Console.WriteLine(fullPath);
        return fullPath;
    }

    public static bool BookAppointment(Appointment appointment, out string errorMessage)
    {
        errorMessage = string.Empty;

        Appointment instance = new Appointment();
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

                worksheet.Cells[newRow, 1].Value = appointment.Name;
                worksheet.Cells[newRow, 2].Value = appointment.Age;
                worksheet.Cells[newRow, 3].Value = appointment.Illness;
                worksheet.Cells[newRow, 4].Value = appointment.Doctor;
                worksheet.Cells[newRow, 5].Value = appointment.TimeSlot;
                worksheet.Cells[newRow, 6].Value = appointment.Day;

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