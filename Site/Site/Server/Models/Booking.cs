using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalClinicApi.Models;

public class Booking
{
    public int Id { get; set; }
    
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public TimeOnly AppointmentTime { get; set; }
    public string UserEmail { get; set; } = string.Empty;
    
    public DateTime AppointmentDate { get; set; }
    
    [ForeignKey("Service")]
    public int ServiceId { get; set; }
    public Service Service { get; set; } = null!;
    
    [ForeignKey("Branch")]
    public int BranchId { get; set; }
    public Branch Branch { get; set; } = null!;
    
    public string Status { get; set; } = "Scheduled";
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Secret token that allows client-side cancellation.
    public string CancelToken { get; set; } = string.Empty;

    public DateTime? CancelledAt { get; set; }

}
