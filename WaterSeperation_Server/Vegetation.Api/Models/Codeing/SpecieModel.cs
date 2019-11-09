using System.ComponentModel.DataAnnotations;
using Vegetation.DAL;

namespace Vegetation.Api.Models.Codeing
{
    /// <summary>
    /// گونه گیاهی
    /// </summary>
    public class SpecieModel 
    {
        #region Properties

        public short Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Description { get; set; }

        public short VegetationTypeId { get; set; }

        #endregion

    }
}
