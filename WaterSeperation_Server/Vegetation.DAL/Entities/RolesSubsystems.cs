using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("RolesSubsystem")]
    public class RolesSubsystems : IEntity<int>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int SubsystemRefID { get; set; }

        public int RoleRefID { get; set; }

        #region Navigators

        [ForeignKey("SubsystemRefID")]
        [InverseProperty("RoleSubsystems")]
        public Subsystem Subsystem { get; set; }

        [ForeignKey("RoleRefID")]
        [InverseProperty("RoleSubsystems")]
        public Role Role { get; set; }


        #endregion

    }
}
