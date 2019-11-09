using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.Domain.Repositories.Codeing
{
    /// <summary>
    /// ضریب میزان خرد اقلیم 
    /// </summary>
    public class ClimateTinyRatioRepo : Repository<ClimateTinyRatio, short>
    {
        public ClimateTinyRatioRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
