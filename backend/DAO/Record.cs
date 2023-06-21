using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lifecare.DAO
{
    public class Record 
    {
        [Key]
        public int Id { get; set; }
        
        [Required(ErrorMessage ="Name field is required")]
        public required string Name { get; set; } 

        [Required(ErrorMessage ="CPF field is required")]
        public required string CPF { get; set; }

        [Required(ErrorMessage ="Phone field is required")]
        public required string Phone { get; set; }

        public string? Description { get; set; }
        
        public string? Address { get; set; }

        public string? ProfileImage { get; set;}
        
        [NotMapped]
        public IFormFile? ImageFile {get; set;}

    }
}