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
    public class RegionController  : VegetationAuthorizedBaseController
    {
        public RegionController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }


        [HttpPost]
        public IActionResult List(PageModel pageModel)
        {
            if (ModelState.IsValid)
            {
                if (pageModel.Page.HasValue)
                {
                    var list = UnitOfWork.RegionRepo.Get().OrderBy(rec => rec.Id).Skip((pageModel.Page.Value - 1) * 10).Take(10);
                    var count = UnitOfWork.RegionRepo.Get().Count();
                    return Ok(new
                    {
                        Data = list,
                        count
                    });
                }
                else
                {
                    var list = UnitOfWork.RegionRepo.Get().OrderBy(rec => rec.Id);

                    var count = UnitOfWork.RegionRepo.Get().Count();
                    return Ok(new
                    {
                        Data = list,
                        count
                    });
                }
            }

            return BadRequest();
        }

        [HttpPost]
        public IActionResult Save(RegionModel repo)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.RegionRepo.Save(new Region
                {
                    Id = repo.Id,
                    Name = repo.Name,
                    Description = repo.Description,
                    Code = repo.Code
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
                UnitOfWork.RegionRepo.Delete(new Region { Id = id });

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