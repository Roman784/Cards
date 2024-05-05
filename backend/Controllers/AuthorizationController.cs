﻿using Microsoft.AspNetCore.Cors;
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
        private readonly WebCardsContext _dbContext;

        public AuthorizationController(WebCardsContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost, Route("/login"), EnableCors("Local")]
        public IActionResult LogIn(RequestedUserData loginData)
        {
            try
            {
                UserRepository repository = new UserRepository(_dbContext);

                // Проверяем пользователя на наличие в базе данных.
                User? user = repository.GetUser(loginData.Name, loginData.Password);

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
        public IActionResult SignUp(RequestedUserData registrationData)
        {
            try
            {
                UserRepository repository = new UserRepository(_dbContext);

                // Проверяем пользователя на уникальность.
                User? existingUser = repository.GetUser(registrationData.Name);

                if (existingUser != null)
                    return Conflict(new { message = "User already exists." });

                // Добавляем новго пользователя в БД.
                User newUser = repository.AddUser(registrationData.Name, registrationData.Password);

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
