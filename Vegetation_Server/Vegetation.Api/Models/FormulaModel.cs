using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Vegetation.Api.Models
{
    public class FormulaModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [Display(Name = "عنوان فارسی")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "عنوان لاتین")]
        public string Name { get; set; }

        [Display(Name = "شناسه")]
        public string Index { get; set; }

        [Display(Name = "لیست پارامترها")]
        public string Parameters { get; set; }

        [Required]
        [Display(Name = "بدنه فرمول")]
        public string Content { get; set; }
    }

}
