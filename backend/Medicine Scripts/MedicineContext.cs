using backend.excel;
using ClosedXML.Excel;

public class Medicine : ExcelBase
{
    public string Name { get; set; } = string.Empty;
    public string ID { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty; // Tablet, capsule, syrup
    public string Balance { get; set; } = string.Empty; 

    public override string GetFilePath()
    {
        string relativePath = Path.Combine("..", "backend", "excel", "medicine-db.xlsx");
        string fullPath = Path.GetFullPath(relativePath);
        return fullPath;
    }

    public static List<Medicine> GetAllMedicine()
    {
        Medicine instance = new Medicine();
        List<Medicine> medicines = new List<Medicine>();
        string filePath = instance.GetFilePath();

        using (var workbook = new XLWorkbook(filePath))
        {
            var worksheet = workbook.Worksheet(1);
            var rows = worksheet.RangeUsed().RowsUsed().Skip(1); // Skip header

            foreach (var row in rows)
            {
                medicines.Add(new Medicine
                {
                    ID = row.Cell(1).GetString(),
                    Name = row.Cell(2).GetString(),
                    Type = row.Cell(3).GetString(),
                    Balance = row.Cell(4).GetString(),
                });
            }
        }
        return medicines;
    }
}