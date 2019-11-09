using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Vegetation.Api.Models
{
    public class LeyerModel
    {

        #region Properties

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

    }
}
