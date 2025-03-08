
using System;
using System.IO;
using OfficeOpenXml;


class ExcelEditor
{
    static void AddFeedback()
    {
        // Set the path to your Excel file
        string filePath = "./excel/feedback-db.xlsx";

        // Check if the file exists
        if (!File.Exists(filePath))
        {
            Console.WriteLine("Excel file not found.");
            return;
        }

        // Load the Excel file
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        using (ExcelPackage package = new ExcelPackage(new FileInfo(filePath)))
        {
            // Get the first worksheet
            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];

            // Find the last used row (assuming column 1 always has data)
            int lastRow = worksheet.Dimension?.End.Row ?? 1; 
            int newRow = lastRow + 1; // Next row

            // Get user input for the new row
            Console.Write("Enter Mood: ");
            string mood = Console.ReadLine();

            Console.Write("Enter Description: ");
            string description = Console.ReadLine();

            Console.Write("Enter Verification: ");
            string verification = Console.ReadLine();

            // Insert new data
            worksheet.Cells[newRow, 1].Value = newRow - 1;  // Serial No.
            worksheet.Cells[newRow, 2].Value = mood;
            worksheet.Cells[newRow, 3].Value = description;
            worksheet.Cells[newRow, 4].Value = verification;

            // Force save by using SaveAs()
            package.SaveAs(new FileInfo(filePath));
            Console.WriteLine("New entry added successfully!");
        }
    }
}
