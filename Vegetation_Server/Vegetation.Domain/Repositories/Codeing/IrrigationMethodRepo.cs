using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.Domain.Repositories.Codeing
{
    /// <summary>
    /// روش آبیاری
    /// </summary>
    public class IrrigationMethodRepo : Repository<IrrigationMethod, short>
    {
        public IrrigationMethodRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }


    }
}
