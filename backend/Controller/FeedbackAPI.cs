using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/feedback")]
public class FeedbackController : ControllerBase // INHERITANCE: FeedbackController inherit from prebuilt class ControllerBase
{
    [HttpPost("add")]
    public IActionResult AddFeedback([FromBody] Feedback feedback)
    {
        if (feedback == null)
        {
            return BadRequest("Invalid feedback data.");
        }

        if (Feedback.SaveToExcel(feedback, out string errorMessage)) // ACCESS MODIFIER: SaveToExcel called from Feedback class
        {
            return Ok(new { message = "Feedback added successfully!" });
        }
        else
        {
            return StatusCode(500, errorMessage);
        }
    }
}
