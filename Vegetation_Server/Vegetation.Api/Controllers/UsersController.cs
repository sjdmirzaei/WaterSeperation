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
    public class UsersController : VegetationAuthorizedBaseController
    {
        public UsersController(UnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpPost]
        public IActionResult List([FromBody]PageModel pageModel)
        {
            if (ModelState.IsValid)
            {
                if (pageModel.Page != null)
                {
                    var list = UnitOfWork.UserRepo.Get().Include(rec => rec.UserRoles).OrderBy(rec => rec.Id)
                        .Skip((pageModel.Page.Value - 1) * 10).Take(10).Select(rec => new
                        {
                            rec.Id,
                            rec.Name,
                            rec.Family,
                            rec.Username,
                            rec.Password,
                            rec.Deactivated,
                            roles = rec.UserRoles.Select(rec1 => new
                            {
                                Id = rec1.RoleId

                            })

                        }).ToList();

                    var count = UnitOfWork.UserRepo.Get().Count();
                    return Ok(new
                    {
                        list,
                        count

                    });
                }
            }

            return BadRequest();

        }

        [HttpPost]
        public IActionResult Save(UserModel userModel)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.UserRepo.Save(new User
                {
                    Id = userModel.Id,
                    Name = userModel.Name,
                    Family = userModel.Family,
                    Username = userModel.Username,
                    Password = userModel.Password,
                    Deactivated = userModel.Deactivated.HasValue && userModel.Deactivated.Value
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

        [HttpPost]
        public IActionResult SaveRole(UserModel userModel)
        {
            if (ModelState.IsValid)
            {

                UnitOfWork.UserRoleRepo.DeleteAll(rec => rec.UserId == userModel.Id);
                foreach (var item in userModel.roles)
                {

                    UnitOfWork.UserRoleRepo.Create(new UserRole
                    {
                        UserId = userModel.Id,
                        RoleId = item.Id

                    });
                }
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
                UnitOfWork.UserRepo.Delete(new User { Id = id });

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