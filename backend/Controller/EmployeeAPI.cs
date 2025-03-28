using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/employee")]
public class EmployeeController : ControllerBase
{
    [HttpGet("doctors")]
    public ActionResult<IEnumerable<Employee>> GetDoctors()
    {
        var employees = Employee.GetAllEmployees().Where(e => e.Role == "Doctor").ToList();
        if (employees.Count == 0)
        {
            return NotFound("No doctors found.");
        } else {
            return Ok(employees);
        }
    }

    [HttpGet("nurses")]
    public ActionResult<IEnumerable<Employee>> GetNurses()
    {
        var employees = Employee.GetAllEmployees().Where(e => e.Role == "Nurse").ToList();
        if (employees.Count == 0)
        {
            return NotFound("No nurses found.");
        } else {
            return Ok(employees);
        }
    }

    [HttpGet("receptionists")]
    public ActionResult<IEnumerable<Employee>> GetReceptionists()
    {
        var employees = Employee.GetAllEmployees().Where(e => e.Role == "Receptionist").ToList();
        if (employees.Count == 0)
        {
            return NotFound("No receptionists found.");
        } else {
            return Ok(employees);
        }
    }
}
