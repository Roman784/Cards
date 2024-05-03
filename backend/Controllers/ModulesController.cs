using backend.Models;
using Backend.Models;
using Backend.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    public class ModulesController : ControllerBase
    {
        [HttpGet, Route("/modules"), EnableCors("Local"), Authorize]
        public IActionResult GetModules(int userId)
        {
            try
            {
                List<Module> modules = UsersContext.GetModules(userId);

                return Ok(modules);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpGet, Route("/modules/my"), EnableCors("Local"), Authorize]
        public IActionResult GetUserModules(int userId)
        {
            try
            {
                List<Module> modules = UsersContext.GetUserModules(userId);

                return Ok(modules);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpPost, Route("/modules/add"), EnableCors("Local"), Authorize]
        public IActionResult AddModule(AddModuleData moduleData)
        {
            try
            {
                int userId = UsersContext.GetUser(moduleData.UserName)?.Id ?? -1;

                if (moduleData == null || moduleData.Cards == null || userId == -1)
                    return StatusCode(500, "Failed to create the module.");

                int moduleId = UsersContext.AddModule(userId, moduleData, moduleData.Cards);

                return Ok(moduleId);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpGet, Route("/module"), EnableCors("Local"), Authorize]
        public IActionResult GetPrivateModules(int moduleId)
        {
            try
            {
                if (moduleId < 0)
                    return StatusCode(400, "Unacceptable id.");

                Module module = UsersContext.GetModule(moduleId);
                List<Card> cards = UsersContext.GetCards(moduleId);

                if (module == null)
                    return Conflict("Module not found.");

                var response = new
                {
                    title = module.Title,
                    cards = cards
                };
                return Ok(response);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        public class AddModuleData : Module
        {
            public string? UserName { get; set; }
            public List<Card>? Cards { get; set; }
        }
    }
}
