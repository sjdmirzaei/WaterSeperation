using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities.Codeing
{
    /// <summary>
    /// گونه گیاهی
    /// </summary>
    [Table("Species")]
    public class Specie : IEntity<short>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public short Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string Description { get; set; }

        public short VegetationTypeId { get; set; }

        #endregion

        #region Navigators

        [ForeignKey("VegetationTypeId")]
        [InverseProperty("Species")]
        public VegetationType VegetationType { get; set; }

        #endregion

    }
}
