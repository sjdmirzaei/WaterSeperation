using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.DAL.Entities;
using Vegetation.DAL.library;
using Vegetation.Domain;
using Vegetation.Domain.Services.Report;

namespace Vegetation.Api.Controllers
{
    public class ReportsController : VegetationAuthorizedBaseController
    {

        private ReportService ReportService { get; }
        public ReportsController(UnitOfWork unitOfWork, ReportService reportService) : base(unitOfWork)
        {
            this.ReportService = reportService;
        }

        [HttpPost]
        public IActionResult List(int page)
        {
            if (ModelState.IsValid)
            {
                var list = UnitOfWork.ReportRepo.Get().Include(rec => rec.ReportGroup).OrderBy(rec => rec.Id).Skip((page - 1) * 10).Take(10).Select(rec => new
                {
                    id = rec.Id,
                    reportGroupTitle = rec.ReportGroup.Title,
                    title = rec.Title
                }).ToList();
                var count = UnitOfWork.ReportRepo.Get().Count();
                return Ok(new
                {
                    list = list,
                    count = count
                });
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Get(int id)
        {
            try
            {
                var report = UnitOfWork.ReportRepo.Get().Include(rec => rec.ReportColumns).Include(rec => rec.ReportParameters).ThenInclude(rec => rec.StaticItems).SingleOrDefault(rec => rec.Id == id);

                var reportViewModel = new ReportViewModel()
                {
                    Id = report.Id,
                    ReportGroupId = report.ReportGroupId,
                    Title = report.Title,
                    Query = report.Query,
                    HasPager = report.HasPager
                };

                return Ok(new
                {
                    report = reportViewModel,
                    ReportColumns = report.ReportColumns.Select(rec => new ReportColumnViewModel
                    {
                        Id = rec.Id,
                        ReportId = rec.ReportId,
                        Title = rec.Title,
                        IsSeparator = rec.IsSeparator,
                        IsSum = rec.IsSum,
                        IsAverage = rec.IsAverage

                    }).ToList(),
                    reportParameters = report.ReportParameters.Select(rec => new ReportParameterViewModel
                    {
                        Id = rec.Id,
                        ReportId = rec.ReportId,
                        Name = rec.Name,
                        Title = rec.Title,
                        Type = rec.Type,
                        TypeTitle = rec.Type.GetDisplay(),
                        Priority = rec.Priority,
                        IsOptional = rec.IsOptional,
                        Query = rec.Query,
                        Width = rec.Width,
                        StaticItems = rec.StaticItems.Select(rec1 => new StaticItemViewModel
                        {
                            Id = rec1.Id,
                            ReportParameterId = rec1.ReportParameterId,
                            Text = rec1.Text,
                            Value = rec1.Value,
                            IsDefault = rec1.IsDefault

                        }).ToList()

                    }).ToList()
                });
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult Save([FromBody] ReportModel model)
        {
            if (ModelState.IsValid)
            {
                Report report;

                report = model.Report.Id == 0
                    ? new Report()
                    : UnitOfWork.ReportRepo.Single(rec => rec.Id == model.Report.Id);

                report.Id = model.Report.Id;
                report.ReportGroupId = model.Report.ReportGroupId;
                report.Title = model.Report.Title;
                report.Query = model.Report.Query;
                report.HasPager = model.Report.HasPager;

                var reportId = UnitOfWork.ReportRepo.Save(report).Id;

                UnitOfWork.ReportColumnRepo.DeleteAll(rec => model.deleteColumns.Contains(rec.Id));
                foreach (var item in model.ReportColumns)
                {
                    if (!string.IsNullOrEmpty(item.Title))
                    {
                        ReportColumn reportColumn = new ReportColumn();

                        if (item.Id < 0)
                            item.Id = 0;

                        reportColumn.Id = item.Id;
                        reportColumn.ReportId = reportId;
                        reportColumn.Title = item.Title;
                        reportColumn.IsSeparator = item.IsSeparator;
                        reportColumn.IsSum = item.IsSum;
                        reportColumn.IsAverage = item.IsAverage;

                        UnitOfWork.ReportColumnRepo.Save(reportColumn);
                    }
                }

                UnitOfWork.ReportParameterRepo.DeleteAll(rec => model.deleteParameters.Contains(rec.Id));
                foreach (var item in model.ReportParameters)
                {
                    if (!string.IsNullOrEmpty(item.Name) && !string.IsNullOrEmpty(item.Title))
                    {
                        ReportParameter reportParameter = new ReportParameter();

                        reportParameter.Query =
                            item.Type == ParameterType.DynamicList && !string.IsNullOrEmpty(item.Query)
                                ? item.Query
                                : null;

                        if (item.Id < 0)
                            item.Id = 0;

                        reportParameter.Id = item.Id;
                        reportParameter.ReportId = reportId;
                        reportParameter.Title = item.Title;
                        reportParameter.Name = item.Name;
                        reportParameter.Priority = item.Priority;
                        reportParameter.Type = item.Type;
                        reportParameter.Width = item.Width;
                        reportParameter.IsOptional = item.IsOptional;

                        UnitOfWork.ReportParameterRepo.Save(reportParameter);

                        UnitOfWork.StaticItemRepo.DeleteAll(rec => rec.ReportParameterId == reportParameter.Id);

                        if (item.Type == ParameterType.StaticList || item.Type == ParameterType.Check)
                            foreach (var prop in item.StaticItems)
                            {
                                UnitOfWork.StaticItemRepo.Save(new StaticItem
                                {
                                    Id = 0,
                                    ReportParameterId = reportParameter.Id,
                                    Value = prop.Value,
                                    Text = prop.Text,
                                    IsDefault = prop.IsDefault
                                });
                            }
                    }
                }
                try
                {
                    UnitOfWork.Save();
                    return Ok();
                }
                catch
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }


        [HttpDelete]
        public ActionResult Delete(int id)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.ReportRepo.Delete(new Report { Id = id });

                try
                {
                    UnitOfWork.Save();
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult GetByExecute(int id)
        {
            try
            {
                var report = UnitOfWork.ReportRepo.Get().Include(rec => rec.ReportColumns).Include(rec => rec.ReportParameters).ThenInclude(rec => rec.StaticItems).SingleOrDefault(rec => rec.Id == id);

                var result = new
                {
                    report = new ReportViewModel()
                    {
                        Id = report.Id,
                        ReportGroupId = report.ReportGroupId,
                        Title = report.Title,
                        Query = report.Query,
                        HasPager = report.HasPager
                    },
                    ReportColumns = report.ReportColumns.Select(rec => new ReportColumnViewModel
                    {
                        Id = rec.Id,
                        ReportId = rec.ReportId,
                        Title = rec.Title,
                        IsSeparator = rec.IsSeparator,
                        IsSum = rec.IsSum,
                        IsAverage = rec.IsAverage

                    }).ToList(),
                    reportParameters = report.ReportParameters.Select(rec => new ReportParameterViewModel
                    {
                        Id = rec.Id,
                        ReportId = rec.ReportId,
                        Name = rec.Name,
                        Title = rec.Title,
                        Type = rec.Type,
                        TypeTitle = rec.Type.GetDisplay(),
                        Priority = rec.Priority,
                        IsOptional = rec.IsOptional,
                        Query = rec.Query,
                        Width = rec.Width,
                        StaticItems = rec.StaticItems.Select(rec1 => new StaticItemViewModel
                        {
                            Id = rec1.Id,
                            ReportParameterId = rec1.ReportParameterId,
                            Text = rec1.Text,
                            Value = rec1.Value,
                            IsDefault = rec1.IsDefault

                        }).ToList()

                    }).ToList()
                };

                foreach (var item in result.reportParameters)
                {
                    if (item.Type == ParameterType.DynamicList)
                    {
                        var table = this.ReportService.Execute(item.Query, null);

                        foreach (DataRow row in table.Rows)
                        {
                            var staticitem = new StaticItemViewModel();
                            foreach (DataColumn column in table.Columns)
                            {
                                if (column.ColumnName.ToLower() == "key")
                                    staticitem.Value = row[column.ColumnName].ToString();
                                if (column.ColumnName.ToLower() == "value")
                                    staticitem.Text = row[column.ColumnName].ToString();
                            }
                            item.StaticItems.Add(staticitem);
                        }
                    }
                }

                return Ok(new
                {
                    result
                });
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Execute([FromBody] ReportModel model)
        {
            try
            {

                var paramList = model.ReportParameters.Select(rec => new Vegetation.Domain.Services.Report.Parameter
                {
                    Key = rec.Name,
                    Value = rec.Value
                }).ToList();

                var table = this.ReportService.Execute(model.Report.Query, paramList);
                DataRow sumRow = table.NewRow();
                DataRow avgRow = table.NewRow();

                foreach (var colprop in model.ReportColumns)
                    if (!colprop.Checked)
                        table.Columns.Remove(colprop.Title);

                foreach (var colprop in model.ReportColumns)
                    foreach (DataColumn column in table.Columns)
                    {
                        if (colprop.Title == column.ColumnName && colprop.IsSum)
                            try
                            {
                                sumRow[column.ColumnName] = table.Compute("Sum(" + column.ColumnName + ")", string.Empty);
                            }
                            catch
                            { }

                        if (colprop.Title == column.ColumnName && colprop.IsAverage)
                            try
                            {
                                avgRow[column.ColumnName] = table.Compute("AVG(" + column.ColumnName + ")", string.Empty);
                            }
                            catch
                            { }
                    }

                var result = new List<Vegetation.Domain.Services.Report.Parameter>();

                foreach (var colprop in model.ReportColumns)
                {
                    foreach (DataRow row in table.Rows)
                        foreach (DataColumn column in table.Columns)
                            if (colprop.IsSeparator)
                                try
                                {
                                    row[column.ColumnName] = String.Format("{0:N0}", row[column.ColumnName]);
                                }
                                catch
                                { }
                }

                return Ok(new
                {
                    columns = table.Columns,
                    rows = table.Rows,
                    sumRow = sumRow,
                    avgRow = avgRow
                });
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}