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
        /*[HttpGet, Route("/modules"), EnableCors("Local"), Authorize]
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

                return Ok(moduleData.Id);
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

        [HttpGet, Route("/modules/favorites"), EnableCors("Local"), Authorize]
        public IActionResult GetFavoriteModules(int userId)
        {
            try
            {
                if (userId < 0)
                    return NotFound("Modules not found");

                List<FavoriteModule> favoriteModules = UsersContext.GetFavoriteModules(userId);

                List<Module> modules = new List<Module>();

                foreach (FavoriteModule favoriteModule in favoriteModules)
                {
                    Module module = UsersContext.GetModule(favoriteModule.ModuleId);

                    if (module!= null && (module.Access == 1 || module.UserId == userId))
                        modules.Add(module);
                }

                return Ok(modules);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpPut, Route("/modules/favorites/set"), EnableCors("Local"), Authorize]
        public IActionResult SetFavoriteModules(int userId, int moduleId, bool value)
        {
            try
            {
                if (value)
                    UsersContext.AddFavoriteModule(userId, moduleId);
                else
                    UsersContext.RemoveFavoriteModule(userId, moduleId);

                return Ok();
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpGet, Route("/activities"), EnableCors("Local"), Authorize]
        public IActionResult GetActivities(int userId)
        {
            try
            {
                if (userId < 0)
                    return NotFound("Activities not found");

                List<Activity> activities = UsersContext.GetActivities(userId);

                return Ok(activities);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpGet, Route("/activities/get"), EnableCors("Local"), Authorize]
        public IActionResult GetActivity(int userId, int year, int month, int day)
        {
            try
            {
                Activity? activity = UsersContext.GetActivity(userId, year, month, day);

                if (activity == null)
                    activity = UsersContext.AddActivity(userId, year, month, day, 0);

                return Ok(activity);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpPut, Route("/activities/update"), EnableCors("Local"), Authorize]
        public IActionResult UpdateActivities(int userId, int year, int month, int day, int studyTime)
        {
            try
            {
                if (userId < 0)
                    return NotFound("Activities not found");

                bool result = UsersContext.UpdateActivity(userId, year, month, day, studyTime);

                if (!result)
                    UsersContext.AddActivity(userId, year, month, day, studyTime);

                return Ok();
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        public class AddModuleData : Module
        {
            public List<Card>? Cards { get; set; }
        }*/
    }
}
