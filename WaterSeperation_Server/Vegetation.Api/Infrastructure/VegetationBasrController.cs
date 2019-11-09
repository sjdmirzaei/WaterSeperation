using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Domain;

namespace Vegetation.Api.Infrastructure
{

    [Route("[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    public class VegetationBaseController : ControllerBase
    {
        public readonly UnitOfWork UnitOfWork;

        public VegetationBaseController(UnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }
    }

    [Authorize]
    public class VegetationAuthorizedBaseController : VegetationBaseController
    {
        public VegetationAuthorizedBaseController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}