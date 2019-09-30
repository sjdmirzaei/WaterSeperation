using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.Domain.Repositories.Codeing
{
    /// <summary>
    /// نوع پوشش گیاهی - قلم
    /// </summary>
    public class VegetationTypeRepo : Repository<VegetationType, short>
    {
        public VegetationTypeRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }

    }
}
