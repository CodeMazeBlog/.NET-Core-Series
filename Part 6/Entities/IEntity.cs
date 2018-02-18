using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public interface IEntity
    {
        Guid Id { get; set; }
    }
}
