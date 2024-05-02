using Backend.Models;

namespace Backend.Storage
{
    public static class UsersContext
    {
        private static List<User> Users = new List<User>
        {
            new User() {Name = "roman", Password = "1234" },
        };

        public static User? GetUser(string name, string password)
        {
            return Users.FirstOrDefault(p => p.Name == name && p.Password == password);
        }

        public static User? GetUser(string name)
        {
            return Users.FirstOrDefault(u => u.Name == name);
        }

        public static User AddUser(string name, string password)
        {
            User newUser = new User() { Name = name, Password = password };
            Users.Add(newUser);

            return newUser;
        }
    }
}
