using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("ReportGroups")]
    public class ReportGroup : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Display(Name = "عنوان لاتین گروه گزارشات")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "عنوان گروه گزارشات")]
        public string Title { get; set; }

        public string Icon { get; set; }

        #endregion Properties

        #region Navigator

        public virtual ICollection<Report> Reports { get; set; }

        #endregion Navigator
    }
}
