using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Vegetation.DAL.Entities.Codeing;

namespace Vegetation.DAL.Entities.Main
{
    /// <summary>
    /// مشخصات لکه فضای سبز
    /// </summary>
    [Table("Spots")]
    public class Spot : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

        #region Navigators

        [ForeignKey("RegionId")]
        [InverseProperty("Spots")]
        public Region Regiond { get; set; }

        [ForeignKey("TreatyId")]
        [InverseProperty("Spots")]
        public Treaty Treaty { get; set; }


        [ForeignKey("SpotTypeId")]
        [InverseProperty("Spots")]
        public SpotType SpotType { get; set; }

        [ForeignKey("IrrigationMethodId")]
        [InverseProperty("Spots")]
        public IrrigationMethod IrrigationMethod { get; set; }

        [ForeignKey("VegetationTypeId")]
        [InverseProperty("Spots")]
        public VegetationType VegetationType { get; set; }

        #endregion
    }
}
