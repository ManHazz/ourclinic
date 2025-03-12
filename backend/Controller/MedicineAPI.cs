using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/medicine")]
public class MedicineController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Medicine>> GetAllMedicine()
    {
        var medicines = Medicine.GetAllMedicine();
        if (medicines.Count == 0)
        {
            return NotFound("No medicines found.");
        } else {
            return Ok(medicines);
        }
    }

    
}