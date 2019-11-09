using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class ReportColumnRepo : Repository<ReportColumn, int>
    {
        public ReportColumnRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }

    }
}
