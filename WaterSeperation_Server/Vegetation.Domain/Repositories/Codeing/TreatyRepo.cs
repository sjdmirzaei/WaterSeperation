using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.Domain.Repositories.Codeing
{
    /// <summary>
    /// نوع پیمان
    /// </summary>
    public class TreatyRepo : Repository<Treaty, short>
    {
        public TreatyRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }


    }
}
