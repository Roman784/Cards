﻿
namespace Backend.Storage
{
    /*public static class UsersContext
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

        private static List<FavoriteModule> FavoriteModules = new List<FavoriteModule>()
        {
            new FavoriteModule() {Id = 0, UserId = 1, ModuleId = 1},
            new FavoriteModule() {Id = 1, UserId = 1, ModuleId = 3},
            new FavoriteModule() {Id = 2, UserId = 0, ModuleId = 3},
        };

        private static List<Activity> Activities = new List<Activity>()
        {
            new Activity() {Id = 0, UserId = 1, Year = 2024, Month = 5, Day = 4, StudyTime = 10},
            new Activity() {Id = 1, UserId = 1, Year = 2024, Month = 5, Day = 3, StudyTime = 15},
            new Activity() {Id = 2, UserId = 1, Year = 2024, Month = 5, Day = 2, StudyTime = 5},
            new Activity() {Id = 3, UserId = 1, Year = 2024, Month = 5, Day = 1, StudyTime = 10},
            new Activity() {Id = 4, UserId = 1, Year = 2024, Month = 4, Day = 30, StudyTime = 30},
            new Activity() {Id = 5, UserId = 1, Year = 2024, Month = 4, Day = 29, StudyTime = 15},
            new Activity() {Id = 6, UserId = 1, Year = 2024, Month = 4, Day = 28, StudyTime = 10},
            new Activity() {Id = 7, UserId = 1, Year = 2024, Month = 4, Day = 27, StudyTime = 5},
            new Activity() {Id = 8, UserId = 1, Year = 2024, Month = 4, Day = 26, StudyTime = 1},
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

        public static Module? GetModule(int moduleId)
        {
            return Modules.FirstOrDefault(module => module.Id == moduleId);
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

        public static List<FavoriteModule> GetFavoriteModules(int userId)
        {
            return (from module in FavoriteModules
                    where module.UserId == userId
                    select module).ToList();
        }

        public static void AddFavoriteModule(int userId, int moduleId)
        {
            int id = FavoriteModules.Max(m => m.Id) + 1;

            FavoriteModule module = new FavoriteModule()
            {
                Id = id,
                UserId = userId,
                ModuleId = moduleId
            };

            FavoriteModules.Add(module);
        }

        public static void RemoveFavoriteModule(int userId, int moduleId) 
        {
            FavoriteModule? module = FavoriteModules.FirstOrDefault(m => m.UserId == userId && m.ModuleId == moduleId);

            if (module == null) return;

            FavoriteModules.Remove(module);
        }

        public static List<Activity> GetActivities(int userId)
        {
            return (from activity in Activities
                    where activity.UserId == userId
                    orderby new DateTime(activity.Year, activity.Month, activity.Day) descending
                    select activity).ToList();
        }

        public static Activity? GetActivity(int userId, int year, int month, int day)
        {
            Activity? activity = Activities.FirstOrDefault(a =>
                a.UserId == userId &&
                a.Year == year &&
                a.Month == month &&
                a.Day == day);

            return activity;
        }

        public static Activity AddActivity(int userId, int year, int month, int day, int studyTime)
        {
            int id = Activities.Max(a => a.Id) + 1;

            Activity activity = new Activity() 
            {
                Id= id,
                UserId = userId,
                Year = year,
                Month = month,
                Day = day,
                StudyTime = studyTime
            };

            Activities.Add(activity);

            return activity;
        }

        public static bool UpdateActivity(int userId, int year, int month, int day, int studyTime)
        {
            Activity? activity = Activities.FirstOrDefault(a => 
                a.UserId == userId && 
                a.Year == year && 
                a.Month == month && 
                a.Day == day);

            if (activity == null) return false;

            activity.StudyTime = studyTime;

            return true;
        }
    }*/
}
