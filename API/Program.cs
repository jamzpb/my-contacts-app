using API.Data;
using API.Repositories;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;


var builder = WebApplication.CreateBuilder(args);

// clear default logs, hide warnings
builder.Logging.ClearProviders(); 
builder.Logging.AddConsole(); 
builder.Logging.AddFilter("Microsoft.Hosting.Lifetime", LogLevel.Warning); 

builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Add services to the container.
builder.Services.AddOpenApi();

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(opt => 
opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IContactsRepository, ContactsRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
     app.MapOpenApi();
     app.MapScalarApiReference();   

     // http://localhost:5283/scalar/
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Seed and run database migrations everytime
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "error occoured during migration");
}

logger.LogInformation("Now listening on, please click on this link!: http://localhost:5283/scalar");
logger.LogInformation("To close, press ctrl+c. thanks :)");

app.Run();
