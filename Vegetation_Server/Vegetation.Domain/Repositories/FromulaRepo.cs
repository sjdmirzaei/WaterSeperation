using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities;

namespace Vegetation.Domain.Repositories
{
    public class FormulaRepo : Repository<Formula , int>
    {

        public FormulaRepo(VegetationDbContext dbContext) : base(dbContext)
        {            
        }      

    }
}