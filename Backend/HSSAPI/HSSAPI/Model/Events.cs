using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace HSSAPI.Model
{
    public class Events
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name field is required.")]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public DateTime DateAndTime { get; set; }
        public string Company { get; set; }
        public string Location { get; set; }
        public string Price { get; set; } //String grundet simpelthed
        public string Image {  get; set; } //String grundet imgur eller lign. link
        public string EventBrinkLink { get; set; }
        public int Views { get; set; }
        public Events(int id, string name, string desc, string type, DateTime datetime,string company, string location, string price, string image, string eblink) 
        {
            Id = id;
            Name = name;
            Description = desc;
            Type = type;
            DateAndTime = datetime;
            Company = company;
            Location = location;
            Price = price;
            Image = image;
            EventBrinkLink = eblink;
            Views = 0;
        }
        [JsonConstructor]
        public Events() { }
    }
    public class EventsContext : DbContext
    {
        public EventsContext(DbContextOptions<EventsContext> options) : base(options) { }

        public DbSet<Events> Events { get; set; }
        
    }
}
