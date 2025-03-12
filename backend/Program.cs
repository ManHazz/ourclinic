using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using searchPatient; // Correctly referencing the namespace
using searchAppointment;

var builder = WebApplication.CreateBuilder(args);

// Configure services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Apply Middleware
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.Run();
