using Career_Test;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Configuration.ConfigureServices(builder.Services);

var app = builder.Build();

//app.UseHttpsRedirection();

app.Configure();

app.MapFallbackToFile("index.html"); ;

app.Run();
