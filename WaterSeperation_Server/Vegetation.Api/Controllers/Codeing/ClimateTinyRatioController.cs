using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.Api.Models.Codeing;
using Vegetation.DAL.Entities.Codeing;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers.Codeing
{
    public class ClimateTinyRatioController : VegetationAuthorizedBaseController
    {
        public ClimateTinyRatioController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }


        [HttpPost]
        public IActionResult List(PageModel pageModel)
        {
            if (ModelState.IsValid)
            {
                if (pageModel.Page.HasValue)
                {
                    var list = UnitOfWork.ClimateTinyRatioRepo.Get().OrderBy(rec => rec.Id).Skip((pageModel.Page.Value - 1) * 10).Take(10);
                    var count = UnitOfWork.ClimateTinyRatioRepo.Get().Count();
                    return Ok(new
                    {
                        Data = list, count
                    });
                }
                else
                {
                    var list = UnitOfWork.ClimateTinyRatioRepo.Get().OrderBy(rec => rec.Id);

                    var count = UnitOfWork.ClimateTinyRatioRepo.Get().Count();
                    return Ok(new
                    {
                        Data = list, count
                    });
                }
            }

            return BadRequest();
        }

        [HttpPost]
        public IActionResult Save(ClimateTinyRatioModel repo)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.ClimateTinyRatioRepo.Save(new ClimateTinyRatio
                {
                    Id = repo.Id,
                    Name = repo.Name,
                    Description = repo.Description,
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
        public IActionResult Delete(short id)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.ClimateTinyRatioRepo.Delete(new ClimateTinyRatio { Id = id });

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