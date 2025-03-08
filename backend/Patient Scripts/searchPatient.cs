using System;
using System.Linq;
using System.Text;
using ClosedXML.Excel;

namespace searchPatient
{
    public class Search
    {
        public static string SearchData(string filepath, string searchName)
        {
            StringBuilder output = new StringBuilder();
    
            // Open the Excel File
            using (var workbook = new XLWorkbook(filepath))
            {
                var worksheet = workbook.Worksheet(1);
                var range = worksheet.RangeUsed();
                bool found = false;

                foreach (var row in range.Rows().Skip(1)) // Skipping header row
                {
                    var firstCell = row.Cell(1).Value.ToString(); // Assuming Name is in the first column
                    if (!string.IsNullOrEmpty(firstCell) && firstCell.Contains(searchName, StringComparison.OrdinalIgnoreCase))
                    {
                        found = true;
                        foreach (var cell in row.Cells())
                        {
                            output.Append(cell.Value + "\t");
                        }
                        output.AppendLine();
                    }
                }

                if (!found)
                {
                    return "No matching records found.";
                }
            }
    
            return output.ToString();
        }
    }
}
