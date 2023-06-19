using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using lifecare.Enums;

namespace lifecare.DAO;

public class User 
{
    [Key]
    public int Id { get; set; }
    
    [Required(ErrorMessage ="This field is required")]
    public string UserCPF { get; set; } = string.Empty;

    [Required(ErrorMessage ="This field is required")]
    public string Password { get; set; } = string.Empty;

    public UserRoles Role { get; set; } = UserRoles.User;


}