using lifecare.DAO;
using lifecare.Data;
using Microsoft.EntityFrameworkCore;

namespace lifecare.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly AppDataContext _context;

        public UserRepository(AppDataContext context)
        {
            _context = context;
        }

        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public User? GetByUsername(string username)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username);
        }

        public User? GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();

            return user;
        }

        public User SaveUserFile(string filename, string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user != null ) {
                user.ProfileImage = filename;

                _context.Users.Update(user);
                _context.SaveChanges();

                return user;
            } else {
                throw new DbUpdateException("Could not update the data");
            }
            
        }
    }
}