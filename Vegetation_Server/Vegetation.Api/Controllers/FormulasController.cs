using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Api.Infrastructure;
using Vegetation.Api.Models;
using Vegetation.DAL.Entities;
using Vegetation.Domain;
using Vegetation.Domain.Services.Formula;

namespace Vegetation.Api.Controllers
{
    public class FormulasController : VegetationAuthorizedBaseController
    {
        private readonly FormulaService _formulaService;
        public FormulasController(UnitOfWork unitOfWork, FormulaService formulaService) : base(unitOfWork)
        {
            this._formulaService = formulaService;
        }

        [HttpPost]
        public IActionResult List(int page)
        {
            if (ModelState.IsValid)
            {
                var list = UnitOfWork.FromulaRepo.Get().OrderBy(rec => rec.Id).Skip((page - 1) * 10).Take(10);
                var count = UnitOfWork.FromulaRepo.Get().Count();
                return Ok(new
                {
                    list = list,
                    count = count
                });
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Save(FormulaModel formulaModel)
        {
            if (ModelState.IsValid)
            {
                UnitOfWork.FromulaRepo.Save(new Formula()
                {
                    Name = formulaModel.Name,
                    Title = formulaModel.Title,
                    Content = formulaModel.Content,
                    Parameters = formulaModel.Parameters,
                    Index = formulaModel.Index,
                    Id = formulaModel.Id
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
                UnitOfWork.FromulaRepo.Delete(new Formula { Id = id });
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
        public IActionResult Execute(FormulaModel formulaModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    IDictionary<string, object> dict = new Dictionary<string, object>();
                    dict.Add("l", 2);
                    dict.Add("m", 3);
                    dict.Add("n", 4);
                    dict.Add("p", 5);

                    var k = _formulaService.Execute(formulaModel.Name, dict);
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