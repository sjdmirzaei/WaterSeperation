using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Vegetation.DAL.DbContexts;
using Vegetation.Domain;
using Vegetation.Domain.Services.Report;

namespace Vegetation.Api.Infrastructure
{
    public static class InjectionConfiguration
    {
        public static void Config(IServiceCollection services)
        {

            services.AddScoped<VegetationDbContext>();
            services.AddScoped<UnitOfWork>();
            services.AddScoped<ReportService>();
            //services.AddScoped<TransactionService>();
            //services.AddScoped<FormulaService>();
            //services.AddScoped<CalculateService>();
        }
    }

}
