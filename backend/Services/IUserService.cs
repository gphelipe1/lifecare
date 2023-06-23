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
        RecordDTO GetUserRecordsDetail(string username, int recordId);
        UserDTO? GetCurrentUser(string token);
        UserDTO GetByUsername(string username);
        UserDTO GetCurrentUserProfile(string username);
        UserDTO Update(UserDTO user);
        UserDTO SaveUserFile(string filename, string username);
    }
}