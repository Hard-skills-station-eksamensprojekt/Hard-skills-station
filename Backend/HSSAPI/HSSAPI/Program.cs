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

            // ADD CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            // Add Endpoint & Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            app.UseCors("AllowAnyOrigin");
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
            app.MapGet("/eventsType/{type}", async (string type, EventsContext eventContext) =>
            {
                var eventsOfType = await eventContext.Events
                    .Where(e => e.Type == type)
                    .ToListAsync();
                if (eventsOfType != null)
                {
                    return Results.Ok(eventsOfType);
                }
                else { return Results.NotFound("Ikke defineret type"); }
            });
            app.MapGet("/upcomingEvents", async (EventsContext eventContext) =>
            {
                var eventsUpcoming = await eventContext.Events
                    .Where(e => e.DateAndTime > DateTime.Now)
                    .ToListAsync();
                return Results.Ok(eventsUpcoming);
            });
            app.MapGet("/eventsCompany/{company}", async (string company, EventsContext eventContext) =>
            {
                var eventsOfCompany = await eventContext.Events
                    .Where(e => e.Company == company)
                    .ToListAsync();
                if (eventsOfCompany != null)
                {
                    return Results.Ok(eventsOfCompany);
                }
                else { return Results.NotFound("Ingen events af dette firma"); }
            });

            app.MapPost("/createEvent", (Events events, EventsContext eventCT) =>
            {
                eventCT.Events.Add(events);
                eventCT.SaveChanges();

                return Results.Created($"Nyt event oprettet med id: {events.Id}", events);
            });
            app.MapPut("/updateEvent/{id}", (int id, Events updatedEvent, EventsContext eventCT) =>
            {
                var toChangeID = eventCT.Events.Find(id);
                if (toChangeID != null)
                {
                    if (updatedEvent.Name != null)
                        toChangeID.Name = updatedEvent.Name;

                    if (updatedEvent.Description != null)
                        toChangeID.Description = updatedEvent.Description;

                    if (updatedEvent.Type != null)
                        toChangeID.Type = updatedEvent.Type;

                    if (updatedEvent.DateAndTime != default)
                        toChangeID.DateAndTime = updatedEvent.DateAndTime;

                    if (updatedEvent.Company != null)
                        toChangeID.Company = updatedEvent.Company;

                    if (updatedEvent.Location != null)
                        toChangeID.Location = updatedEvent.Location;

                    if (updatedEvent.Price != null)
                        toChangeID.Price = updatedEvent.Price;

                    if (updatedEvent.Image != null)
                        toChangeID.Image = updatedEvent.Image;

                    if (updatedEvent.EventBrinkLink != null)
                        toChangeID.EventBrinkLink = updatedEvent.EventBrinkLink;
                    
                    if (updatedEvent.Views != 0)
                        toChangeID.Views = updatedEvent.Views;
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

