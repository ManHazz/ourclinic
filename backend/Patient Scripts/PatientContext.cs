using ClosedXML.Excel;
using backend.excel;

public class Patient : ExcelBase
{
    public string Name { get; set; } = string.Empty;
    public string Age { get; set; } = string.Empty;
    public string Illness { get; set; } = string.Empty;

    public Patient() { }

    public override string GetFilePath()
    {
        string relativePath = Path.Combine("..", "backend", "excel", "patient-db.xlsx");
        string fullPath = Path.GetFullPath(relativePath);
        return fullPath;
    }


    public static List<Patient> SearchPatient(string searchName)
    {
        List<Patient> foundPatients = new List<Patient>();

        Patient instance = new Patient();
        string filepath = instance.GetFilePath();

        if (!File.Exists(filepath))
        {
            throw new FileNotFoundException("Error: Patient database not found.");
        }

        using (var workbook = new XLWorkbook(filepath))
        {
            var worksheet = workbook.Worksheet(1);
            var range = worksheet.RangeUsed();

            if (range == null)
            {
                throw new Exception("Error: Worksheet is empty.");
            }

            int nameColumnIndex = 1;  
            int illnessColumnIndex = 3;
            int ageColumnIndex = 2;   

            foreach (var row in range.RowsUsed().Skip(1))
            {
                var name = row.Cell(nameColumnIndex).GetString().Trim();
                if (!string.IsNullOrEmpty(name) && name.Contains(searchName, StringComparison.OrdinalIgnoreCase))
                {
                    // Create and store the matched Patient record
                    Patient patient = new Patient
                    {
                        Name = name,
                        Age = row.Cell(ageColumnIndex).GetString().Trim(),
                        Illness = row.Cell(illnessColumnIndex).GetString().Trim()
                    };

                    foundPatients.Add(patient);
                }
            }
        }

        return foundPatients;
    }
}
