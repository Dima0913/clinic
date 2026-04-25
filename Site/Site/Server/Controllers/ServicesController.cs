using MedicalClinicApi.Data;
using MedicalClinicApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicalClinicApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServicesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetServices()
    {
        var services = await _context.Services.OrderBy(s => s.DisplayOrder).ToListAsync();
        return Ok(services);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetService(int id)
    {
        var service = await _context.Services.FindAsync(id);
        if (service == null)
        {
            return NotFound();
        }
        return Ok(service);
    }
}
