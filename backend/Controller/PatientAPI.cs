using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/patient")]
public class PatientController : ControllerBase
{
    [HttpGet("search")]
    public IActionResult SearchPatient([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Error: Search name cannot be empty.");
        }

        List<Patient> patients = Patient.SearchPatient(name);

        if (patients.Count == 0)
        {
            return NotFound("No matching patients found.");
        }

        return Ok(patients); // Returns a JSON list of patients
    }
}
