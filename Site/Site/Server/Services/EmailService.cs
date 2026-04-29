using MedicalClinicApi.Models;
using MedicalClinicApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace MedicalClinicApi.Services;

public interface IEmailService
{
    Task SendRegistrationNotificationAsync(User user);
    Task SendBookingNotificationAsync(Booking booking);
    Task SendBookingClientEmailAsync(Booking booking);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _db;

    public EmailService(IConfiguration configuration, AppDbContext db)
    {
        _configuration = configuration;
        _db = db;
    }

    private async Task SendAsync(MailMessage message)
    {
        try
        {
            var smtpServer = _configuration["EmailSettings:SmtpServer"];
            var port = int.Parse(_configuration["EmailSettings:Port"] ?? "587");
            var adminEmail = _configuration["EmailSettings:AdminEmail"]!;
            var appPassword = _configuration["EmailSettings:AppPassword"]!;

            using var smtpClient = new SmtpClient(smtpServer)
            {
                Port = port,
                Credentials = new NetworkCredential(adminEmail, appPassword),
                EnableSsl = true,
            };

            await smtpClient.SendMailAsync(message);
        }
        catch (Exception ex)
        {
            Console.WriteLine("==================================");
            Console.WriteLine("EMAIL ERROR:");
            Console.WriteLine(ex.ToString());
            Console.WriteLine("==================================");
        }
    }

    public async Task SendRegistrationNotificationAsync(User user)
    {
        var adminEmail = _configuration["EmailSettings:AdminEmail"]!;

        var mailMessage = new MailMessage
        {
            From = new MailAddress(adminEmail),
            Subject = "Нова реєстрація користувача (потрібне підтвердження)",
            Body = $@"
Нова реєстрація користувача:

ПІБ: {user.Name}
Email: {user.Email}
Телефон: {user.Phone ?? "—"}
Статус: Очікує підтвердження
",
            IsBodyHtml = false
        };

        mailMessage.To.Add(adminEmail);
        mailMessage.SubjectEncoding = Encoding.UTF8;
        mailMessage.BodyEncoding = Encoding.UTF8;

        await SendAsync(mailMessage);
    }

    public async Task SendBookingNotificationAsync(Booking booking)
    {
        var adminEmail = _configuration["EmailSettings:AdminEmail"]!;

        var service = await _db.Services.AsNoTracking().FirstOrDefaultAsync(s => s.Id == booking.ServiceId);
        var branch = await _db.Branches.AsNoTracking().FirstOrDefaultAsync(b => b.Id == booking.BranchId);

        var serviceName = service?.Name ?? $"Послуга #{booking.ServiceId}";
        var branchTitle = branch is null
            ? $"Філія #{booking.BranchId}"
            : $"{branch.City} — {branch.Address} ({branch.Name})";

        var mailMessage = new MailMessage
        {
            From = new MailAddress(adminEmail),
            Subject = "Нова заявка на запис",
            Body = $@"
Нова заявка:

ПІБ: {booking.Name}
Телефон: {booking.Phone}
Email: {booking.UserEmail}

Філія: {branchTitle}
Послуга: {serviceName}
Дата і час: {booking.AppointmentDate:yyyy-MM-dd} {booking.AppointmentTime:HH\\:mm}

Статус: {booking.Status}
",
            IsBodyHtml = false
        };

        mailMessage.To.Add(adminEmail);
        mailMessage.SubjectEncoding = Encoding.UTF8;
        mailMessage.BodyEncoding = Encoding.UTF8;

        await SendAsync(mailMessage);
    }

    public async Task SendBookingClientEmailAsync(Booking booking)
    {
        var adminEmail = _configuration["EmailSettings:AdminEmail"]!;
        var frontendBaseUrl = (_configuration["App:FrontendBaseUrl"] ?? "http://localhost:3000").TrimEnd('/');

        var service = await _db.Services.AsNoTracking().FirstOrDefaultAsync(s => s.Id == booking.ServiceId);
        var branch = await _db.Branches.AsNoTracking().FirstOrDefaultAsync(b => b.Id == booking.BranchId);

        var serviceName = service?.Name ?? $"Послуга #{booking.ServiceId}";
        var branchTitle = branch is null
            ? $"Філія #{booking.BranchId}"
            : $"{branch.City} — {branch.Address} ({branch.Name})";

        var cancelUrl = $"{frontendBaseUrl}/cancel?token={booking.CancelToken}";

        var mailMessage = new MailMessage
        {
            From = new MailAddress(adminEmail),
            Subject = "Ваш запис створено",
            IsBodyHtml = true,
            Body = $@"
<div style='font-family:Arial'>
  <h2>Ваш запис прийнято</h2>

  <p><b>ПІБ:</b> {booking.Name}</p>
  <p><b>Філія:</b> {branchTitle}</p>
  <p><b>Послуга:</b> {serviceName}</p>
  <p><b>Дата і час:</b> {booking.AppointmentDate:yyyy-MM-dd} {booking.AppointmentTime:HH\\:mm}</p>

  <a href='{cancelUrl}' 
     style='display:inline-block;padding:10px 15px;background:#2a5088;color:white;text-decoration:none;border-radius:6px'>
     Скасувати запис
  </a>
</div>"
        };

        mailMessage.To.Add(booking.UserEmail);
        mailMessage.SubjectEncoding = Encoding.UTF8;
        mailMessage.BodyEncoding = Encoding.UTF8;

        await SendAsync(mailMessage);
    }
}