using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.DAL.Entities;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers
{
    public class ReportGroupsController : VegetationAuthorizedBaseController
    {
        public ReportGroupsController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        [HttpPost]
        public IActionResult List(PageModel model)
        {
            if (ModelState.IsValid)
            {

                if (model.Page.HasValue)
                {
                    var list = UnitOfWork.ReportGroupRepo.Get().OrderBy(rec => rec.Id).Skip((model.Page.Value - 1) * 10).Take(10);
                    var count = UnitOfWork.ReportGroupRepo.Get().Count();
                    return Ok(new
                    {
                        list = list,
                        count = count
                    });
                }
                else
                {
                    var list = UnitOfWork.ReportGroupRepo.Get().OrderBy(rec => rec.Id);
                    var count = UnitOfWork.ReportGroupRepo.Get().Count();
                    return Ok(new
                    {
                        list = list,
                        count = count
                    });
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Save([FromBody] ReportGroupModel model)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.ReportGroupRepo.Save(new ReportGroup()
                {
                    Id = model.Id,
                    Name = model.Name,
                    Title = model.Title,
                    Icon = model.Icon
                });

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

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.ReportGroupRepo.Delete(new ReportGroup { Id = id });
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
    }
}