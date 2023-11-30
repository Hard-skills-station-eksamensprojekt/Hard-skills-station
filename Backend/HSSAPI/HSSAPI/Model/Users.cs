using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
namespace HSSAPI.Model
{
    public class Users
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Users(int id, string username, string password)
        {
            Id = id;
            Username = username;
            Password = password;
        }
        [JsonConstructor]
        public Users() { }

    }
    public class UsersContext : DbContext
    {
        public UsersContext(DbContextOptions<UsersContext> options) : base(options) { }
        public DbSet<Users> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=hardskillsdb.c4lczsyycmwk.eu-north-1.rds.amazonaws.com; Database=HSS_database;TrustServerCertificate=True; User Id=admin;Password=NotSecure1", builder =>
                {
                    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                });
            base.OnConfiguring(optionsBuilder);
        }
        
    }
}
