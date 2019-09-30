using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class MenuRepo : Repository<Menu, int>
    {
        public MenuRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }

    }
}
