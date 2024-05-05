using System;
using System.Collections.Generic;

namespace backend;

public partial class FavoriteModule
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public long ModuleId { get; set; }

    public virtual Module Module { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
