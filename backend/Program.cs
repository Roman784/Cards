using Backend;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ��������� ��.
//builder.Services.AddDbContext<BeerRangeContext>();

// ��������� ������� CORS.
builder.Services.AddCors(options =>
{
    // ��� ������� ����������� ����� �������.
    options.AddPolicy("Local", policy => policy
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
});

// ��������� ������� ��� ����������� � ��������������.
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

app.UseCors(); // ���������� CORS.

// ���������� ����������� � ���������������.
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
