using System.ComponentModel.DataAnnotations;

namespace ContactForm.Models
{
    public class AuthenticateRequest
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
