using lifecare.DAO;
using Microsoft.EntityFrameworkCore;

namespace lifecare.Data
{

    public class AppDataContext: DbContext 
    {
        public AppDataContext(DbContextOptions options) : base(options) { }

        public DbSet<Record> Records { get; set; }

    }
}