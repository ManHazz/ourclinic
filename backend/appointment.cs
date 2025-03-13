// ClinicLogic.cs - Handles business logic
using System;
using System.Collections.Generic;
using System.Linq;
using ClosedXML.Excel;
using System.IO;

// Base class for Appointment
namespace Apt
{
public class Appointment
{
    public string PatientName { get; set; } = string.Empty;
    public string Doctor { get; set; } = string.Empty;
    public string Day { get; set; } = string.Empty;
    public string TimeSlot { get; set; } = string.Empty;
}

// Derived class for Checkup
public class Checkup : Appointment
{
    public string Illness { get; set; }  // Checkup for illness
}

// Class for scheduling appointments
public class ClinicSchedule
{
    private Dictionary<string, List<Checkup>> schedule = new Dictionary<string, List<Checkup>>();
    private const int MaxAppointmentsPerShift = 5;
    
    public bool BookAppointment(Checkup checkup)
    {
        string key = $"{checkup.Day}_{checkup.TimeSlot}_{checkup.Doctor}";
        
        if (!schedule.ContainsKey(key))
        {
            schedule[key] = new List<Checkup>();
        }
        
        if (schedule[key].Count < MaxAppointmentsPerShift)
        {
            schedule[key].Add(checkup);
            return true;
        }
        return false;
    }
    
    public List<Checkup> GetSchedule()
    {
        return schedule.Values.SelectMany(apptList => apptList).ToList();
    }
}

// Class to load employee schedule from Excel
public class EmployeeScheduleLoader
{
    public static Dictionary<string, List<string>> LoadSchedule(string filePath)
    {
        var schedule = new Dictionary<string, List<string>>();
        
        using (var workbook = new XLWorkbook(filePath))
        {
            var worksheet = workbook.Worksheet(1);
            int rows = worksheet.RowsUsed().Count();
            
            for (int i = 2; i <= rows; i++)
            {
                string doctor = worksheet.Cell(i, 1).GetString();
                string day = worksheet.Cell(i, 2).GetString();
                string timeSlot = worksheet.Cell(i, 3).GetString();
                
                string key = $"{day}_{timeSlot}";
                if (!schedule.ContainsKey(key))
                {
                    schedule[key] = new List<string>();
                }
                schedule[key].Add(doctor);
            }
        }
        return schedule;
    }
}

// Class to load patient illness from Excel
public class PatientIllnessLoader
{
    public static Dictionary<string, string> LoadPatientIllnesses(string filePath)
    {
        var patientIllnesses = new Dictionary<string, string>();
        
        using (var workbook = new XLWorkbook(filePath))
        {
            var worksheet = workbook.Worksheet(1);
            int rows = worksheet.RowsUsed().Count();
            
            for (int i = 2; i <= rows; i++)
            {
                string patientName = worksheet.Cell(i, 1).GetString();
                string illness = worksheet.Cell(i, 2).GetString();
                
                patientIllnesses[patientName] = illness;
            }
        }
        return patientIllnesses;
    }
}
}
