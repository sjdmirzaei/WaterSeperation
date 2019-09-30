using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Main;

namespace Vegetation.Domain.Repositories.Main
{
    /// <summary>
    /// مشخصات لکه فضای سبز
    /// </summary>
    public class SpotRepo : Repository<Spot, int>
    {
        public SpotRepo(VegetationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
