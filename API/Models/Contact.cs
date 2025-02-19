using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class Contact
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Phone]
        public required string Number { get; set; }
        public string? EmailAddress { get; set; }
        public DateTime Created_At { get; set; }
    }
}