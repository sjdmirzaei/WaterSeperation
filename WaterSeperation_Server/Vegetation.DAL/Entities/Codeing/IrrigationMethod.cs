using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Vegetation.DAL.Entities.Main;

namespace Vegetation.DAL.Entities.Codeing
{
    /// <summary>
    /// روش آبیاری
    /// </summary>
    [Table("IrrigationMethods")]
    public class IrrigationMethod : IEntity<short>
    {
        #region Properties
        
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public short Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }


        /// <summary>
        /// کدی که هیدروتک در نظر گرفته است
        /// </summary>
        [Required]
        [MaxLength(1)]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Description { get; set; }

        #endregion

        #region Navigators

        //[ForeignKey("SubsystemId")]
        //[InverseProperty("Leyers")]
        //public Subsystem Subsystem { get; set; }

        public ICollection<Spot> Spots { get; set; }

        #endregion

    }
}
