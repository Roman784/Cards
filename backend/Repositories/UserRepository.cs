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

        public User? GetUser(string name, string password)
        {
            return DbContext.Users.FirstOrDefault(p => p.Name == name && p.Password == password);
        }

        public User? GetUser(string name)
        {
            return DbContext.Users.FirstOrDefault(u => u.Name == name);
        }

        public User AddUser(string name, string password)
        {
            User newUser = new User() { Name = name, Password = password };

            DbContext.Add(newUser);
            DbContext.SaveChanges();

            return newUser;
        }
    }
}
