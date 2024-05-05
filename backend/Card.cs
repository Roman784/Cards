using System;
using System.Collections.Generic;

namespace backend;

public partial class Card
{
    public long Id { get; set; }

    public long ModuleId { get; set; }

    public string? Term { get; set; }

    public string? Definition { get; set; }

    public virtual Module Module { get; set; } = null!;
}
