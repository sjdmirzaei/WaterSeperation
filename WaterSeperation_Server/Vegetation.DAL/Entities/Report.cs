using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vegetation.DAL.Entities
{
    [Table("Reports")]
    public class Report : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Display(Name = "ارجاع به گروه گزارشات")]
        public int ReportGroupId { get; set; }

        [Required]
        [Display(Name = "عنوان گزارش")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "کوئری گزارش")]
        public string Query { get; set; }

        [Display(Name = "ستون هایی که حاصل جمع دارند")]
        public string SumColumns { get; set; }

        [Display(Name = "ستون هایی که در گزارش دیده شوند")]
        public string ViewColumns { get; set; }

        [Required]
        [Display(Name = "صفحه بندی")]
        public bool HasPager { get; set; }

        #endregion Properties

        #region Navigator

        [ForeignKey("ReportGroupId")]
        [InverseProperty("Reports")]
        public virtual ReportGroup ReportGroup { get; set; }

        public virtual ICollection<ReportParameter> ReportParameters { get; set; }

        public virtual ICollection<ReportColumn> ReportColumns { get; set; }

        #endregion Navigator
    }
}
