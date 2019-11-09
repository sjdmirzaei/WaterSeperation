using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class ReportRepo:Repository<Report, int>
    {
        public ReportRepo(VegetationDbContext dbContext):base(dbContext)
        {
        }
    }
}
