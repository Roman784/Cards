using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class User
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();

    public virtual ICollection<FavoriteModule> FavoriteModules { get; set; } = new List<FavoriteModule>();

    public virtual ICollection<Module> Modules { get; set; } = new List<Module>();
}
