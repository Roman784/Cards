using backend.Models;
using backend.Storage;
using Microsoft.EntityFrameworkCore;
using static backend.Controllers.ModulesController;

namespace backend.Repositories
{
    public class ModulesRepository : Repository
    {
        public ModulesRepository(WebCardsContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Module>> GetModules(long userId)
        {
            return await (from module in DbContext.Modules
                   where module.Access == 1 || module.UserId == userId
                   select module).ToListAsync();
        }

        public async Task<List<Module>> GetUserModules(long userId)
        {
            return await (from module in DbContext.Modules
                   where module.UserId == userId
                   select module).ToListAsync();
        }

        public async Task<Module?> GetModule(long moduleId)
        {
            return await DbContext.Modules.FirstOrDefaultAsync(module => module.Id == moduleId);
        }

        public async Task<List<Card>> GetCards(long moduleId)
        {
            return await (from card in DbContext.Cards
                   where card.ModuleId == moduleId
                   select card).ToListAsync();
        }

        public async Task<List<long>> GetFavoriteModuleIds(long userId)
        {
            return await (from module in DbContext.FavoriteModules
                          where module.UserId == userId
                          select module.ModuleId).ToListAsync();
        }

        public void AddFavoriteModule(long userId, long moduleId)
        {
            FavoriteModule module = new FavoriteModule()
            {
                UserId = userId,
                ModuleId = moduleId
            };

            DbContext.Add(module);
            DbContext.SaveChanges();
        }

        public void DeleteFavoriteModule(long userId, long moduleId)
        {
            FavoriteModule? module = DbContext.FavoriteModules.FirstOrDefault(m => m.UserId == userId && m.ModuleId == moduleId);

            if (module == null) return;

            DbContext.FavoriteModules.Remove(module);
            DbContext.SaveChanges();
        }

        public async Task<long> AddModule(long userId, RequestedModuleData moduleData)
        {
            // Создаём новый модуль.
            Module newModule = new Module()
            {
                UserId = userId,
                Title = moduleData.Title,
                Access = moduleData.Access
            };

            // Создаём карточки.
            foreach (var card in moduleData.Cards)
            {
                Card newCard = new Card()
                {
                    Term = card.Term,
                    Definition = card.Definition
                };
                newModule.Cards.Add(newCard); // Связываем карточку с модулем.
            }

            // Добавляем модуль в бд и сохраняем его.
            await DbContext.AddAsync(newModule);
            await DbContext.SaveChangesAsync();

            return newModule.Id;
        }

        public async Task<Module?> UpdateModule(long moduleId, RequestedModuleData newModuleData)
        {
            Module? module = await GetModule(moduleId);

            if (module == null) return null;

            // Устанавливаем новые значения модуля.
            module.Title = newModuleData.Title;
            module.Access = newModuleData.Access;

            // Удаляем старые карточки и создаём новые.
            foreach(var card in DbContext.Cards)
            {
                if (card.ModuleId ==  moduleId) 
                {
                    DbContext.Cards.Remove(card);
                }
            }
            foreach (var card in newModuleData.Cards)
            {
                Card newCard = new Card()
                {
                    Term = card.Term,
                    Definition = card.Definition
                };
                module.Cards.Add(newCard); // Связываем карточку с модулем.
            }

            await DbContext.SaveChangesAsync();

            return module;
        }
    
        public async Task DeleteModule(long id)
        {
            Module? module = await GetModule(id);
            FavoriteModule? favoriteModule = await DbContext.FavoriteModules.FirstOrDefaultAsync(m => m.ModuleId == id);

            if (module == null || favoriteModule == null) return;

            // Удаляем данные.
            foreach(var card in DbContext.Cards) 
            {
                if (card.ModuleId == id)
                {
                    DbContext.Cards.Remove(card);
                }
            }
            DbContext.FavoriteModules.Remove(favoriteModule);
            DbContext.Modules.Remove(module);

            await DbContext.SaveChangesAsync();
        }
    }
}
