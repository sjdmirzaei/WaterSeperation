using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Vegetation.Api.Models
{
    public class SubSystemModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Title { get; set; }

        public string Icon { get; set; }

        public List<MenuModel> Menus { get; set; }
    }
}