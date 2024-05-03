using backend.Models;
using Backend.Models;
using Backend.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    public class ModulesController : ControllerBase
    {
        [HttpGet, Route("/modules"), EnableCors("Local"), Authorize]
        public IActionResult GetPublicModules()
        {
            try
            {
                return Ok(UsersContext.GetPublicModules());
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpGet, Route("/modules/my"), EnableCors("Local"), Authorize]
        public IActionResult GetPrivateModules(string userName)
        {
            try
            {
                int id = UsersContext.GetUser(userName)?.Id ?? -1;
                return Ok(UsersContext.GetUserModules(id));
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

                int moduleId = -1;

                moduleId = UsersContext.AddModule(userId, moduleData, moduleData.Cards);

                return Ok(moduleId);
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
