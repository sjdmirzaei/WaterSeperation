using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Vegetation.DAL;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.Api.Models.Main
{
    /// <summary>
    /// مشخصات لکه فضای سبز
    /// </summary>
    public class SpotModel 
    {
        #region Properties

        public int Id { get; set; }

        [Required] [MaxLength(50)] public string Name { get; set; }

        /// <summary>
        /// کدی که هیدروتک در نظر گرفته است
        /// </summary>
        [Required]
        [MaxLength(10)]
        public string Code { get; set; }

        [Required] [MaxLength(100)] public string Address { get; set; }

        /// <summary>
        /// مساحت لکه مورد نظر
        /// </summary>
        [Required]
        [MaxLength(100)]
        public int Space { get; set; }

        public short RegionId { get; set; }
        public short TreatyId { get; set; }
        public short SpotTypeId { get; set; }
        public short IrrigationMethodId { get; set; }
        public short VegetationTypeId { get; set; }

        #endregion

    }
}
