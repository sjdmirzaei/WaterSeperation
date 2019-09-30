using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Api.Models;
using Vegetation.DAL.Entities;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigUserController : ControllerBase
    {
        public readonly UnitOfWork UnitOfWork;
        public ConfigUserController(UnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
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
    }
}