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
    public class MenuController : VegetationAuthorizedBaseController
    {
        public MenuController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        [HttpPost]
        public IActionResult List([FromBody]PageModel pageModel)
        {
            if (ModelState.IsValid)
            {
                var list = UnitOfWork.MenuRepo.Get().Include(rec => rec.Subsystem).OrderBy(rec => rec.Id).Skip((pageModel.Page.Value - 1) * 10).Take(10).Select(rec => new
                {
                    Id = rec.Id,
                    Name = rec.Name,
                    Title = rec.Title,
                    Icon = rec.Icon,
                    Url = rec.Url,
                    Subsystem = new
                    {
                        Id = rec.Subsystem.Id,
                        Name = rec.Subsystem.Name,
                        Title = rec.Subsystem.Title
                    },
                    // Parent=rec.ParentMenuId.HasValue ? new{
                    //     Id=rec.ParentMenu.Id,
                    //     Title=rec.ParentMenu.Title

                    // } : new {
                    //     Id = 0,
                    //     Title =  ""
                    // }web
                    parentmenuid = rec.ParentMenuId.HasValue ? rec.ParentMenu.Id : 0,

                }).ToList();
                var count = UnitOfWork.MenuRepo.Get().Count();
                var listParent = UnitOfWork.MenuRepo.Get().Where(rec => rec.ParentMenuId == null).OrderBy(rec => rec.Id);
                return Ok(new
                {
                    list = list,
                    count = count,
                    listParent = listParent
                });
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Save(MenuModel menuModel)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.MenuRepo.Save(new Menu()
                {
                    Id = menuModel.Id,
                    Name = menuModel.Name,
                    Title = menuModel.Title,
                    Icon = menuModel.Icon,
                    SubsystemId = menuModel.Subsystem.Id,
                    ParentMenuId = menuModel.Parentmenuid != 0 ? menuModel.Parentmenuid : null,
                    Url = menuModel.Url
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
                UnitOfWork.MenuRepo.Delete(new Menu { Id = id });
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