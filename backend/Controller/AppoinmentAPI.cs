using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/appointment")]
public class AppointmentController : ControllerBase
{
    [HttpPost("book")]
    public IActionResult SaveAppointment([FromBody] Appointment appointment)
    {
        if (appointment == null)
        {
            return BadRequest("Invalid appointment data.");
        }

        if (Appointment.BookAppointment(appointment, out string errorMessage))
        {
            return Ok(new { message = "Appointment added successfully!" });
        }
        else
        {
            return StatusCode(500, errorMessage);
        }
    }
}
