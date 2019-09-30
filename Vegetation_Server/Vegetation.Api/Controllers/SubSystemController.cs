using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.DAL.Entities;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers
{
    public class SubSystemController : VegetationAuthorizedBaseController
    {
        public SubSystemController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }


        [HttpPost]
        public IActionResult List(PageModel pageModel )
        {
            if (ModelState.IsValid)
            {

                if (pageModel.Page.HasValue)
                {
                    var list = UnitOfWork.SubsystemRepo.Get().OrderBy(rec => rec.Id).Skip((pageModel.Page.Value - 1) * 10).Take(10);
                    var count = UnitOfWork.SubsystemRepo .Get().Count();
                    return Ok(new
                    {
                        list = list,
                        count = count
                    });
                }

                else

                {
                    var list = UnitOfWork.SubsystemRepo.Get().OrderBy(rec => rec.Id);

                    var count = UnitOfWork.SubsystemRepo.Get().Count();
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
        public IActionResult Save(SubSystemModel subSystemModel)
        {
            if (ModelState.IsValid)
            {
                    UnitOfWork.SubsystemRepo.Save(new Subsystem
                    {
                        Id = subSystemModel.Id,
                        Name = subSystemModel.Name,
                        Title = subSystemModel.Title,
                        Icon = subSystemModel.Icon
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
            if(ModelState.IsValid)
            {
                UnitOfWork.SubsystemRepo.Delete(new Subsystem{Id = id});
               
                try
                {
                    UnitOfWork.Save();
                    return Ok();
                }
                catch(Exception ex)
                {
                    return BadRequest(ex.Message);
                }                

            }
            return BadRequest();
        }

    }
}