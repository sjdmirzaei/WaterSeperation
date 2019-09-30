using System;
using System.Collections.Generic;
using System.Text;

namespace Vegetation.DAL
{
    public interface IEntity<T>
    {
        T Id { get; set; }

    }
}
