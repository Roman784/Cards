using backend.Models;
using backend.Storage;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class UserRepository : Repository
    {
        public UserRepository(WebCardsContext dbContext) : base(dbContext)
        {
        }

        public async Task<User?> GetUser(string name, string password)
        {
            return await DbContext.Users.FirstOrDefaultAsync(p => p.Name == name && p.Password == password);
        }

        public async Task<User?> GetUser(string name)
        {
            return await DbContext.Users.FirstOrDefaultAsync(u => u.Name == name);
        }

        public async Task<User> AddUser(string name, string password)
        {
            User newUser = new User() { Name = name, Password = password };

            await DbContext.AddAsync(newUser);
            await DbContext.SaveChangesAsync();

            return newUser;
        }
    }
}
