using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
namespace HSSAPI.Model
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Name field is required.")]
        [StringLength(maximumLength:100,MinimumLength =2)]
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
        
        
    }
}
