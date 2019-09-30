using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Vegetation.DAL.Entities;
using Vegetation.DAL.Entities.Codeing;
using Vegetation.DAL.Entities.Main;

namespace Vegetation.DAL.DbContexts
{
    public class VegetationDbContext : DbContext
    {
        public VegetationDbContext(DbContextOptions<VegetationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Subsystem>().HasIndex(rec => new {Name = rec.Name}).IsUnique();
            builder.Entity<Subsystem>().HasIndex(rec => rec.Title).IsUnique();
        }

        public DbSet<Subsystem> Subsystems { get; set; }

        public DbSet<Menu> Menus { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<ReportGroup> ReportGroups { get; set; }

        public DbSet<Report> Reports { get; set; }

        public DbSet<ReportParameter> ReportParameters { get; set; }

        public DbSet<StaticItem> StaticItems { get; set; }

        public DbSet<ReportColumn> ReportColumns { get; set; }
        public DbSet<Leyer> Leyers { get; set; }

        #region Codeing

        public DbSet<ClimateTinyRatio> ClimateTinyRatios { get; set; }
        public DbSet<DensityRatio> DensityRatios { get; set; }
        public DbSet<IrrigationMethod> IrrigationMethods { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Specie> Species { get; set; }
        public DbSet<SpotType> SpotTypes { get; set; }
        public DbSet<Treaty> Treaties { get; set; }
        public DbSet<VegetationType> VegetationTypes { get; set; }

        #endregion

        #region Main

        public DbSet<Spot> Spots { get; set; }

        #endregion
    }
}
