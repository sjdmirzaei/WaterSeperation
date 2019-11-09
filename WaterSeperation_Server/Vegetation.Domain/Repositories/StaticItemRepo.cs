using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class StaticItemRepo : Repository<StaticItem, int>
    {
        public StaticItemRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
