var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "gila World!");

app.Run();
