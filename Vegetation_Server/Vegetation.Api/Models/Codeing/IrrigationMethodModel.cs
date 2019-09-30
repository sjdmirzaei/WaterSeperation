using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Vegetation.DAL;

namespace Vegetation.Api.Models.Codeing
{
    /// <summary>
    /// روش آبیاری
    /// </summary>
    public class IrrigationMethodModel 
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

        [MaxLength(100)]
        public string Description { get; set; }

        #endregion

    }
}
