using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("Leyer")]
    public class Leyer : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Title { get; set; }


        [Required]
        [MaxLength(100)]
        public string Url { get; set; }

        public bool Visible { get; set; }

        [MaxLength(100)]
        public string Symbol { get; set; }

        [MaxLength(10)]
        public string Type { get; set; }

        [MaxLength(30)]
        public string Color { get; set; }

        [Required]
        public int SubsystemId { get; set; }
        #endregion

        #region Navigators

        //[ForeignKey("SubsystemId")]
        //[InverseProperty("Layers")]
        //public Subsystem Subsystem { get; set; }

        [ForeignKey("SubsystemId")]
        [InverseProperty("Leyers")]
        public Subsystem Subsystem { get; set; }

        #endregion

    }
}
