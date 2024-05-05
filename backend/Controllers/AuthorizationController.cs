using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Backend.Storage;

namespace Backend.Controllers
{
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        /*[HttpPost, Route("/login"), EnableCors("Local")]
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
                    id = user.Id,
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
                // Проверяем пользователя на уникальность.
                User? existingUser = UsersContext.GetUser(registrationData.Name);

                if (existingUser != null)
                    return Conflict(new { message = "User already exists." });

                // Добавляем новго пользователя в БД.
                User newUser = UsersContext.AddUser(registrationData.Name, registrationData.Password);

                // Генерируем токен.
                string encodedJwt = JwtService.GenerateToken(newUser.Name);

                // Формируем ответ.
                var response = new
                {
                    accessToken = encodedJwt,
                    id = newUser.Id,
                    name = newUser.Name
                };

                return Ok(response);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }*/
    }
}
