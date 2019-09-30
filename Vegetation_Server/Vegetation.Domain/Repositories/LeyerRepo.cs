using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class LeyerRepo : Repository<Leyer, int>
    {
        public LeyerRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }

    }
}
