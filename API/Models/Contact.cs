using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Contact
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Phone]
        public required string Number { get; set; }
        [EmailAddress]
        public string? EmailAddress { get; set; }
        public DateTime Created_At { get; set; }
    }
}