using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
namespace HSSAPI.Model
{
    public class Events
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public DateTime DateAndTime { get; set; }
        public string Location { get; set; }
        public string Price { get; set; } //String grundet simpelthed
        public string Image {  get; set; } //String grundet imgur eller lign. link
        public string EventBrinkLink { get; set; }
        public Events(int id, string name, string desc, string type, DateTime datetime, string location, string price, string image, string eblink) 
        {
            Id = id;
            Name = name;
            Description = desc;
            Type = type;
            DateAndTime = datetime;
            Location = location;
            Price = price;
            Image = image;
            EventBrinkLink = eblink;
        }
        [JsonConstructor]
        public Events() { }
    }
    public class EventsContext : DbContext
    {
        public EventsContext(DbContextOptions<EventsContext> options) : base(options) { }

        public DbSet<Events> Events { get; set; }
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
