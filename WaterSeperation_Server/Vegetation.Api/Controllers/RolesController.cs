using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.DAL.Entities;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers
{
    public class RolesController : VegetationBaseController
    {
        public RolesController(UnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpPost]
        public IActionResult List([FromBody]PageModel pageModel)
        {
            if (ModelState.IsValid)
            {
                if (pageModel.Page.HasValue)
                {

                    var list = UnitOfWork.RoleRepo.Get().OrderBy(rec => rec.Id).Skip((pageModel.Page.Value - 1) * 10).Take(10);
                    var count = UnitOfWork.RoleRepo.Get().Count();

                    return Ok(new
                    {
                        list = list,
                        count = count
                    });

                }
                else
                {
                    var list = UnitOfWork.RoleRepo.Get().OrderBy(rec => rec.Id);
                    var count = UnitOfWork.RoleRepo.Get().Count();

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
        public IActionResult Save(RoleModel roleModel)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.RoleRepo.Save(new Role()
                {
                    Id = roleModel.Id,
                    Name = roleModel.Name,
                    Title = roleModel.Title,
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
                UnitOfWork.RoleRepo.Delete(new Role { Id = id });

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