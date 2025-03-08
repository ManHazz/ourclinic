using backend.excel;
using ClosedXML.Excel;

public class Employee : ExcelBase
{
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Shift { get; set; } = string.Empty; // Day or Night
    public string Day { get; set; } = string.Empty; // Monday-Sunday
    public string Age { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;

    public override string GetFilePath()
    {
        string relativePath = Path.Combine("..", "backend", "excel", "employee-db.xlsx");
        string fullPath = Path.GetFullPath(relativePath);
        return fullPath;
    }

    public static List<Employee> GetAllEmployees()
    {
        Employee instance = new Employee();
        List<Employee> employees = new List<Employee>();
        string filePath = instance.GetFilePath();

        using (var workbook = new XLWorkbook(filePath))
        {
            var worksheet = workbook.Worksheet(1);
            var rows = worksheet.RangeUsed().RowsUsed().Skip(1); // Skip header

            foreach (var row in rows)
            {
                employees.Add(new Employee
                {
                    Day = row.Cell(1).GetString(),
                    Shift = row.Cell(2).GetString(),
                    Role = row.Cell(3).GetString(),
                    Name = row.Cell(4).GetString(),
                    Age = row.Cell(5).GetString(),
                    PhoneNumber = row.Cell(6).GetString(),
                    
                    
                });
            }
        }
        return employees;
    }
}
