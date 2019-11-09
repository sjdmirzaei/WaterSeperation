using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("ReportColumns")]
    public class ReportColumn : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int ReportId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public bool IsSeparator { get; set; }

        [Required]
        public bool IsSum { get; set; }

        [Required]
        public bool IsAverage { get; set; }

        #endregion

        #region Navigators

        [ForeignKey("ReportId")]
        [InverseProperty("ReportColumns")]
        public virtual Report Report { get; set; }

        #endregion

    }
}
