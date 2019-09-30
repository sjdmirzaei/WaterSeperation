using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.Api.Models.Codeing;
using Vegetation.Api.Models.Main;
using Vegetation.DAL.Entities.Codeing;
using Vegetation.DAL.Entities.Main;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers.Main
{
    public class SpotController : VegetationAuthorizedBaseController
    {
        public SpotController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }


        [HttpPost]
        public IActionResult List(PageModel pageModel)
        {
            if (ModelState.IsValid)
            {
                if (pageModel.Page.HasValue)
                {
                    var list = UnitOfWork.SpotRepo.Get().OrderBy(rec => rec.Id).Skip((pageModel.Page.Value - 1) * 10)
                        .Take(10);
                    var count = UnitOfWork.SpotRepo.Get().Count();
                    return Ok(new
                    {
                        Data = list,
                        count
                    });
                }
                else
                {
                    var list = UnitOfWork.SpotRepo.Get().OrderBy(rec => rec.Id);

                    var count = UnitOfWork.SpotRepo.Get().Count();
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
        public IActionResult GetAllSpotBaseInfo()
        {
            if (ModelState.IsValid)
            {
                var listIrrigationMethod = UnitOfWork.IrrigationMethodRepo.Get().OrderBy(rec => rec.Id);
                var listRegion = UnitOfWork.RegionRepo.Get().OrderBy(rec => rec.Id);
                var listSpotType = UnitOfWork.SpotTypeRepo.Get().OrderBy(rec => rec.Id);
                var listTreaty = UnitOfWork.TreatyRepo.Get().OrderBy(rec => rec.Id);
                var listVegetationType = UnitOfWork.VegetationTypeRepo.Get().OrderBy(rec => rec.Id);

                return Ok(new
                {
                    listIrrigationMethod,
                    listRegion,
                    listSpotType,
                    listTreaty,
                    listVegetationType
                });
            }

            return BadRequest();

        }

        [HttpPost]
        public IActionResult Save(SpotModel repo)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.SpotRepo.Save(new Spot
                {
                    Id = repo.Id,
                    Name = repo.Name,
                    Code = repo.Code,
                    Address = repo.Address,
                    Space = repo.Space,
                    RegionId = repo.RegionId,
                    TreatyId = repo.TreatyId,
                    SpotTypeId = repo.SpotTypeId,
                    IrrigationMethodId = repo.IrrigationMethodId,
                    VegetationTypeId = repo.VegetationTypeId
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
                UnitOfWork.SpotRepo.Delete(new Spot { Id = id });

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