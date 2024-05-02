using Backend.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

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
    }
}
