using backend.Storage;

namespace backend.Repositories
{
    public class Repository
    {
        protected readonly WebCardsContext DbContext;

        public Repository(WebCardsContext dbContext)
        {
            DbContext = dbContext;
        }
    }
}
