using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Storage;

namespace Backend.Controllers
{
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        [HttpPost, Route("/login"), EnableCors("Local")]
        public IActionResult LogIn(User loginData)
        {
            try
            {
                // Проверяем пользователя на наличие в базе данных.
                User? user = UsersContext.GetUser(loginData.Name, loginData.Password);

                if (user is null)
                    return Unauthorized(new { message = "User not found." });

                // Генерируем токен.
                string encodedJwt = JwtService.GenerateToken(user.Name); 

                // Формируем ответ.
                var response = new
                {
                    accessToken = encodedJwt,
                    name = user.Name
                };

                return Ok(response);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpPut, Route("/signup"), EnableCors("Local")]
        public IActionResult SignUp(User registrationData)
        {
            try
            {
                // Проверяем на уникальность пользователя.
                User? existingUser = UsersContext.GetUser(registrationData.Name);

                if (existingUser != null)
                    return Conflict("Пользователь с таким именем уже существует.");

                // Добавляем новго пользователя в БД.
                User newUser = UsersContext.AddUser(registrationData.Name, registrationData.Password);

                // Генерируем токен.
                string encodedJwt = JwtService.GenerateToken(newUser.Name);

                // Формируем ответ.
                var response = new
                {
                    accessToken = encodedJwt,
                    name = newUser.Name
                };

                return Ok(response);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }
    }
}
