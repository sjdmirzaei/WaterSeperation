using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.Domain.Repositories.Codeing
{
    /// <summary>
    /// گونه گیاهی
    /// </summary>
    public class SpecieRepo : Repository<Specie, short>
    {
        public SpecieRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }

    }
}
