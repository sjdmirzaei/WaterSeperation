using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Vegetation.Api.Infrastructure;
using Vegetation.DAL.Entities;
using Vegetation.DAL.Entities.Codeing;
using Vegetation.Domain;

namespace Vegetation.Api.Controllers
{
    public class SeedController : VegetationBaseController
    {
        public SeedController(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            #region Define Roles

            var superAdminRole = UnitOfWork.RoleRepo.Get().SingleOrDefault(rec => rec.Name == "SuperAdmin") ??
                                 UnitOfWork.RoleRepo.Create(new Role() { Name = "SuperAdmin", Title = "سوپر ادمین" });

            var adminRole = UnitOfWork.RoleRepo.Get().SingleOrDefault(rec => rec.Name == "Admin") ??
                            UnitOfWork.RoleRepo.Create(new Role() {Name = "Admin", Title = "ادمین"});

            if (!UnitOfWork.UserRepo.Get().Any(rec => rec.Username == "admin"))
            {
                UnitOfWork.UserRepo.Create(new User()
                {
                    Username = "admin",
                    Password = "admin",
                    Name = "هیدروتک",
                    Family = "توس",
                    UserRoles = new List<UserRole>()
                        {new UserRole() {RoleId = adminRole.Id}}
                });
            }

            #endregion

            #region basicinfoSubsystem

            var basicinfoSubsystem = UnitOfWork.SubsystemRepo.Get().SingleOrDefault(rec => rec.Name == "BasicInfo") ??
                                     UnitOfWork.SubsystemRepo.Create(new Subsystem()
                                         {Name = "BasicInfo", Title = "اطلاعات پایه", Icon = "fas fa-paperclip"});
            var subMenuSustemInfo = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "SubMenuSustemInfo") ??
                                    UnitOfWork.MenuRepo.Create(new Menu()
                                    {
                                        Title = "اطلاعات سیستم",
                                        Name = "SubMenuSustemInfo",
                                        Url = "#",
                                        SubsystemId = basicinfoSubsystem.Id,
                                        Icon = "fas fa-info"
                                    });

            var regionMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Region") ??
                             UnitOfWork.MenuRepo.Create(new Menu()
                             {
                                 Title = "منطقه - ناحیه",
                                 Name = "Region",
                                 Url = "basicinfo/region",
                                 SubsystemId = basicinfoSubsystem.Id,
                                 ParentMenuId = subMenuSustemInfo.Id,
                                 Icon = "fa fa-file"
                             });

            var treatyMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Treaty") ??
                             UnitOfWork.MenuRepo.Create(new Menu()
                             {
                                 Title = "نوع پیمان",
                                 Name = "Treaty",
                                 Url = "basicinfo/treaty",
                                 SubsystemId = basicinfoSubsystem.Id,
                                 ParentMenuId = subMenuSustemInfo.Id,
                                 Icon = "fa fa-file"
                             });

            var vegetationTypeMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Vegetationtype") ??
                                     UnitOfWork.MenuRepo.Create(new Menu()
                                     {
                                         Title = "نوع پوشش گیاهی - قلم",
                                         Name = "Vegetationtype",
                                         Url = "basicinfo/vegetationtype",
                                         SubsystemId = basicinfoSubsystem.Id,
                                         ParentMenuId = subMenuSustemInfo.Id,
                                         Icon = "fa fa-file"
                                     });


            var spotTypeMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "SpotType") ??
                               UnitOfWork.MenuRepo.Create(new Menu()
                               {
                                   Title = "انواع لکه های فضای سبز",
                                   Name = "SpotType",
                                   Url = "basicinfo/spot-type",
                                   SubsystemId = basicinfoSubsystem.Id,
                                   ParentMenuId = subMenuSustemInfo.Id,
                                   Icon = "fa fa-file"
                               });

            var specieMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Specie") ??
                             UnitOfWork.MenuRepo.Create(new Menu()
                             {
                                 Title = "گونه گیاهی",
                                 Name = "Specie",
                                 Url = "basicinfo/specie",
                                 SubsystemId = basicinfoSubsystem.Id,
                                 ParentMenuId = subMenuSustemInfo.Id,
                                 Icon = "fa fa-file"
                             });

            var irrigationMethodMenu =
                UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Irrigationmethod") ??
                UnitOfWork.MenuRepo.Create(new Menu()
                {
                    Title = "روش آبیاری",
                    Name = "Irrigationmethod",
                    Url = "basicinfo/irrigationmethod",
                    SubsystemId = basicinfoSubsystem.Id,
                    ParentMenuId = subMenuSustemInfo.Id,
                    Icon = "fa fa-file"
                });

            var climateTinyRatioMenu =
                UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Climatetinyratio") ??
                UnitOfWork.MenuRepo.Create(new Menu()
                {
                    Title = "ضریب میزان خرد اقلیم ",
                    Name = "Climatetinyratio",
                    Url = "basicinfo/climatetinyratio",
                    SubsystemId = basicinfoSubsystem.Id,
                    ParentMenuId = subMenuSustemInfo.Id,
                    Icon = "fa fa-file"
                });

            var densityRatioMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Densityratio") ??
                                   UnitOfWork.MenuRepo.Create(new Menu()
                                   {
                                       Title = "ضریب میزان تراکم",
                                       Name = "Densityratio",
                                       Url = "basicinfo/densityratio",
                                       SubsystemId = basicinfoSubsystem.Id,
                                       ParentMenuId = subMenuSustemInfo.Id,
                                       Icon = "fa fa-file"
                                   });

            #endregion

            #region WaterResource

            var waterResourceSubsystem =
                UnitOfWork.SubsystemRepo.Get().SingleOrDefault(rec => rec.Name == "WaterResource") ??
                UnitOfWork.SubsystemRepo.Create(new Subsystem()
                    {Name = "WaterResource", Title = "مدیریت منابع آب", Icon = "fas fa-file-plus"});

            var spotMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Spot") ??
                           UnitOfWork.MenuRepo.Create(new Menu()
                           {
                               Title = "لکه ها و پیمان ها",
                               Name = "Spot",
                               Url = "waterresource/spot",
                               SubsystemId = waterResourceSubsystem.Id,
                               Icon = "fa fa-clock"
                           });

            var roleMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Role") ??
                           UnitOfWork.MenuRepo.Create(new Menu()
                           {
                               Name = "Role",
                               Title = "نقش ها",
                               Url = "waterresource/roles",
                               SubsystemId = waterResourceSubsystem.Id,
                               Icon = "fas fa-file-circle"
                           });

            var userMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "User") ??
                           UnitOfWork.MenuRepo.Create(new Menu()
                           {
                               Name = "User",
                               Title = "کاربران",
                               Url = "waterresource/users",
                               SubsystemId = waterResourceSubsystem.Id,
                               Icon = "fas fa-file-circle"
                           });

            #endregion

            #region FormulaGeneratorSubSystem

            //var formulaGeneratorSubsystem =
            //    UnitOfWork.SubsystemRepo.Get().SingleOrDefault(rec => rec.Name == "FormulaGenerator") ??
            //    UnitOfWork.SubsystemRepo.Create(new Subsystem()
            //        {Name = "FormulaGenerator", Title = "فرمول ساز", Icon = "fa fa-building"});

            //var formulaMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "Formula") ??
            //                  UnitOfWork.MenuRepo.Create(new Menu()
            //                  {
            //                      Name = "Formula",
            //                      Title = "فرمول ها",
            //                      Url = "formulagenerator/formula",
            //                      SubsystemId = formulaGeneratorSubsystem.Id,
            //                      Icon = "fa fa-building"
            //                  });

            #endregion

            #region ReportGroupMenu

            var reportSubsystem = UnitOfWork.SubsystemRepo.Get().SingleOrDefault(rec => rec.Name == "Report") ??
                                  UnitOfWork.SubsystemRepo.Create(new Subsystem()
                                      {Name = "Report", Title = "گزارشات", Icon = "fa fa-file"});


            var reportMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "ReportManagment") ??
                             UnitOfWork.MenuRepo.Create(new Menu()
                             {
                                 Title = "مدیریت گزارشات",
                                 Name = "ReportManagment",
                                 Url = "report/reportmanagment",
                                 SubsystemId = reportSubsystem.Id,
                                 Icon = "fa fa-file"
                             });

            var reportGroupMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "ReportGroups") ??
                                  UnitOfWork.MenuRepo.Create(new Menu()
                                  {
                                      Title = "گروه گزارشات",
                                      Name = "ReportGroups",
                                      Url = "basicinfo/reportgroups",
                                      SubsystemId = reportSubsystem.Id,
                                      Icon = "far fa-object-ungroup"
                                  });

            #endregion

            #region accounting

            //var accountingSubsystem = UnitOfWork.SubsystemRepo.Get().SingleOrDefault(rec => rec.Name == "Accounting") ??
            //                          UnitOfWork.SubsystemRepo.Create(new Subsystem()
            //                          {
            //                              Name = "Accounting",
            //                              Title = "حسابداری",
            //                              Icon = "fas fa-file-invoice-dollar"
            //                          });

            //var accountingMenu = UnitOfWork.MenuRepo.Get().SingleOrDefault(rec => rec.Name == "accountingMenu") ??
            //                     UnitOfWork.MenuRepo.Create(new Menu()
            //                     {
            //                         Title = "سند حسابداری",
            //                         Name = "accountingMenu",
            //                         Url = "accounting/registerdocument",
            //                         SubsystemId = accountingSubsystem.Id,
            //                         Icon = "far fa-object-ungroup"
            //                     });

            #endregion

            #region Define Leyers

            var leyerpark = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "park") ??
                            UnitOfWork.LeyerRepo.Create(new Leyer()
                            {
                                Name = "park",
                                Title = "بوستان ها",
                                Url = "SABAF:park",
                                SubsystemId = basicinfoSubsystem.Id,
                                Visible = true,
                                Symbol = "http://94.183.251.79:2041/icons/24/tree.png",
                                Type = "2",
                                Color = "#3a0bba"
                            });

            var leyerblk = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "blk") ??
                           UnitOfWork.LeyerRepo.Create(new Leyer()
                           {
                               Name = "blk",
                               Title = "بلوک ها",
                               Url = "SABAF:blk",
                               SubsystemId = basicinfoSubsystem.Id,
                               Visible = false,
                               Symbol = " ",
                               Type = "2",
                               Color = "#3a0bba"
                           });

            var leyerboundary = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "boundary") ??
                                UnitOfWork.LeyerRepo.Create(new Leyer()
                                {
                                    Name = "boundary",
                                    Title = "ناحیه ها",
                                    Url = "SABAF:boundary",
                                    SubsystemId = basicinfoSubsystem.Id,
                                    Visible = false,
                                    Symbol = " ",
                                    Type = "2",
                                    Color = "#3a0bba"
                                });

            var leyeredarat = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "edarat") ??
                              UnitOfWork.LeyerRepo.Create(new Leyer()
                              {
                                  Name = "edarat",
                                  Title = "ادارات",
                                  Url = "SABAF:edarat",
                                  SubsystemId = basicinfoSubsystem.Id,
                                  Visible = false,
                                  Symbol = "http://94.183.251.79:2041/icons/24/electricityRoom3.png",
                                  Type = "2",
                                  Color = "#3a0bba"
                              });

            var leyermarzZone = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "marz-zone") ??
                                UnitOfWork.LeyerRepo.Create(new Leyer()
                                {
                                    Name = "marz-zone",
                                    Title = "مرز مناطق",
                                    Url = "SABAF:marz-zone",
                                    SubsystemId = basicinfoSubsystem.Id,
                                    Visible = false,
                                    Symbol = " ",
                                    Type = "2",
                                    Color = "#3a0bba"
                                });

            var leyernameEdited = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "") ??
                                  UnitOfWork.LeyerRepo.Create(new Leyer()
                                  {
                                      Name = "name-edited",
                                      Title = "مسیر ها",
                                      Url = "SABAF:name-edited",
                                      SubsystemId = basicinfoSubsystem.Id,
                                      Visible = false,
                                      Symbol = "http://94.183.251.79:2041/icons/road.png",
                                      Type = "2",
                                      Color = "#3a0bba"
                                  });

            //var leyernatural = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "natural") ??
            //                   UnitOfWork.LeyerRepo.Create(new Leyer()
            //                   {
            //                       Name = "natural",
            //                       Title = "طبیعی",
            //                       Url = "SABAF:natural",
            //                       SubsystemId = basicinfoSubsystem.Id,
            //                       Visible = false,
            //                       Symbol = "",
            //                       Type = "2",
            //                       Color = "#3a0bba"
            //                   });

            //var leyerpark2 = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "park2") ??
            //                 UnitOfWork.LeyerRepo.Create(new Leyer()
            //                 {
            //                     Name = "park2",
            //                     Title = "فضای پارک 2",
            //                     Url = "SABAF:park2",
            //                     SubsystemId = basicinfoSubsystem.Id,
            //                     Visible = false,
            //                     Symbol = "",
            //                     Type = "2",
            //                     Color = "#3a0bba"
            //                 });

            //var leyerpark97 = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "park97") ??
            //                  UnitOfWork.LeyerRepo.Create(new Leyer()
            //                  {
            //                      Name = "park97",
            //                      Title = "پارک 97",
            //                      Url = "SABAF:park97",
            //                      SubsystemId = basicinfoSubsystem.Id,
            //                      Visible = false,
            //                      Symbol = "",
            //                      Type = "2",
            //                      Color = "#3a0bba"
            //                  });

            //var leyersavarero = UnitOfWork.LeyerRepo.Get().SingleOrDefault(rec => rec.Name == "savarero") ??
            //                    UnitOfWork.LeyerRepo.Create(new Leyer()
            //                    {
            //                        Name = "savarero",
            //                        Title = "مسیر ها",
            //                        Url = "SABAF:savarero",
            //                        SubsystemId = basicinfoSubsystem.Id,
            //                        Visible = false,
            //                        Symbol = "",
            //                        Type = "2",
            //                        Color = "#3a0bba"
            //                    });

            #endregion

            DefineCodeing();

            UnitOfWork.Save();
            return Ok();
        }

        private void DefineCodeing()
        {
            #region Define SpotType

            var spotType01 = UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "آیلند ها") ??
                             UnitOfWork.SpotTypeRepo.Create(new SpotType()
                             {
                                 Name = "آیلند ها",
                                 Code = "01",
                                 Description = " ",
                             });


            var spotType02 = UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "حاشیه معابر") ??
                             UnitOfWork.SpotTypeRepo.Create(new SpotType()
                             {
                                 Name = "حاشیه معابر",
                                 Code = "02",
                                 Description = " ",
                             });

            var spotType03 = UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "آیلند های بزرگراه") ??
                             UnitOfWork.SpotTypeRepo.Create(new SpotType()
                             {
                                 Name = "آیلند های بزرگراه",
                                 Code = "03",
                                 Description = " ",
                             });

            var spotType04 = UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "حاشیه های بزرگراه") ??
                             UnitOfWork.SpotTypeRepo.Create(new SpotType()
                             {
                                 Name = "حاشیه های بزرگراه",
                                 Code = "04",
                                 Description = " ",
                             });

            var spotType05 = UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "لچکی ها") ??
                             UnitOfWork.SpotTypeRepo.Create(new SpotType()
                             {
                                 Name = "لچکی ها",
                                 Code = "05",
                                 Description = " ",
                             });

            var spotType06 = UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "میادین") ??
                             UnitOfWork.SpotTypeRepo.Create(new SpotType()
                             {
                                 Name = "میادین",
                                 Code = "06",
                                 Description = " ",
                             });

            var spotType07 = UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "پارک های زیر 6 هکتار") ??
                             UnitOfWork.SpotTypeRepo.Create(new SpotType()
                             {
                                 Name = "پارک های زیر 6 هکتار",
                                 Code = "07",
                                 Description = " ",
                             });

            var spotType08 = UnitOfWork.SpotTypeRepo.Get()
                                 .SingleOrDefault(rec => rec.Name == "پارک های بین 6 تا 10 هکتار") ??
                             UnitOfWork.SpotTypeRepo.Create(new SpotType()
                             {
                                 Name = "پارک های بین 6 تا 10 هکتار",
                                 Code = "08",
                                 Description = " ",
                             });

            var spotType09 =
                UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "پارک های بالای 10 هکتار") ??
                UnitOfWork.SpotTypeRepo.Create(new SpotType()
                {
                    Name = "پارک های بالای 10 هکتار",
                    Code = "09",
                    Description = " ",
                });

            var spotType10 =
                UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "جنگل کاری داخل محدوده") ??
                UnitOfWork.SpotTypeRepo.Create(new SpotType()
                {
                    Name = "جنگل کاری داخل محدوده",
                    Code = "10",
                    Description = " ",
                });

            var spotType11 = UnitOfWork.SpotTypeRepo.Get().SingleOrDefault(rec => rec.Name == "کمربندی") ??
                             UnitOfWork.SpotTypeRepo.Create(new SpotType()
                             {
                                 Name = "کمربندی",
                                 Code = "11",
                                 Description = " ",
                             });

            #endregion

            #region Define IrrigationMethod

            var irrigationMethod01 =
                UnitOfWork.IrrigationMethodRepo.Get().SingleOrDefault(rec => rec.Name == "آبیاری ثقلی") ??
                UnitOfWork.IrrigationMethodRepo.Create(new IrrigationMethod()
                {
                    Name = "آبیاری ثقلی",
                    Code = "1",
                    Description = " ",
                });

            var irrigationMethod02 =
                UnitOfWork.IrrigationMethodRepo.Get().SingleOrDefault(rec => rec.Name == "آبیاری تانکری") ??
                UnitOfWork.IrrigationMethodRepo.Create(new IrrigationMethod()
                {
                    Name = "آبیاری تانکری",
                    Code = "2",
                    Description = " ",
                });

            var irrigationMethod03 =
                UnitOfWork.IrrigationMethodRepo.Get().SingleOrDefault(rec => rec.Name == "آبیاری شلنگی") ??
                UnitOfWork.IrrigationMethodRepo.Create(new IrrigationMethod()
                {
                    Name = "آبیاری شلنگی",
                    Code = "3",
                    Description = " ",
                });

            var irrigationMethod04 =
                UnitOfWork.IrrigationMethodRepo.Get().SingleOrDefault(rec => rec.Name == "آبیاری تحت فشار") ??
                UnitOfWork.IrrigationMethodRepo.Create(new IrrigationMethod()
                {
                    Name = "آبیاری تحت فشار",
                    Code = "4",
                    Description = " ",
                });

            var irrigationMethod05 =
                UnitOfWork.IrrigationMethodRepo.Get().SingleOrDefault(rec => rec.Name == "آبیاری قطره ای") ??
                UnitOfWork.IrrigationMethodRepo.Create(new IrrigationMethod()
                {
                    Name = "آبیاری قطره ای",
                    Code = "5",
                    Description = " ",
                });

            var irrigationMethod06 =
                UnitOfWork.IrrigationMethodRepo.Get().SingleOrDefault(rec => rec.Name == "آبیاری بارانی") ??
                UnitOfWork.IrrigationMethodRepo.Create(new IrrigationMethod()
                {
                    Name = "آبیاری بارانی",
                    Code = "6",
                    Description = " ",
                });

            #endregion

            #region Define VegetationType

            var vegetationType01 = UnitOfWork.VegetationTypeRepo.Get().SingleOrDefault(rec => rec.Name == "چمن") ??
                                   UnitOfWork.VegetationTypeRepo.Create(new VegetationType()
                                   {
                                       Name = "چمن",
                                       Code = "1",
                                       Description = " ",
                                   });

            var vegetationType02 =
                UnitOfWork.VegetationTypeRepo.Get().SingleOrDefault(rec => rec.Name == "درخت و درختچه") ??
                UnitOfWork.VegetationTypeRepo.Create(new VegetationType()
                {
                    Name = "درخت و درختچه",
                    Code = "2",
                    Description = " ",
                });

            var vegetationType03 = UnitOfWork.VegetationTypeRepo.Get().SingleOrDefault(rec => rec.Name == "اصل") ??
                                   UnitOfWork.VegetationTypeRepo.Create(new VegetationType()
                                   {
                                       Name = "اصل",
                                       Code = "3",
                                       Description = " ",
                                   });

            var vegetationType04 = UnitOfWork.VegetationTypeRepo.Get().SingleOrDefault(rec => rec.Name == "پرچین") ??
                                   UnitOfWork.VegetationTypeRepo.Create(new VegetationType()
                                   {
                                       Name = "پرچین",
                                       Code = "4",
                                       Description = " ",
                                   });

            var vegetationType05 = UnitOfWork.VegetationTypeRepo.Get().SingleOrDefault(rec => rec.Name == "گل") ??
                                   UnitOfWork.VegetationTypeRepo.Create(new VegetationType()
                                   {
                                       Name = "گل",
                                       Code = "5",
                                       Description = " ",
                                   });

            #endregion

            #region Define Region

            var region01 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 1") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 1",
                               Code = "01",
                               Description = " ",
                           });

            var region02 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 2") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 2",
                               Code = "02",
                               Description = " ",
                           });

            var region03 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 3") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 3",
                               Code = "03",
                               Description = " ",
                           });

            var region04 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 4") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 4",
                               Code = "04",
                               Description = " ",
                           });

            var region05 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 5") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 5",
                               Code = "05",
                               Description = " ",
                           });

            var region06 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 6") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 6",
                               Code = "06",
                               Description = " ",
                           });

            var region07 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 7") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 7",
                               Code = "07",
                               Description = " ",
                           });

            var region08 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 8") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 8",
                               Code = "08",
                               Description = " ",
                           });

            var region09 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 9") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 9",
                               Code = "09",
                               Description = " ",
                           });

            var region10 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 10") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 10",
                               Code = "10",
                               Description = " ",
                           });

            var region11 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 11") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 11",
                               Code = "11",
                               Description = " ",
                           });

            var region12 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه 12") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه 12",
                               Code = "12",
                               Description = " ",
                           });

            var region13 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "منطقه ثامن") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "منطقه ثامن",
                               Code = "13",
                               Description = " ",
                           });

            var region14 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "کمربند سبز جنوبی ") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "کمربند سبز جنوبی ",
                               Code = "14",
                               Description = "تحت پوشش سازمان پارکها",
                           });

            var region15 = UnitOfWork.RegionRepo.Get().SingleOrDefault(rec => rec.Name == "کمربند سبز شمالی ") ??
                           UnitOfWork.RegionRepo.Create(new Region()
                           {
                               Name = "کمربند سبز شمالی ",
                               Code = "15",
                               Description = "تحت پوشش سازمان پارکها",
                           });

            #endregion

            #region Define Treaty

            var treaty01 = UnitOfWork.TreatyRepo.Get().SingleOrDefault(rec => rec.Name == "پیمان شماره یک") ??
                           UnitOfWork.TreatyRepo.Create(new Treaty()
                           {
                               Name = "پیمان شماره یک",
                               Code = "1",
                               Description = " ",
                           });

            #endregion
        }
    }
}
