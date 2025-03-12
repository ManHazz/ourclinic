using System;
using System.Collections.Generic;
using System.Linq;
using ClosedXML.Excel;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

// Base class for Appointment
class Appointment
{
    public string PatientName { get; set; }
    public string Doctor { get; set; }
    public string Day { get; set; }
    public string TimeSlot { get; set; }
}

// Derived class for Checkup
class Checkup : Appointment
{
    public string Illness { get; set; }  // Checkup for illness
}

// Class for scheduling appointments
class ClinicSchedule
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
class EmployeeScheduleLoader
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
class PatientIllnessLoader
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

// Web API Backend
namespace searchAppointment
{
public class search
{
    static void Main(string[] args)
    {
        var availableSchedules = EmployeeScheduleLoader.LoadSchedule("employee-db.xlsx");
        var patientIllnesses = PatientIllnessLoader.LoadPatientIllnesses("patient.xlsx");
        ClinicSchedule clinicSchedule = new ClinicSchedule();
        
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddSingleton(availableSchedules);
        builder.Services.AddSingleton(patientIllnesses);
        builder.Services.AddSingleton(clinicSchedule);
        var app = builder.Build();
        
        app.UseRouting();
        
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapGet("/api/appointments", async context =>
            {
                await context.Response.WriteAsJsonAsync(clinicSchedule.GetSchedule());
            });
            
            endpoints.MapPost("/api/book", async context =>
            {
                var form = await context.Request.ReadFromJsonAsync<Checkup>();
                string scheduleKey = $"{form.Day}_{form.TimeSlot}";
                
                if (patientIllnesses.TryGetValue(form.PatientName, out string illness))
                {
                    form.Illness = illness;
                }
                else
                {
                    form.Illness = "Unknown"; // Default if no illness found
                }
                
                if (availableSchedules.ContainsKey(scheduleKey) && availableSchedules[scheduleKey].Contains(form.Doctor))
                {
                    var success = clinicSchedule.BookAppointment(form);
                    await context.Response.WriteAsJsonAsync(new { success, form.Illness });
                }
                else
                {
                    await context.Response.WriteAsJsonAsync(new { success = false, message = "Invalid appointment selection" });
                }
            });
        });
        
        app.Run();
    }
}
}
