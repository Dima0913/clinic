using MedicalClinicApi.Data;
using MedicalClinicApi.Services;
using Microsoft.EntityFrameworkCore;
using System.Text;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var connectionString = ResolveConnectionString(builder.Configuration, out var usePostgres);

        // Render sets PORT. Make Kestrel listen on it.
        var port = Environment.GetEnvironmentVariable("PORT");
        if (!string.IsNullOrWhiteSpace(port))
        {
            builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
        }

        builder.Services.AddControllers();
        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            if (usePostgres)
            {
                options.UseNpgsql(connectionString);
            }
            else
            {
                options.UseSqlite(connectionString);
            }
        });
        builder.Services.AddScoped<IEmailService, EmailService>();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(options =>
            options.AddDefaultPolicy(policy =>
                policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader()
            )
        );

        var app = builder.Build();

        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseHttpsRedirection();
        app.UseCors();
        app.UseAuthorization();
        app.MapControllers();

        using (var scope = app.Services.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            // Never delete the database on startup; it breaks real bookings persistence.
            context.Database.EnsureCreated();

            if (context.Database.IsNpgsql())
            {
                context.Database.ExecuteSqlRaw(
                    "CREATE UNIQUE INDEX IF NOT EXISTS \"IX_Bookings_BranchId_AppointmentDate_AppointmentTime\" ON \"Bookings\" (\"BranchId\", \"AppointmentDate\", \"AppointmentTime\");"
                );
                context.Database.ExecuteSqlRaw(
                    "INSERT INTO \"Services\" (\"Id\", \"Name\", \"Price\", \"DisplayOrder\", \"DiscountPercentage\") VALUES (5, 'Дитяча хірургія', 0, 5, NULL) ON CONFLICT (\"Id\") DO NOTHING;"
                );
                try { context.Database.ExecuteSqlRaw("ALTER TABLE \"Bookings\" ADD COLUMN IF NOT EXISTS \"CancelToken\" text NOT NULL DEFAULT ''"); } catch { }
                try { context.Database.ExecuteSqlRaw("ALTER TABLE \"Bookings\" ADD COLUMN IF NOT EXISTS \"CancelledAt\" timestamp with time zone NULL"); } catch { }
                try
                {
                    context.Database.ExecuteSqlRaw(
                        "UPDATE \"Bookings\" SET \"CancelToken\" = md5(random()::text || clock_timestamp()::text) WHERE \"CancelToken\" IS NULL OR \"CancelToken\" = '';"
                    );
                }
                catch { }
                try { context.Database.ExecuteSqlRaw("CREATE UNIQUE INDEX IF NOT EXISTS \"IX_Bookings_CancelToken\" ON \"Bookings\" (\"CancelToken\")"); } catch { }
            }
            else
            {
                context.Database.ExecuteSqlRaw(
                    "CREATE UNIQUE INDEX IF NOT EXISTS IX_Bookings_BranchId_AppointmentDate_AppointmentTime ON Bookings (BranchId, AppointmentDate, AppointmentTime);"
                );
                try
                {
                    context.Database.ExecuteSqlRaw(
                        "INSERT OR IGNORE INTO Services (Id, Name, Price, DisplayOrder, DiscountPercentage) VALUES (5, 'Дитяча хірургія', 0, 5, NULL);"
                    );
                }
                catch { }
                try { context.Database.ExecuteSqlRaw("ALTER TABLE Bookings ADD COLUMN CancelToken TEXT NOT NULL DEFAULT ''"); } catch { }
                try { context.Database.ExecuteSqlRaw("ALTER TABLE Bookings ADD COLUMN CancelledAt TEXT NULL"); } catch { }
                try
                {
                    context.Database.ExecuteSqlRaw(
                        "UPDATE Bookings SET CancelToken = lower(hex(randomblob(16))) WHERE CancelToken IS NULL OR CancelToken = '';"
                    );
                }
                catch { }
                try { context.Database.ExecuteSqlRaw("CREATE UNIQUE INDEX IF NOT EXISTS IX_Bookings_CancelToken ON Bookings (CancelToken);"); } catch { }
            }

        }

        app.Run();
    }

    private static string ResolveConnectionString(IConfiguration configuration, out bool usePostgres)
    {
        var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
        if (!string.IsNullOrWhiteSpace(databaseUrl))
        {
            usePostgres = true;
            return BuildPostgresConnectionStringFromUrl(databaseUrl);
        }

        var postgresConnection = configuration.GetConnectionString("PostgresConnection");
        if (!string.IsNullOrWhiteSpace(postgresConnection))
        {
            usePostgres = true;
            return postgresConnection;
        }

        usePostgres = false;
        return configuration.GetConnectionString("DefaultConnection") ?? "Data Source=clinic.db";
    }

    private static string BuildPostgresConnectionStringFromUrl(string databaseUrl)
    {
        // Render provides DATABASE_URL in URL format:
        // postgres://USER:PASSWORD@HOST:PORT/DBNAME
        var uri = new Uri(databaseUrl);
        var userInfoParts = uri.UserInfo.Split(':', 2);
        var username = userInfoParts.Length > 0 ? Uri.UnescapeDataString(userInfoParts[0]) : string.Empty;
        var password = userInfoParts.Length > 1 ? Uri.UnescapeDataString(userInfoParts[1]) : string.Empty;
        var database = uri.AbsolutePath.Trim('/');

        var query = ParseQueryString(uri.Query);
        var sslMode = query.TryGetValue("sslmode", out var sslModeValue) ? sslModeValue : "Require";
        var trustServerCertificate = query.TryGetValue("trust server certificate", out var trustValue)
            ? trustValue
            : "true";

        var sb = new StringBuilder();
        sb.Append($"Host={uri.Host};");
        var port = uri.IsDefaultPort || uri.Port <= 0 ? 5432 : uri.Port;
        sb.Append($"Port={port};");
        sb.Append($"Database={database};");
        sb.Append($"Username={username};");
        sb.Append($"Password={password};");
        sb.Append($"SSL Mode={sslMode};");
        sb.Append($"Trust Server Certificate={trustServerCertificate};");
        return sb.ToString();
    }

    private static Dictionary<string, string> ParseQueryString(string query)
    {
        var result = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        if (string.IsNullOrWhiteSpace(query))
        {
            return result;
        }

        var trimmed = query.TrimStart('?');
        foreach (var pair in trimmed.Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var kv = pair.Split('=', 2);
            var key = Uri.UnescapeDataString(kv[0]).Replace('+', ' ').Trim();
            var value = kv.Length > 1 ? Uri.UnescapeDataString(kv[1]).Replace('+', ' ').Trim() : string.Empty;
            result[key] = value;
        }

        return result;
    }
}
