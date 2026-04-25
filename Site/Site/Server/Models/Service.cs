using System.ComponentModel.DataAnnotations;

namespace MedicalClinicApi.Models;

public class Service
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public decimal Price { get; set; }
    
    public int? DisplayOrder { get; set; }
    
    public int? DiscountPercentage { get; set; }
}
