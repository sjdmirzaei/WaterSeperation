using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.Domain.Repositories.Codeing
{
    /// <summary>
    /// ضریب میزان تراکم
    /// </summary>
    public class DensityRatioRepo : Repository<DensityRatio, short>
    {
        public DensityRatioRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }

    }
}
