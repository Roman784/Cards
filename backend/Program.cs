using Backend;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Добавляем БД.
//builder.Services.AddDbContext<BeerRangeContext>();

// Добавляем сервисы CORS.
builder.Services.AddCors(options =>
{
    // Для примера принимаются любые запросы.
    options.AddPolicy("Local", policy => policy
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
});

// Добавляем сервисы для авторизации и аутентификации.
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = JwtService.Options.ISSUER,
            ValidateAudience = true,
            ValidAudience = JwtService.Options.AUDIENCE,
            ValidateLifetime = true,
            IssuerSigningKey = JwtService.Options.GetSymmetricSecurityKey(),
            ValidateIssuerSigningKey = true
        };
    }
);

var app = builder.Build();

app.UseCors(); // Подключаем CORS.

// Подключаем авторизацию с аутентификацией.
app.UseAuthentication();
app.UseAuthorization();

app.Map("/username", [Authorize] (HttpContext context) =>
{
    return new { name = context.User.FindFirstValue(ClaimTypes.Name) };
})
.RequireCors("Local");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
