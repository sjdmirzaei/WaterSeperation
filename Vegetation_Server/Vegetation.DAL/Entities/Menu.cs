using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("Menus")]
    public class Menu : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Title { get; set; }

        public int SubsystemId { get; set; }

        public string Url { get; set; }

        public string Icon { get; set; }

        public int? ParentMenuId { get; set; }

        #endregion

        #region Navigators

        [ForeignKey("SubsystemId")]
        [InverseProperty("Menus")]
        public Subsystem Subsystem { get; set; }


        [ForeignKey("ParentMenuId")]
        [InverseProperty("ChildMenus")]
        public Menu ParentMenu { get; set; }

        public ICollection<Menu> ChildMenus { get; set; }

        #endregion

    }

}
