using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities.Codeing
{
    /// <summary>
    /// ضریب میزان خرد اقلیم 
    /// </summary>
    [Table("ClimateTinyRatios")]
    public class ClimateTinyRatio : IEntity<short>
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

        #endregion

        #region Navigators

        //[ForeignKey("SubsystemId")]
        //[InverseProperty("Leyers")]
        //public Subsystem Subsystem { get; set; }

        #endregion

    }

}
