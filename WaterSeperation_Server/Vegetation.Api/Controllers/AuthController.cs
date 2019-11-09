using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers
{
    public class AuthController : VegetationBaseController
    {

        public AuthController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        [HttpPost]
        public IActionResult Token([FromBody] Credential cred)
        {
            if (ModelState.IsValid)
            {
                var user = UnitOfWork.UserRepo.Get().Include(rec => rec.UserRoles).ThenInclude(rec => rec.Role)
                .SingleOrDefault(rec => rec.Username == cred.Username && rec.Password == cred.Password);

                if (user == null)
                {
                    return NotFound(cred);
                }

                var subsystems = UnitOfWork.SubsystemRepo.Get().Include(rec => rec.Menus).ThenInclude(rec => rec.ChildMenus).Select(rec => new SubSystemModel
                {
                    Id = rec.Id,
                    Name = rec.Name,
                    Title = rec.Title,
                    Icon = rec.Icon,
                    Menus = rec.Menus.Where(rec1 => rec1.ParentMenuId == null).Select(rec1 => new MenuModel
                    {
                        Id = rec1.Id,
                        Name = rec1.Name,
                        Title = rec1.Title,
                        Icon = rec1.Icon,
                        Url = rec1.Url,
                        HasChild = rec1.ChildMenus.Count != 0,
                        Chlilds = rec1.ChildMenus.Select(rec2 => new ChildMenuModel
                        {
                            Id = rec2.Id,
                            Url = rec2.Url,
                            Title = rec2.Title,
                            Name = rec2.Name,
                            Icon = rec2.Icon
                        }).ToList()
                    }).ToList()
                }).ToList();

                var reportSubSystem = UnitOfWork.ReportGroupRepo.Get().Include(rec => rec.Reports).Select(rec => new MenuModel
                {
                    Id = rec.Id,
                    Name = rec.Name,
                    Title = rec.Title,
                    Icon = rec.Icon,
                    Url = "#",
                    HasChild = rec.Reports.Count != 0,
                    Chlilds = rec.Reports.Select(rec1 => new ChildMenuModel
                    {
                        Id = rec1.Id,
                        Title = rec1.Title,
                        Url = "report/viewreport/" + rec1.Id.ToString(),
                        Icon = "fa fa-file",

                    }).ToList()

                }).ToList();

                subsystems.SingleOrDefault(rec => rec.Name == "Report")?.Menus.AddRange(reportSubSystem);

                var roles = user.UserRoles.Select(rec => rec.Role).Select(rec => new
                {
                    Id = rec.Id,
                    Name = rec.Name,
                    Title = rec.Title,
                    subsystems = subsystems
                }).ToList();


                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim("Username", user.Username),
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("FullName", user.FullName)
                };

                var token = new JwtSecurityToken
                (
                    issuer: "issuer",
                    audience: "audience",
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(60),
                    notBefore: DateTime.UtcNow,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("System.ArgumentOutOfRangeException")),
                            SecurityAlgorithms.HmacSha256)
                );

                return Ok(new {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    data = roles
                });
            }
            return BadRequest();
        }
    }
}
