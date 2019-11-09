using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Vegetation.DAL.library;

namespace Vegetation.DAL.Entities
{
    [Table("ReportParameters")]
    public class ReportParameter : IEntity<int>
    {
        #region Properties


        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Display(Name = "ارجاع به گزارشات")]
        public int ReportId { get; set; }

        [Required]
        [Display(Name = "عنوان پارامتر")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "نام پارامتر در کوئری")]
        public string Name { get; set; }

        [Display(Name = "ترتیب نمایش")]
        public int? Priority { get; set; }

        [Required]
        [Display(Name = "نوع پارامتر جهت نمایش")]
        public ParameterType Type { get; set; }

        [Display(Name = "کوئری برای لیست")]
        public string Query { get; set; }

        [Required]
        [Display(Name = "حالت اختیاری یا اجباری")]
        public bool IsOptional { get; set; }

        [Display(Name = "عرض ستون بین 1-12")]
        public int? Width { get; set; }

        #endregion Properties

        #region Navigator

        [ForeignKey("ReportId")]
        [InverseProperty("ReportParameters")]
        public virtual Report Report { get; set; }

        public virtual ICollection<StaticItem> StaticItems { get; set; }

        #endregion Navigator
    }
}
