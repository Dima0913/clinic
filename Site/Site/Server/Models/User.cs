using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalClinicApi.Models;

public enum UserStatus
{
    Pending = 0,
    Accepted = 1
}

public class User
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(256)]
    public string Email { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(20)]
    public string? Phone { get; set; }
    
    public UserStatus Status { get; set; } = UserStatus.Pending;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public bool IsDeleted { get; set; } = false;
}
