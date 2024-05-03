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

        [HttpPut, Route("/modules/add"), EnableCors("Local"), Authorize]
        public IActionResult AddModule(AddModuleData moduleData)
        {
            try
            {
                if (moduleData == null || moduleData.Cards == null || moduleData.UserId < 0)
                    return StatusCode(500, "Failed to create the module.");

                int moduleId = UsersContext.AddModule(moduleData.UserId, moduleData, moduleData.Cards);

                return Ok(moduleId);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpPut, Route("/modules/edit"), EnableCors("Local"), Authorize]
        public IActionResult EditModule(AddModuleData moduleData)
        {
            try
            {
                if (moduleData == null || moduleData.Cards == null || moduleData.UserId < 0)
                    return StatusCode(500, "Failed to create the module.");

                Module? module = UsersContext.GetModule(moduleData.Id);

                if (module == null)
                    return StatusCode(500, "Failed to create the module.");

                module.Title = moduleData.Title;
                module.Access = moduleData.Access;

                UsersContext.DeleteCards(moduleData.Id);
                UsersContext.AddCards(moduleData.Id, moduleData.Cards);

                return Ok();
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpGet, Route("/module"), EnableCors("Local"), Authorize]
        public IActionResult GetModule(int moduleId, int userId)
        {
            try
            {
                if (moduleId < 0 || userId < 0)
                    return StatusCode(400, "Unacceptable id.");

                Module? module = UsersContext.GetModule(moduleId);
                List<Card> cards = UsersContext.GetCards(moduleId);

                if (module == null)
                    return Conflict("Module not found.");

                var response = new
                {
                    title = module.Title,
                    authorId = module.UserId,
                    access = module.Access,
                    cards
                };
                return Ok(response);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpDelete, Route("/modules/delete"), EnableCors("Local"), Authorize]
        public IActionResult DeleteModule(int id)
        {
            try
            {
                if (id < 0)
                    return StatusCode(500, "Failed to delete the module.");

                UsersContext.DeleteModule(id);

                return Ok();
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        public class AddModuleData : Module
        {
            public List<Card>? Cards { get; set; }
        }
    }
}
