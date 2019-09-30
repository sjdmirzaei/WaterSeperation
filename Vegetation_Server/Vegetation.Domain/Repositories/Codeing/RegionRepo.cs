using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.Domain.Repositories.Codeing
{
    /// <summary>
    /// منطقه - ناحیه
    /// </summary>
    public class RegionRepo : Repository<Region, short>
    {
        public RegionRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
