using backend.Models;
using Backend.Models;

namespace Backend.Storage
{
    public static class UsersContext
    {
        private static List<User> Users = new List<User>
        {
            new User() {Id = 0, Name = "roman", Password = "1234" },
            new User() {Id = 1, Name = "tom", Password = "1234" },
        };

        private static List<Module> Modules = new List<Module>
        {
            new Module() {Id = 0, UserId = 0, Title = "Roman1", Access = 1},
            new Module() {Id = 1, UserId = 0, Title = "Roman2", Access = 1},
            new Module() {Id = 2, UserId = 1, Title = "Tom1", Access = 1},
            new Module() {Id = 3, UserId = 1, Title = "Tom2", Access = 0},
        };

        private static List<Card> Cards = new List<Card>
        {
            new Card() {Id = 0, ModuleId = 0, Term="0", Definition=""},
            new Card() {Id = 1, ModuleId = 0, Term="0", Definition=""},
            new Card() {Id = 2, ModuleId = 1, Term="1", Definition=""},
            new Card() {Id = 3, ModuleId = 1, Term="1", Definition=""},
            new Card() {Id = 4, ModuleId = 2, Term="2", Definition=""},
            new Card() {Id = 5, ModuleId = 2, Term="2", Definition=""},
            new Card() {Id = 6, ModuleId = 3, Term="3", Definition=""},
            new Card() {Id = 7, ModuleId = 3, Term="3", Definition=""},
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
            int id = Users.Max(u => u.Id) + 1;
            User newUser = new User() { Id = id, Name = name, Password = password };

            Users.Add(newUser);

            return newUser;
        }

        public static int AddModule(int userId, Module module, List<Card> cards)
        {
            int moduleId = Modules.Max(m => m.Id) + 1;

            Module newModule = new Module()
            {
                Id = moduleId,
                UserId = userId,
                Title = module.Title,
                Access = module.Access
            };

            Modules.Add(newModule);
            AddCards(moduleId, cards);

            return moduleId;
        }

        public static void AddCards(int moduleId, List<Card> cards)
        {
            int startCardId = Cards.Max(c => c.Id) + 1;

            for (int id = startCardId; id < startCardId + cards.Count; id++)
            {
                int index = id - startCardId;

                Card newCard = new Card()
                {
                    Id = id,
                    ModuleId = moduleId,
                    Term = cards[index].Term,
                    Definition = cards[index].Definition
                };

                Cards.Add(newCard);
            }
        }

        public static List<Module> GetModules(int userId)
        {
            return (from module in Modules
                    where module.Access == 1 || module.UserId == userId
                    select module).ToList();
        }

        public static List<Module> GetUserModules(int userId)
        {
            return (from module in Modules
                    where module.UserId == userId
                    select module).ToList();
        }

        public static Module? GetModule(int modelId)
        {
            return Modules.FirstOrDefault(module => module.Id == modelId);
        }

        public static List<Card> GetCards(int moduleId)
        {
            return (from card in Cards
                   where card.ModuleId == moduleId
                   select card).ToList();
        }

        public static void DeleteModule(int id)
        {
            Module? module = Modules.FirstOrDefault(m => m.Id == id);

            if (module == null) return;

            Modules.Remove(module);
            Console.WriteLine("bbbbaaaaa");
            DeleteCards(id);
        }

        public static void DeleteCards(int moduleId)
        {
            List<Card> cards = (from card in Cards
                                where card.ModuleId == moduleId
                                select card).ToList();

            foreach (Card card in cards)
            {
                Cards.Remove(card);
            }
        }
    }
}
