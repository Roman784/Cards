using backend.Models;
using backend.Repositories;
using backend.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly ActivitiesRepository _repository;

        public ActivitiesController(WebCardsContext webCardsContext)
        {
            _repository = new ActivitiesRepository(webCardsContext);
        }

        [HttpGet, Route("/activities"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> GetActivities(long userId)
        {
            try
            {
                if (userId < 0)
                    return NotFound("Activities not found");

                List<Activity> activities = await _repository.GetActivities(userId);

                return Ok(activities);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpGet, Route("/activities/get"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> GetActivity(int userId, int year, int month, int day)
        {
            try
            {
                Activity? activity = await _repository.GetActivity(userId, year, month, day);

                if (activity == null)
                    activity = await _repository.AddActivity(userId, year, month, day, 0);

                return Ok(activity);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        [HttpPut, Route("/activities/update"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> UpdateActivities(int userId, int year, int month, int day, int studyTime)
        {
            try
            {
                if (userId < 0)
                    return NotFound("Activities not found");

                bool result = await _repository.UpdateActivity(userId, year, month, day, studyTime);

                if (!result)
                    await _repository.AddActivity(userId, year, month, day, studyTime);

                return Ok();
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }
    }
}
