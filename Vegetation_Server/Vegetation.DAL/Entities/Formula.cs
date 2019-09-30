using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vegetation.DAL.Entities
{

    [Table("Formulas")]
    public class Formula : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Display(Name = "عنوان فارسی")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "عنوان لاتین")]
        public string Name { get; set; }


        [Display(Name = "شناسه")]
        [RegularExpression(@"[a-zA-Z]+[a-zA-Z0-9]*\(([a-zA-Z]+[a-zA-Z0-9]*(\,[a-zA-Z]+[a-zA-Z0-9]*)*)?\)")]
        public string Index { get; set; }

        [Display(Name = "لیست پارامترها")]
        [RegularExpression(@"(^$|([a-zA-Z]+[a-zA-Z0-9]*(\,[a-zA-Z]+[a-zA-Z0-9]*)*))")]
        public string Parameters { get; set; }

        [Required]
        [Display(Name = "بدنه فرمول")]
        public string Content { get; set; }

        #endregion       

    }
}