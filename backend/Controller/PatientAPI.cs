using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/patient")]
public class PatientController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAllPatients()
    {
        try
        {
            // Fetch all patients from the Excel file
            List<Patient> patients = Patient.GetAllPatients();

            // Check if any patients were found
            if (patients.Count == 0)
            {
                return NotFound("No patients found in the database.");
            }

            // Return the list of patients as JSON
            return Ok(patients);
        }
        catch (FileNotFoundException ex)
        {
            return StatusCode(500, $"Error: Patient database not found. Details: {ex.Message}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: An unexpected error occurred. Details: {ex.Message}");
        }
    }
}