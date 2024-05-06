using backend.Models;
using backend.Repositories;
using backend.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    public class ModulesController : ControllerBase
    {
        private readonly ModulesRepository _repository;

        public ModulesController(WebCardsContext webCardsContext)
        {
            _repository = new ModulesRepository(webCardsContext);
        }

        // Все публичные модули + приватные текущего пользователя.
        [HttpGet, Route("/modules"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> GetModules(long userId)
        {
            try
            {
                // Проверяем правильность id.
                if (userId < 0)
                    return NotFound("Modules not found");

                List<Module> modules = await _repository.GetModules(userId);

                return Ok(modules);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        // Все модули текущего пользователя.
        [HttpGet, Route("/modules/my"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> GetUserModules(long userId)
        {
            try
            {
                // Проверяем правильность id.
                if (userId < 0)
                    return NotFound("Modules not found");

                List<Module> modules = await _repository.GetUserModules(userId);

                return Ok(modules);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        // Данные конкретного модуля.
        [HttpGet, Route("/module"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> GetModule(long moduleId, long userId)
        {
            try
            {
                // Проверяем правильность id.
                if (moduleId < 0 || userId < 0)
                    return StatusCode(400, "Unacceptable id.");

                Module? module = await _repository.GetModule(moduleId);
                List<Card> cards = await _repository.GetCards(moduleId);

                // Конвертируем коллекцию карточек в подобаемый для отправки вид.
                // Для избежения зацикливания.
                List<RequestedCardData> cardsData = new List<RequestedCardData>();
                foreach (Card card in cards) 
                {
                    cardsData.Add(new RequestedCardData() 
                    { 
                        Id = card.Id,
                        Term =  card.Term, 
                        Definition = card.Definition 
                    });
                }

                // Проверяем модуль на существование.
                if (module == null)
                    return NotFound("Module not found.");

                var response = new
                {
                    title = module.Title,
                    authorId = module.UserId,
                    access = module.Access,
                    cards = cardsData
                };
                return Ok(response);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        // Id избранных модулей текущего пользователя.
        [HttpGet, Route("/modules/favorites/ids"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> GetFavoriteModuleIds(long userId)
        {
            try
            {
                // Проверяем правильность id.
                if (userId < 0)
                    return NotFound("Modules not found");

                List<long> ids = await _repository.GetFavoriteModuleIds(userId);

                return Ok(ids);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        // Возвращает все избранные модули.
        [HttpGet, Route("/modules/favorites"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> GetFavoriteModules(long userId)
        {
            try
            {
                // Проверяем правильность id.
                if (userId < 0)
                    return NotFound("Modules not found");

                List<long> ids = await _repository.GetFavoriteModuleIds(userId);
                List<Module> modules = await _repository.GetModules(userId);

                // Собираем избранные модули.
                List<Module> favorites = new List<Module>();
                foreach(var module in modules)
                {
                    if (ids.Contains(module.Id))
                    {
                        favorites.Add(module);
                    }
                }

                return Ok(favorites);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        // Добавляет/убирает модуль из списка избранных.
        [HttpPut, Route("/modules/favorites/set"), EnableCors("Local"), Authorize]
        public IActionResult SetFavoriteModules(int userId, int moduleId, bool value)
        {
            try
            {
                if (value)
                    _repository.AddFavoriteModule(userId, moduleId);
                else
                    _repository.DeleteFavoriteModule(userId, moduleId);

                return Ok();
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        // Добавляет новый модуль.
        [HttpPost, Route("/modules/add"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> AddModule(RequestedModuleData moduleData)
        {
            try
            {
                if (moduleData == null || moduleData.Cards == null || moduleData.UserId < 0)
                    return StatusCode(500, "Failed to create the module.");

                long moduleId = await _repository.AddModule(moduleData.UserId, moduleData);

                return Ok(moduleId);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        // Обновляет данные модуля.
        [HttpPut, Route("/modules/edit"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> UpdateModule(RequestedModuleData newModuleData)
        {
            try
            {
                if (newModuleData == null || newModuleData.Cards == null || newModuleData.UserId < 0 || newModuleData.Id < 0)
                    return StatusCode(500, "Failed to update the module.");

                Module? module = await _repository.UpdateModule(newModuleData.Id, newModuleData);

                if (module == null)
                    return StatusCode(500, "Failed to update the module.");

                return Ok(module.Id);
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        // Удаляет модуль со всеми карточками.
        [HttpDelete, Route("/modules/delete"), EnableCors("Local"), Authorize]
        public async Task<IActionResult> DeleteModule(int id)
        {
            try
            {
                if (id < 0)
                    return StatusCode(500, "Failed to delete the module.");

                await _repository.DeleteModule(id);

                return Ok();
            }
            catch (Exception e) { return StatusCode(500, e.Message); }
        }

        // Типы данных, получаемых с клиента.
        public class RequestedModuleData
        {
            public long Id { get; set; }
            public long UserId { get; set; }
            public string Title { get; set; } = "";
            public int Access { get; set; }
            public List<RequestedCardData> Cards { get; set; } = new List<RequestedCardData>();
        }
        public class RequestedCardData
        {
            public long Id { get; set; }
            public string? Term { get; set; } = "";

            public string? Definition { get; set; } = "";
        }
    }
}
