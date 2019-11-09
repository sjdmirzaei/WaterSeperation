using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Vegetation.DAL.DbContexts;
using Vegetation.DAL.Entities.Codeing;
using Vegetation.Domain.Repositories;
using Vegetation.Domain.Repositories.Codeing;
using Vegetation.Domain.Repositories.Main;

namespace Vegetation.Domain
{
    public class UnitOfWork
    {
        public VegetationDbContext DbContext { get; private set; }

        private SubsystemRepo _subsystemRepo;
        public SubsystemRepo SubsystemRepo => _subsystemRepo ?? (_subsystemRepo = new SubsystemRepo(DbContext));


        private MenuRepo _menuRepo;
        public MenuRepo MenuRepo => _menuRepo ?? (_menuRepo = new MenuRepo(DbContext));


        private UserRepo _userRepo;
        public UserRepo UserRepo => _userRepo ?? (_userRepo = new UserRepo(DbContext));

        private UserRoleRepo _userRoleRepo;
        public UserRoleRepo UserRoleRepo => _userRoleRepo ?? (_userRoleRepo = new UserRoleRepo(DbContext));

        private RoleRepo _roleRepo;
        public RoleRepo RoleRepo => _roleRepo ?? (_roleRepo = new RoleRepo(DbContext));


        private FormulaRepo _formulaRepo;
        public FormulaRepo FromulaRepo => _formulaRepo ?? (_formulaRepo = new FormulaRepo(DbContext));

        private ReportGroupRepo _reportGroupRepo;

        public ReportGroupRepo ReportGroupRepo =>
            _reportGroupRepo ?? (_reportGroupRepo = new ReportGroupRepo(DbContext));

        private ReportRepo _reportRepo;
        public ReportRepo ReportRepo => _reportRepo ?? (_reportRepo = new ReportRepo(DbContext));

        private ReportParameterRepo _reportParameterRepo;

        public ReportParameterRepo ReportParameterRepo =>
            _reportParameterRepo ?? (_reportParameterRepo = new ReportParameterRepo(DbContext));


        private StaticItemRepo _staticItemRepo;
        public StaticItemRepo StaticItemRepo => _staticItemRepo ?? (_staticItemRepo = new StaticItemRepo(DbContext));


        private ReportColumnRepo _reportColumnRepo;

        public ReportColumnRepo ReportColumnRepo =>
            _reportColumnRepo ?? (_reportColumnRepo = new ReportColumnRepo(DbContext));

        private LeyerRepo _leyerRepo;
        public LeyerRepo LeyerRepo => _leyerRepo ?? (_leyerRepo = new LeyerRepo(DbContext));

        #region Codeing

        private ClimateTinyRatioRepo _climateTinyRatioRepo;

        public ClimateTinyRatioRepo ClimateTinyRatioRepo =>
            _climateTinyRatioRepo ?? (_climateTinyRatioRepo = new ClimateTinyRatioRepo(DbContext));

        private DensityRatioRepo _densityRatioRepo;

        public DensityRatioRepo DensityRatioRepo =>
            _densityRatioRepo ?? (_densityRatioRepo = new DensityRatioRepo(DbContext));

        private IrrigationMethodRepo _irrigationMethodRepo;

        public IrrigationMethodRepo IrrigationMethodRepo =>
            _irrigationMethodRepo ?? (_irrigationMethodRepo = new IrrigationMethodRepo(DbContext));

        private RegionRepo _regionRepo;
        public RegionRepo RegionRepo => _regionRepo ?? (_regionRepo = new RegionRepo(DbContext));

        private SpecieRepo _specieRepo;
        public SpecieRepo SpecieRepo => _specieRepo ?? (_specieRepo = new SpecieRepo(DbContext));

        private SpotTypeRepo _spotTypeRepo;
        public SpotTypeRepo SpotTypeRepo => _spotTypeRepo ?? (_spotTypeRepo = new SpotTypeRepo(DbContext));

        private TreatyRepo _treatyRepo;
        public TreatyRepo TreatyRepo => _treatyRepo ?? (_treatyRepo = new TreatyRepo(DbContext));

        private VegetationTypeRepo _vegetationTypeRepo;

        public VegetationTypeRepo VegetationTypeRepo =>
            _vegetationTypeRepo ?? (_vegetationTypeRepo = new VegetationTypeRepo(DbContext));

        #endregion

        #region Main

        private SpotRepo _spotRepo;
        public SpotRepo SpotRepo => _spotRepo ?? (_spotRepo = new SpotRepo(DbContext));

        #endregion

        public UnitOfWork(VegetationDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public void BeginTransaction()
        {
            this.DbContext.Database.BeginTransaction();
        }

        public void Commit()
        {
            this.DbContext.Database.CommitTransaction();
        }

        public void Rollback()
        {
            this.DbContext.Database.RollbackTransaction();
        }

        public void Save()
        {
            try
            {
                this.DbContext.SaveChanges();
                if (this.DbContext.Database.CurrentTransaction != null)
                    this.Commit();
            }
            catch (Exception ex)
            {
                if (this.DbContext.Database.CurrentTransaction != null)
                    this.Rollback();

                throw ex;
            }
        }
    }
}
