using MedicalClinicApi.Data;
using MedicalClinicApi.Models;
using MedicalClinicApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace MedicalClinicApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _configuration;

    public BookingsController(AppDbContext context, IEmailService emailService, IConfiguration configuration)
    {
        _context = context;
        _emailService = emailService;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] CreateBookingRequest request)
    {
        // Log incoming request
        Console.WriteLine($"Received booking: {System.Text.Json.JsonSerializer.Serialize(request)}");

        if (string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Phone) || string.IsNullOrEmpty(request.UserEmail))
        {
            return BadRequest("Missing required fields: Name, Phone, UserEmail");
        }

        try 
        {
            if (!DateTime.TryParse(request.AppointmentDate, out DateTime date))
            {
                return BadRequest($"Invalid AppointmentDate: {request.AppointmentDate}");
            }

            if (!TimeOnly.TryParse(request.AppointmentTime, out TimeOnly time))
            {
                return BadRequest($"Invalid AppointmentTime: {request.AppointmentTime}. Use HH:mm format like '10:00'");
            }

            // Allowed working times: from 12:30 every 30 minutes until 17:00 (inclusive).
            var workStart = new TimeOnly(12, 30);
            var workEnd = new TimeOnly(17, 0);
            var isHalfHourStep = time.Minute is 0 or 30;
            if (time < workStart || time > workEnd || !isHalfHourStep)
            {
                return BadRequest(new
                {
                    message = "Доступний запис тільки з 12:30 кожні 30 хвилин до 17:00.",
                    allowedStart = workStart.ToString("HH:mm"),
                    allowedEnd = workEnd.ToString("HH:mm")
                });
            }

            if (request.ServiceId <= 0 || request.BranchId <= 0)
            {
                return BadRequest("ServiceId and BranchId must be positive");
            }

            // Sarny branch accepts bookings only by phone call (no online booking).
            if (request.BranchId == 2)
            {
                return BadRequest(new
                {
                    message = "У філії Сарни запис доступний тільки по телефону: 067 328 72 98."
                });
            }

            // Guard against double booking of the same slot (same branch + date + time).
            var requestedDate = date.Date;
            var slotTaken = await _context.Bookings.AnyAsync(b =>
                b.BranchId == request.BranchId
                && b.AppointmentDate == requestedDate
                && b.AppointmentTime == time
                && b.Status != "Cancelled");

            if (slotTaken)
            {
                return Conflict(new
                {
                    message = "Цей час уже зайнятий. Оберіть інший день або час.",
                    date = requestedDate.ToString("yyyy-MM-dd"),
                    time = time.ToString("HH:mm")
                });
            }

            var booking = new Booking
            {
                Name = request.Name.Trim(),
                Phone = request.Phone.Trim(),
                UserEmail = request.UserEmail.Trim(),
                Notes = request.Notes?.Trim() ?? "",
                AppointmentDate = requestedDate,
                AppointmentTime = time,
                ServiceId = request.ServiceId,
                BranchId = request.BranchId,
                Status = "Scheduled",
                CancelToken = Guid.NewGuid().ToString("N")
            };

            _context.Bookings.Add(booking);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // In case of a race condition, DB unique index will throw.
                return Conflict(new
                {
                    message = "Цей час уже зайнятий. Оберіть інший день або час.",
                    date = requestedDate.ToString("yyyy-MM-dd"),
                    time = time.ToString("HH:mm")
                });
            }

            Console.WriteLine($"Booking saved with ID: {booking.Id}");

            // Send notification to admin
            try
            {
                await _emailService.SendBookingNotificationAsync(booking);
                await _emailService.SendBookingClientEmailAsync(booking);
                Console.WriteLine("Email notification sent");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Email send failed: {ex.Message}");
            }

            return Ok(new { message = "Booking created successfully", bookingId = booking.Id, cancelToken = booking.CancelToken });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Booking creation failed: {ex}");
            return StatusCode(500, "Internal server error. Please try again later.");
        }
    }

    [HttpPost("cancel")]
    public async Task<IActionResult> CancelBooking([FromBody] CancelBookingRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.CancelToken))
        {
            return BadRequest(new { message = "Missing CancelToken" });
        }

        var token = request.CancelToken.Trim();
        var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.CancelToken == token);
        if (booking is null)
        {
            return NotFound(new { message = "Запис не знайдено або токен неправильний." });
        }

        if (booking.Status == "Cancelled")
        {
            return Ok(new { message = "Запис уже скасовано." });
        }

        booking.Status = "Cancelled";
        booking.CancelledAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Запис скасовано." });
    }

    [HttpGet("available")]
    public async Task<IActionResult> GetAvailableSlots(
        [FromQuery] int serviceId, 
        [FromQuery] int branchId, 
        [FromQuery] DateTime date)
    {
        var startTime = new TimeOnly(12, 30);
        var endTime = new TimeOnly(17, 0);
        var slots = new List<string>();

        var startOfDay = date.Date;
        var bookedTimes = await _context.Bookings
            .Where(b => b.BranchId == branchId 
                && b.AppointmentDate == startOfDay
                && b.Status != "Cancelled")
            .Select(b => b.AppointmentTime)
            .ToListAsync();

        var bookedSlots = bookedTimes
            .Select(t => t.ToString("HH:mm"))
            .ToHashSet(StringComparer.Ordinal);

        for (var t = startTime; t <= endTime; t = t.AddMinutes(30))
        {
            var timeStr = t.ToString("HH:mm");
            if (!bookedSlots.Contains(timeStr))
            {
                slots.Add(timeStr);
            }
        }

        return Ok(new { serviceId, branchId, date = startOfDay.ToString("yyyy-MM-dd"), availableSlots = slots });
    }

    [HttpGet("admin")]
    public async Task<IActionResult> GetAdminBookings()
    {
        if (!IsAdminAuthorized())
        {
            return Unauthorized(new { message = "Потрібна авторизація адміністратора." });
        }

        var data = await _context.Bookings
            .AsNoTracking()
            .Include(b => b.Service)
            .Include(b => b.Branch)
            .OrderByDescending(b => b.CreatedAt)
            .Select(b => new AdminBookingDto
            {
                Id = b.Id,
                Name = b.Name,
                Phone = b.Phone,
                UserEmail = b.UserEmail,
                AppointmentDate = b.AppointmentDate,
                AppointmentTime = b.AppointmentTime.ToString("HH:mm"),
                ServiceName = b.Service.Name,
                BranchName = b.Branch.City + " — " + b.Branch.Address,
                Status = b.Status,
                CreatedAt = b.CreatedAt,
                CancelledAt = b.CancelledAt
            })
            .ToListAsync();

        return Ok(data);
    }

    [HttpPatch("admin/{id:int}/status")]
    public async Task<IActionResult> UpdateBookingStatus([FromRoute] int id, [FromBody] UpdateBookingStatusRequest request)
    {
        if (!IsAdminAuthorized())
        {
            return Unauthorized(new { message = "Потрібна авторизація адміністратора." });
        }

        var allowed = new[] { "Scheduled", "Confirmed", "Completed", "Cancelled" };
        if (string.IsNullOrWhiteSpace(request.Status) || !allowed.Contains(request.Status))
        {
            return BadRequest(new { message = "Некоректний статус." });
        }

        var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == id);
        if (booking is null)
        {
            return NotFound(new { message = "Запис не знайдено." });
        }

        booking.Status = request.Status;
        booking.CancelledAt = request.Status == "Cancelled" ? DateTime.UtcNow : null;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Статус оновлено." });
    }

    [HttpPost("admin/login")]
    public IActionResult AdminLogin([FromBody] AdminLoginRequest request)
    {
        var adminUser = _configuration["AdminAuth:Username"];
        var adminPass = _configuration["AdminAuth:Password"];
        if (string.IsNullOrWhiteSpace(adminUser) || string.IsNullOrWhiteSpace(adminPass))
        {
            return StatusCode(500, new { message = "Адмін-авторизація не налаштована на сервері." });
        }

        if (request.Username == adminUser && request.Password == adminPass)
        {
            return Ok(new { message = "Успішний вхід." });
        }

        return Unauthorized(new { message = "Неправильний логін або пароль." });
    }

    private bool IsAdminAuthorized()
    {
        var adminUser = _configuration["AdminAuth:Username"];
        var adminPass = _configuration["AdminAuth:Password"];
        if (string.IsNullOrWhiteSpace(adminUser) || string.IsNullOrWhiteSpace(adminPass))
        {
            return false;
        }
        var authHeader = Request.Headers.Authorization.ToString();
        if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        try
        {
            var encoded = authHeader.Substring("Basic ".Length).Trim();
            var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(encoded));
            var sep = decoded.IndexOf(':');
            if (sep <= 0) return false;
            var user = decoded[..sep];
            var pass = decoded[(sep + 1)..];
            return user == adminUser && pass == adminPass;
        }
        catch
        {
            return false;
        }
    }
}

public class CreateBookingRequest
{
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public string AppointmentDate { get; set; } = string.Empty;
    public string AppointmentTime { get; set; } = string.Empty;
    public int ServiceId { get; set; }
    public int BranchId { get; set; }
}

public class CancelBookingRequest
{
    public string CancelToken { get; set; } = string.Empty;
}

public class UpdateBookingStatusRequest
{
    public string Status { get; set; } = string.Empty;
}

public class AdminBookingDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public DateTime AppointmentDate { get; set; }
    public string AppointmentTime { get; set; } = string.Empty;
    public string ServiceName { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? CancelledAt { get; set; }
}

public class AdminLoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

