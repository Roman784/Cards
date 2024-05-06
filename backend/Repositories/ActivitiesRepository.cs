using backend.Models;
using backend.Storage;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ActivitiesRepository : Repository
    {
        public ActivitiesRepository(WebCardsContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Activity>> GetActivities(long userId)
        {
            return await (from activity in DbContext.Activities
                    where activity.UserId == userId
                    orderby new DateTime((int)activity.Year, (int)activity.Month, (int)activity.Day) descending
                    select activity).ToListAsync();
        }

        public async Task<Activity?> GetActivity(int userId, int year, int month, int day)
        {
            Activity? activity = await DbContext.Activities.FirstOrDefaultAsync(a =>
                a.UserId == userId &&
                a.Year == year &&
                a.Month == month &&
                a.Day == day);

            return activity;
        }

        public async Task<Activity> AddActivity(int userId, int year, int month, int day, int studyTime)
        {
            Activity activity = new Activity()
            {
                UserId = userId,
                Year = year,
                Month = month,
                Day = day,
                StudyTime = studyTime
            };

            await DbContext.Activities.AddAsync(activity);
            await DbContext.SaveChangesAsync();

            return activity;
        }

        public async Task<bool> UpdateActivity(int userId, int year, int month, int day, int studyTime)
        {
            Activity? activity = await DbContext.Activities.FirstOrDefaultAsync(a =>
                a.UserId == userId &&
                a.Year == year &&
                a.Month == month &&
                a.Day == day);

            if (activity == null) return false;

            activity.StudyTime = studyTime;

            await DbContext.SaveChangesAsync();

            return true;
        }
    }
}
