using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class SubsystemRepo : Repository<Subsystem, int>
    {
        public SubsystemRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
