using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("UserRoles")]
    public class UserRole : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int RoleId { get; set; }

        #endregion

        #region Navigators

        [ForeignKey("UserId")]
        [InverseProperty("UserRoles")]
        public User User { get; set; }

        [ForeignKey("RoleId")]
        [InverseProperty("UserRoles")]
        public Role Role { get; set; }

        #endregion

    }
}
