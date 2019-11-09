namespace Vegetation.Domain.Services
{
    public interface IService
    {
         UnitOfWork unitOfWork { get; set; }
    }
}