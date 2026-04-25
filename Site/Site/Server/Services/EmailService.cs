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

    public async Task SendRegistrationNotificationAsync(User user)
    {
        var smtpServer = _configuration["EmailSettings:SmtpServer"];
        var port = int.Parse(_configuration["EmailSettings:Port"] ?? "587");
        var adminEmail = _configuration["EmailSettings:AdminEmail"]!;
        var appPassword = _configuration["EmailSettings:AppPassword"]!;

        var smtpClient = new SmtpClient(smtpServer)
        {
            Port = port,
            Credentials = new NetworkCredential(adminEmail, appPassword),
            EnableSsl = true,
        };

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

Перевірте заявку та підтвердіть (Accepted), якщо все ок.
",
            IsBodyHtml = false,
        };

        mailMessage.To.Add(adminEmail);
        mailMessage.SubjectEncoding = Encoding.UTF8;
        mailMessage.BodyEncoding = Encoding.UTF8;

        await smtpClient.SendMailAsync(mailMessage);
    }

    public async Task SendBookingNotificationAsync(Booking booking)
    {
        var smtpServer = _configuration["EmailSettings:SmtpServer"];
        var port = int.Parse(_configuration["EmailSettings:Port"] ?? "587");
        var adminEmail = _configuration["EmailSettings:AdminEmail"]!;
        var appPassword = _configuration["EmailSettings:AppPassword"]!;

        var smtpClient = new SmtpClient(smtpServer)
        {
            Port = port,
            Credentials = new NetworkCredential(adminEmail, appPassword),
            EnableSsl = true,
        };

        // Load names from DB to ensure correct branch/service in email.
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
Нова заявка на запис:

ПІБ: {booking.Name}
Телефон: {booking.Phone}
Email: {booking.UserEmail}

Філія: {branchTitle}
Послуга: {serviceName}
Дата і час: {booking.AppointmentDate:yyyy-MM-dd} {booking.AppointmentTime:HH\\:mm}

Коментар: {(string.IsNullOrWhiteSpace(booking.Notes) ? "—" : booking.Notes)}
Статус: {booking.Status}

Зв’яжіться з клієнтом для підтвердження.
",

            IsBodyHtml = false,
        };

        mailMessage.To.Add(adminEmail);
        mailMessage.SubjectEncoding = Encoding.UTF8;
        mailMessage.BodyEncoding = Encoding.UTF8;

        await smtpClient.SendMailAsync(mailMessage);
    }

    public async Task SendBookingClientEmailAsync(Booking booking)
    {
        var smtpServer = _configuration["EmailSettings:SmtpServer"];
        var port = int.Parse(_configuration["EmailSettings:Port"] ?? "587");
        var adminEmail = _configuration["EmailSettings:AdminEmail"]!;
        var appPassword = _configuration["EmailSettings:AppPassword"]!;
        var frontendBaseUrl = (_configuration["App:FrontendBaseUrl"] ?? "http://localhost:3000").TrimEnd('/');

        var smtpClient = new SmtpClient(smtpServer)
        {
            Port = port,
            Credentials = new NetworkCredential(adminEmail, appPassword),
            EnableSsl = true,
        };

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
<div style='font-family:Arial,sans-serif;color:#1c212b;line-height:1.5'>
  <h2 style='margin-bottom:12px'>Ваш запис прийнято</h2>
  <p>Дякуємо! Нижче деталі вашого запису:</p>
  <ul style='padding-left:20px'>
    <li><b>ПІБ:</b> {WebUtility.HtmlEncode(booking.Name)}</li>
    <li><b>Філія:</b> {WebUtility.HtmlEncode(branchTitle)}</li>
    <li><b>Послуга:</b> {WebUtility.HtmlEncode(serviceName)}</li>
    <li><b>Дата і час:</b> {booking.AppointmentDate:yyyy-MM-dd} {booking.AppointmentTime:HH\\:mm}</li>
    <li><b>Телефон:</b> {WebUtility.HtmlEncode(booking.Phone)}</li>
  </ul>
  <p>Якщо потрібно відмовитись від запису, натисніть кнопку:</p>
  <p>
    <a href='{WebUtility.HtmlEncode(cancelUrl)}'
       style='display:inline-block;background:#2a5088;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700'>
       Скасувати запис
    </a>
  </p>
  <p style='font-size:12px;color:#5c6575'>Якщо кнопка не працює, відкрийте це посилання: {WebUtility.HtmlEncode(cancelUrl)}</p>
</div>"
        };

        mailMessage.To.Add(booking.UserEmail);
        mailMessage.SubjectEncoding = Encoding.UTF8;
        mailMessage.BodyEncoding = Encoding.UTF8;

        await smtpClient.SendMailAsync(mailMessage);
    }
}

