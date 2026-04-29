using MedicalClinicApi.Models;
using MedicalClinicApi.Data;
using Microsoft.EntityFrameworkCore;
using Resend;
using System.Net;

namespace MedicalClinicApi.Services;

public interface IEmailService
{
    Task SendRegistrationNotificationAsync(User user);
    Task SendBookingNotificationAsync(Booking booking);
    Task SendBookingClientEmailAsync(Booking booking);
}

public class EmailService : IEmailService
{
    private readonly string _apiKey;
    private readonly AppDbContext _db;
    private readonly string _adminEmail;
    private readonly string _frontendUrl;

    public EmailService(IConfiguration config, AppDbContext db)
    {
        _apiKey = config["EmailSettings:ResendApiKey"];
        _adminEmail = config["EmailSettings:AdminEmail"];
        _frontendUrl = config["App:FrontendBaseUrl"].TrimEnd('/');
        _db = db;
    }

    private async Task SendEmailAsync(string to, string subject, string html)
    {
        var client = new ResendClient(_apiKey);

        var message = new EmailMessage
        {
            From = $"Clinic <noreply@clinic-app.dev>",
            To = { to },
            Subject = subject,
            Html = html
        };

        await client.EmailSendAsync(message);
    }

    public async Task SendRegistrationNotificationAsync(User user)
    {
        string html = $@"
<h2>Нова реєстрація користувача</h2>
<p><b>ПІБ:</b> {user.Name}</p>
<p><b>Email:</b> {user.Email}</p>
<p><b>Телефон:</b> {WebUtility.HtmlEncode(user.Phone)}</p>
<p><b>Статус:</b> Очікує підтвердження</p>";

        await SendEmailAsync(_adminEmail, "Нова реєстрація користувача", html);
    }

    public async Task SendBookingNotificationAsync(Booking booking)
    {
        var service = await _db.Services.FirstOrDefaultAsync(s => s.Id == booking.ServiceId);
        var branch = await _db.Branches.FirstOrDefaultAsync(b => b.Id == booking.BranchId);

        var serviceName = service?.Name ?? $"Послуга #{booking.ServiceId}";
        var branchTitle = branch is null
            ? $"Філія #{booking.BranchId}"
            : $"{branch.City} — {branch.Address} ({branch.Name})";

        string html = $@"
<h2>Нова заявка на запис</h2>
<p><b>ПІБ:</b> {booking.Name}</p>
<p><b>Телефон:</b> {booking.Phone}</p>
<p><b>Email:</b> {booking.UserEmail}</p>
<p><b>Філія:</b> {branchTitle}</p>
<p><b>Послуга:</b> {serviceName}</p>
<p><b>Дата і час:</b> {booking.AppointmentDate:yyyy-MM-dd} {booking.AppointmentTime:hh\\:mm}</p>
<p><b>Коментар:</b> {booking.Notes}</p>
<p><b>Статус:</b> {booking.Status}</p>";

        await SendEmailAsync(_adminEmail, "Нова заявка на запис", html);
    }

    public async Task SendBookingClientEmailAsync(Booking booking)
    {
        var service = await _db.Services.FirstOrDefaultAsync(s => s.Id == booking.ServiceId);
        var branch = await _db.Branches.FirstOrDefaultAsync(b => b.Id == booking.BranchId);
        var cancelUrl = $"{_frontendUrl}/cancel?token={booking.CancelToken}";

        var serviceName = service?.Name ?? "Послуга";
        var branchTitle = branch?.Name ?? "Філія";

        string html = $@"
<h2>Ваш запис прийнято</h2>
<p><b>Послуга:</b> {serviceName}</p>
<p><b>Філія:</b> {branchTitle}</p>
<p><b>Дата і час:</b> {booking.AppointmentDate:yyyy-MM-dd} {booking.AppointmentTime:hh\\:mm}</p>
<p>Якщо потрібно скасувати запис, скористайтесь посиланням:</p>
<p><a href='{cancelUrl}'>Скасувати запис</a></p>
<p>Або вставте у браузер:<br>{cancelUrl}</p>";

        await SendEmailAsync(booking.UserEmail, "Ваш запис створено", html);
    }
}