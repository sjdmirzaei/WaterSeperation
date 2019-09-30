using System.ComponentModel.DataAnnotations;
using Vegetation.DAL;

namespace Vegetation.Api.Models.Codeing
{
    /// <summary>
    /// ضریب میزان خرد اقلیم 
    /// </summary>
    public class ClimateTinyRatioModel
    {
        #region Properties

        public short Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Description { get; set; }

        #endregion

    }

}
