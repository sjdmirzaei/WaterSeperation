using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("SubSystem")]
    public class SubSystem : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Title { get; set; }

        public string Icon { get; set; }

        public int Order { get; set; }

        public short Active{ get; set; }

        public int? ParentId { get; set; }

        #endregion

        #region Navigators

        public ICollection<UserRole> UserRoles { get; set; }

        #endregion

    }
}
