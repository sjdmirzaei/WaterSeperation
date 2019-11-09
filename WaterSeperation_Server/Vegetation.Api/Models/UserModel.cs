using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Vegetation.Api.Models
{
    public class UserModel
    {
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

         public List<RoleModel> roles {get; set;}



    }
}