using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
   public class UserRoleRepo : Repository<UserRole, int>
   {
       public UserRoleRepo(VegetationDbContext dbContext) : base(dbContext)
       {
       }
    }
}
