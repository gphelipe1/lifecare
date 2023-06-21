using lifecare.DAO;
using lifecare.DTO;

namespace lifecare.Services
{
    public interface IUserService
    {
        UserDTO Authenticate(User user);
        UserDTO? Login(UserRequestDTO user);
        User Registration(UserRegistrationDTO user);
        User AdminRegistration(UserRequestDTO user);
        List<RecordDTO>? GetUserRecords (string cpf);
        UserDTO? GetCurrentUser(string token);
    }
}