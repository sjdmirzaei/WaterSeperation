using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("StaticItems")]
    public class StaticItem : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Display(Name = "ارجاع به پارامتر لیست ایستا")]
        public int ReportParameterId { get; set; }

        [Required]
        [Display(Name = "مقدار")]
        public string Value { get; set; }

        [Required]
        [Display(Name = "عنوان")]
        public string Text { get; set; }

        [Display(Name = "مقدار پیش فرض")]
        public bool IsDefault { get; set; }

        #endregion Properties

        #region Navigator

        [ForeignKey("ReportParameterId")]
        [InverseProperty("StaticItems")]
        public virtual ReportParameter ReportParameter { get; set; }

        #endregion Navigator
    }
}
