using lifecare.DAO;
using lifecare.Helpers;
using Microsoft.EntityFrameworkCore;

namespace lifecare.Data
{

    public class AppDataContext: DbContext 
    {
        public AppDataContext(DbContextOptions options) : base(options){ }

        public DbSet<Record> Records { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            
            builder.Entity<User>(entity => {
                entity.HasIndex(e => e.Username).IsUnique();
            });

            builder.Entity<User>(entity => {
                entity.HasData(new User{
                    Id=1,
                    Role= UserRoles.Admin,
                    Username="admin",
                    Password = BCrypt.Net.BCrypt.HashPassword("admin")
                });
            });
        }
    }
}