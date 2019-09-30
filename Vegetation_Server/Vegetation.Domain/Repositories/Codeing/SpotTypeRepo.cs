using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.Domain.Repositories.Codeing
{
    /// <summary>
    /// نوع لکه فضای سبز
    /// </summary>
    public class SpotTypeRepo : Repository<SpotType, short>
    {
        public SpotTypeRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }


    }
}
