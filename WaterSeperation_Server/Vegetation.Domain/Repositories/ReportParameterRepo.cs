using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class ReportParameterRepo : Repository<ReportParameter, int>
    {
        public ReportParameterRepo(VegetationDbContext dbContext) : base(dbContext)
        {

        }
    }
}
