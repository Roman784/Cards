namespace backend.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public int StudyTime { get; set; }
    }
}
