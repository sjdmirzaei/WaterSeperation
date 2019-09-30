using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Vegetation.DAL.Entities
{
    [Table("Users")]
    public class User : IEntity<int>
    {
        #region Properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Family { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public bool? Deactivated { get; set; }

        [NotMapped]
        public string FullName
        {
            get
            {

                return string.Format("{0} {1}", this.Name, this.Family);

            }
        }


        #endregion

        #region Navigators

        public ICollection<UserRole> UserRoles { get; set; }

        #endregion

    }
}
