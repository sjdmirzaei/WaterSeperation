using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Vegetation.Api.Models
{
    public class MenuModel
    {
        public int Id { get; set; }

        public int? Parentmenuid { get; set; }

        [Required]
        public int SubsystemId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Title { get; set; }

        public string Icon { get; set; }

        public string Url { get; set; }

        public bool HasChild { get; set; }

        public List<ChildMenuModel> Chlilds { get; set; }
        public SubsystemModel Subsystem { get; set; }

    }

    public class ChildMenuModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Title { get; set; }

        public string Icon { get; set; }

        public string Url { get; set; }
    }

    public class SubsystemModel
    {
        public int Id { get; set; }
    }

}
