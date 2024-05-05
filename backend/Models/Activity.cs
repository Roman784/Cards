using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Activity
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public long Year { get; set; }

    public long Month { get; set; }

    public long Day { get; set; }

    public long StudyTime { get; set; }

    public virtual User User { get; set; } = null!;
}
