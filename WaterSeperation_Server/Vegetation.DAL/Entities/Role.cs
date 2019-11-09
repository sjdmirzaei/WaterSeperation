using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("Roles")]
    public class Role : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Title { get; set; }


        #endregion

        #region Navigators

        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<RolesSubsystems> RoleSubsystems { get; set; }
        #endregion

    }
}
