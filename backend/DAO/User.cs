using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using lifecare.Helpers;
using Microsoft.AspNetCore.Identity;

namespace lifecare.DAO
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Role {get ; set; } = UserRoles.User;

        [Required]
        public string Username { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
        
        public string? ProfileImage { get; set;}
        
        [NotMapped]
        public IFormFile? ImageFile {get; set;}

        [Required]
        [JsonIgnore]
        public string Password { get; set; } = string.Empty;
    }
}