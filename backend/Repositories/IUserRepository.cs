using lifecare.DAO;

namespace lifecare.Repositories
{
    public interface IUserRepository
    {
        User Create(User user);
        User? GetByUsername(string username);
        User? GetById(int id);
    }
}