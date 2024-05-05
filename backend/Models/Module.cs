using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Module
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string? Title { get; set; }

    public long Access { get; set; }

    public virtual ICollection<Card> Cards { get; set; } = new List<Card>();

    public virtual ICollection<FavoriteModule> FavoriteModules { get; set; } = new List<FavoriteModule>();

    public virtual User User { get; set; } = null!;
}
