﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.Api.Models.Codeing;
using Vegetation.DAL.Entities.Codeing;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers.Codeing
{
    public class VegetationTypeController : VegetationAuthorizedBaseController
    {
        public VegetationTypeController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }


        [HttpPost]
        public IActionResult List(PageModel pageModel)
        {
            if (ModelState.IsValid)
            {
                if (pageModel.Page.HasValue)
                {
                    var list = UnitOfWork.VegetationTypeRepo.Get().OrderBy(rec => rec.Id).Skip((pageModel.Page.Value - 1) * 10).Take(10);
                    var count = UnitOfWork.VegetationTypeRepo.Get().Count();
                    return Ok(new
                    {
                        Data = list,
                        count
                    });
                }
                else
                {
                    var list = UnitOfWork.VegetationTypeRepo.Get().OrderBy(rec => rec.Id);

                    var count = UnitOfWork.VegetationTypeRepo.Get().Count();
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
        public IActionResult Save(VegetationTypeModel repo)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.VegetationTypeRepo.Save(new VegetationType
                {
                    Id = repo.Id,
                    Name = repo.Name,
                    Description = repo.Description,
                    Code = repo.Code,
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
                UnitOfWork.VegetationTypeRepo.Delete(new VegetationType { Id = id });

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