using ClosedXML.Excel;
using backend.excel;
public class Patient : ExcelBase
{
    public string Name { get; set; } = string.Empty;
    public string Age { get; set; } = string.Empty;
    public string Illness { get; set; } = string.Empty;
    public string Doctor { get; set; } = string.Empty;
    public string TimeSlot { get; set; } = string.Empty;
    public string Day { get; set; } = string.Empty;

    public Patient() { }

    public override string GetFilePath()
    {
        string relativePath = Path.Combine("..", "backend", "excel", "patient-db.xlsx");
        string fullPath = Path.GetFullPath(relativePath);
        return fullPath;
    }

    public static List<Patient> GetAllPatients()
    {
        List<Patient> patients = new List<Patient>();

        Patient instance = new Patient();
        string filepath = instance.GetFilePath();

        // Check if the file exists
        if (!File.Exists(filepath))
        {
            throw new FileNotFoundException("Error: Patient database not found.");
        }

        using (var workbook = new XLWorkbook(filepath))
        {
            var worksheet = workbook.Worksheet(1);
            var range = worksheet.RangeUsed();

            // Check if the worksheet is empty
            if (range == null)
            {
                throw new Exception("Error: Worksheet is empty.");
            }

            // Define column indices (assuming the first row contains headers)
            int nameColumnIndex = 1;  // Column A
            int ageColumnIndex = 2;   // Column B
            int illnessColumnIndex = 3; // Column C
            int doctorColumnIndex = 4; // Column D
            int timeSlotColumnIndex = 5; // Column E
            int dayColumnIndex = 6; // Column F

            // Iterate through all used rows (skip the header row)
            foreach (var row in range.RowsUsed().Skip(1))
            {
                // Create a new Patient object for each row
                Patient patient = new Patient
                {
                    Name = row.Cell(nameColumnIndex).GetString().Trim(),
                    Age = row.Cell(ageColumnIndex).GetString().Trim(),
                    Illness = row.Cell(illnessColumnIndex).GetString().Trim(),
                    Doctor = row.Cell(doctorColumnIndex).GetString().Trim(),
                    TimeSlot = row.Cell(timeSlotColumnIndex).GetString().Trim(),
                    Day = row.Cell(dayColumnIndex).GetString().Trim()
                };

                patients.Add(patient);
            }
        }

        return patients;
    }
}