using HSSAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace HSSAPI
{
    public class Program
    {

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            string? connectionString = builder.Configuration.GetConnectionString("AWS_RDS");
        
            // Adding DbContexts to Events
            builder.Services.AddDbContext<EventsContext>(options =>
                {
                    options.UseSqlServer(connectionString);
                });

            // Add Endpoint & Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            app.UseHttpsRedirection();
            app.UseSwaggerUI();

            // Configure the HTTP request pipeline.
            app.MapGet("/", () => "Welcome to the Hard Skills Station API");

            app.MapGet("/events", (EventsContext eventCT) =>
            {
                try
                {
                    var allEvents = eventCT.Events.ToList();
                    return Results.Ok(allEvents);
                }
                catch 
                {
                    return Results.BadRequest("Fejl i hentning af events");
                }
            });
            app.MapGet("/event/{id}", (int id, EventsContext eventCT) =>
            {
                var foundID = eventCT.Events.Find(id);
                if (foundID != null)
                {
                    return Results.Ok(foundID);
                }
                else { return Results.NotFound(); }
            });
            app.MapPost("/createEvent", (Events events, EventsContext eventCT) =>
            {
                eventCT.Events.Add(events);
                eventCT.SaveChanges();

                return Results.Created($"Nyt event oprettet med id: {events.Id}", events);
            });
            app.MapPut("/updateEvent/{id}", (int id, Events events, EventsContext eventCT) =>
            {
                var toChangeID = eventCT.Events.Find(id);
                if (toChangeID != null)
                {
                    toChangeID.Name = events.Name;
                    toChangeID.Description = events.Description;
                    toChangeID.Type = events.Type;
                    toChangeID.DateAndTime = events.DateAndTime;
                    toChangeID.Company = events.Company;
                    toChangeID.Location = events.Location;
                    toChangeID.Price = events.Price;
                    toChangeID.Image = events.Image;
                    toChangeID.EventBrinkLink = events.EventBrinkLink;
                    eventCT.SaveChanges();
                    return Results.NoContent();
                }
                else { return Results.NotFound(); }
            });
            app.MapDelete("/deleteEvent/{id}", (int id, EventsContext eventCT) =>
            {
                var deleteID = eventCT.Events.Find(id);
                if (deleteID != null)
                {
                    eventCT.Events.Remove(deleteID);
                    eventCT.SaveChanges();
                    return Results.NoContent();
                }
                else { return Results.NotFound(); }
            });

            app.UseSwagger(x => x.SerializeAsV2 = true);
            app.Run();
        }
        
    }
    
}

