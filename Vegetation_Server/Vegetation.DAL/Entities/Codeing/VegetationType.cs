using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Vegetation.DAL.Entities.Main;

namespace Vegetation.DAL.Entities.Codeing
{
    /// <summary>
    /// نوع پوشش گیاهی - قلم
    /// </summary>
    [Table("VegetationTypes")]
    public class VegetationType : IEntity<short>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public short Id { get; set; }

        [Required] [MaxLength(50)] public string Name { get; set; }


        /// <summary>
        /// کدی که هیدروتک در نظر گرفته است
        /// </summary>
        [Required]
        [MaxLength(1)]
        public string Code { get; set; }

        [Required] [MaxLength(100)] public string Description { get; set; }

        public short SpecieId { get; set; }

        #endregion

        #region Navigators

        public ICollection<Specie> Species { get; set; }
        public ICollection<Spot> Spots { get; set; }

        #endregion
    }
}
