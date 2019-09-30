using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("Subsystems")]
    public class Subsystem : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Title { get; set; }

        public string Icon { get; set; }

        #endregion

        #region Navigators

        public ICollection<Menu> Menus { get; set; }

        public ICollection<Leyer> Leyers { get; set; }

        #endregion

    }
}
