using MedicalClinicApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MedicalClinicApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Service> Services { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Branch> Branches { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed data
        modelBuilder.Entity<Service>().HasData(
            new Service { Id = 1, Name = "Склеротерапія", Price = 6500, DisplayOrder = 1 },
            new Service { Id = 2, Name = "Лазерне лікування варикозу", Price = 12500, DisplayOrder = 2 },
            new Service { Id = 3, Name = "Лікування трофічних змін шкіри нижніх кінцівок", Price = 7000, DisplayOrder = 3 },
            new Service { Id = 4, Name = "Тромбофлебіт", Price = 5000, DisplayOrder = 4 },
            new Service { Id = 5, Name = "Дитяча хірургія", Price = 0, DisplayOrder = 5 }
        );

        modelBuilder.Entity<Branch>().HasData(
            new Branch { Id = 1, Name = "Рівне", City = "Рівне", Address = "вул. Генерала Безручка, 5а", Phone = "0977824594" },
            new Branch { Id = 2, Name = "МЦ «ВІЗІЯ»", City = "Сарни", Address = "вул. Я. Мудрого, 5", Phone = "0673287298" }
        );

        // Configure User
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Configure Booking FKs
        modelBuilder.Entity<Booking>()
            .HasKey(b => b.Id);
        modelBuilder.Entity<Booking>()
            .Property(b => b.Name).HasMaxLength(100);
        modelBuilder.Entity<Booking>()
            .Property(b => b.Phone).HasMaxLength(20);
        modelBuilder.Entity<Booking>()
            .Property(b => b.Notes).HasMaxLength(500);
        modelBuilder.Entity<Booking>()
            .Property(b => b.UserEmail).HasMaxLength(100);

        // Store appointment date as a DATE (no timezone) for Postgres compatibility.
        modelBuilder.Entity<Booking>()
            .Property(b => b.AppointmentDate)
            .HasColumnType("date");

        modelBuilder.Entity<Booking>()
            .Property(b => b.AppointmentTime)
            .HasColumnType("time");
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Service)
            .WithMany()
            .HasForeignKey(b => b.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Branch)
            .WithMany()
            .HasForeignKey(b => b.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        // Prevent double-booking the same time slot in the same branch.
        // If you want slot uniqueness per service too, add ServiceId to this index.
        modelBuilder.Entity<Booking>()
            .HasIndex(b => new { b.BranchId, b.AppointmentDate, b.AppointmentTime })
            .IsUnique();

        modelBuilder.Entity<Booking>()
            .HasIndex(b => b.CancelToken)
            .IsUnique();
    }

}
