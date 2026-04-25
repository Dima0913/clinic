using MedicalClinicApi.Data;
using MedicalClinicApi.Models;
using MedicalClinicApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MedicalClinicApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IEmailService _emailService;

    public UsersController(AppDbContext context, IEmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        {
            return BadRequest("User with this email already exists.");
        }

        var user = new User
        {
            Email = request.Email,
            Name = request.Name,
            Phone = request.Phone,
            Status = UserStatus.Pending
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Send notification to admin
        try
        {
            await _emailService.SendRegistrationNotificationAsync(user);
        }
        catch (Exception ex)
        {
            // Log error, but don't fail registration
            Console.WriteLine($"Email send failed: {ex.Message}");
        }

        return Ok(new { message = "Registration successful. Waiting for admin approval.", userId = user.Id });
    }

    [HttpGet("status/{email}")]
    public async Task<IActionResult> GetStatus(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && !u.IsDeleted);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        return Ok(new 
        { 
            email = user.Email, 
            status = user.Status.ToString(), 
            name = user.Name 
        });
    }
}

public class RegisterRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
}
