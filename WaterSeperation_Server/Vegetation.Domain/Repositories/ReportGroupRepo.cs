using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class ReportGroupRepo : Repository<ReportGroup, int>
    {
        public ReportGroupRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
