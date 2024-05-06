using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Backend.Storage;
using backend.Models;
using backend.Repositories;
using backend.Storage;

namespace Backend.Controllers
{
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly UserRepository _repository;

        public AuthorizationController(WebCardsContext dbContext)
        {
            _repository = new UserRepository(dbContext);
        }

        [HttpPost, Route("/login"), EnableCors("Local")]
        public async Task<IActionResult> LogIn(RequestedUserData loginData)
        {
            try
            {
                // Проверяем пользователя на наличие в базе данных.
                User? user = await _repository.GetUser(loginData.Name, loginData.Password);

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
        public async Task<IActionResult> SignUp(RequestedUserData registrationData)
        {
            try
            {
                // Проверяем пользователя на уникальность.
                User? existingUser = await _repository.GetUser(registrationData.Name);

                if (existingUser != null)
                    return Conflict(new { message = "User already exists." });

                // Добавляем новго пользователя в БД.
                User newUser = await _repository.AddUser(registrationData.Name, registrationData.Password);

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
        }

        public class RequestedUserData
        {
            public string Name { get; set; } = "";
            public string Password { get; set; } = "";
        }
    }
}
