using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class RoleRepo : Repository<Role, int>
    {
        public RoleRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
