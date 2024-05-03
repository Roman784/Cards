using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend
{
    public class JwtService
    {
        public static class Options
        {
            public const string ISSUER = "MyAuthServer"; // Издатель токена.
            public const string AUDIENCE = "MyAuthClient"; // Потребитель токена.
            const string KEY = "mysupersecret_secretsecretsecretkey!123";   // Ключ для шифрации.
            public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }

        public static string GenerateToken(string name)
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, name) };

            var jwt = new JwtSecurityToken(
                issuer: Options.ISSUER,
                audience: Options.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(60)),
                signingCredentials: new SigningCredentials(Options.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
