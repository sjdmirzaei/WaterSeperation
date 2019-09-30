using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Vegetation.DAL.library;

namespace Vegetation.Api.Models
{
    public class ReportModel
    {
        public ReportViewModel Report { get; set; }

        public List<ReportColumnViewModel> ReportColumns { get; set; }

        public List<ReportParameterViewModel> ReportParameters { get; set; }

        public List<int> deleteColumns { get; set; }

        public List<int> deleteParameters { get; set; }
    }

    public class ReportViewModel
    {
        public int Id { get; set; }

        [Required]
        public int ReportGroupId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Query { get; set; }

        [Required]
        public bool HasPager { get; set; }

    }

    public class ReportColumnViewModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int ReportId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public bool IsSeparator { get; set; }

        [Required]
        public bool IsSum { get; set; }

        [Required]
        public bool IsAverage { get; set; }

        [Required]
        public bool Checked { get; set; }
    }

    public class ReportParameterViewModel
    {
        public int Id { get; set; }

        [Required]
        public int ReportId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Name { get; set; }

        public int? Priority { get; set; }

        public string Query { get; set; }

        [Required]
        public ParameterType Type { get; set; }

        [Required]
        public string TypeTitle { get; set; }

        [Required]
        public bool IsOptional { get; set; }

        public int? Width { get; set; }

        public List<StaticItemViewModel> StaticItems { get; set; }

        public string Value { get; set; }
    }

    public class StaticItemViewModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int ReportParameterId { get; set; }

        [Required]
        public string Value { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public bool IsDefault { get; set; }
    }
}