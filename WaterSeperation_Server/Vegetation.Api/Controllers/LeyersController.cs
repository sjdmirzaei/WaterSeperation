using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.DAL.Entities;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers
{
    public class LeyersController : VegetationAuthorizedBaseController
    {
        public LeyersController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        [HttpPost]
        public IActionResult List([FromBody]PageModel pageModel)
        {
            if (ModelState.IsValid)
            {
                var list = UnitOfWork.LeyerRepo.Get().OrderBy(rec => rec.Id).Take(10).Select(rec => new   //Skip((pageModel.Page.Value - 1) * 10)
                {
                    rec.Id,
                    rec.Name,
                    rec.Title,
                    rec.Url,
                    rec.Visible,
                    rec.Symbol,
                    rec.Type,
                    rec.Color,
                    rec.SubsystemId
                }).ToList();
                var count = UnitOfWork.LeyerRepo.Get().Count();
                return Ok(new
                {
                    list,
                    count
                });
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult GetSubSystemLeyers(int subSystemId)
        {
            if (ModelState.IsValid)
            {
                var list = UnitOfWork.LeyerRepo.Get().Where(q => q.SubsystemId == subSystemId).OrderBy(rec => rec.Id).Select(rec => new
                {
                    rec.Id,
                    rec.Name,
                    rec.Title,
                    rec.Url,
                    rec.Visible,
                    rec.Symbol,
                    rec.Type,
                    rec.Color,
                    rec.SubsystemId
                }).ToList();
                var count = UnitOfWork.LeyerRepo.Get().Count();
                return Ok(new
                {
                    list,
                    count
                });
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Save(LeyerModel LeyersModel)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.LeyerRepo.Save(new Leyer()
                {
                    Id = LeyersModel.Id,
                    Name = LeyersModel.Name,
                    Title = LeyersModel.Title,
                    Url = LeyersModel.Url,
                    Visible = LeyersModel.Visible,
                    Symbol = LeyersModel.Symbol,
                    Type = LeyersModel.Type,
                    Color = LeyersModel.Color,
                    SubsystemId = 3
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
                UnitOfWork.LeyerRepo.Delete(new Leyer { Id = id });
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