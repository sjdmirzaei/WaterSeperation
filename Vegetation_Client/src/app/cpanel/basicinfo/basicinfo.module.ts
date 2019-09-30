import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NgbModalModule,
  NgbPaginationModule,
  NgbPaginationConfig
} from "@ng-bootstrap/ng-bootstrap";
import { BasicinfoRoutingModule } from "./basicinfo-routing.module";
import { MenusComponent } from "./menus/menus.component";
import { SubsystemsComponent } from "./subsystems/subsystems.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SubsystemService } from "../../../services/subsystem.service";
import { MenuService } from "../../../services/menu.service";
import { ParkingownerComponent } from "./parkingowner/parkingowner.component";
import { ParkingOwnerService } from "../../../services/parakingowner.service";
import { ParkingtypeComponent } from "./parkingtype/parkingtype.component";

import { ParkingTypeService } from "../../../services/parakingtype.service";
import { ParkingusagetypeComponent } from "./parkingusagetype/parkingusagetype.component";
import { ParkingUsageTypeService } from "../../../services/parakingusagetype.service";
import { ActivityscopeComponent } from "./activityscope/activityscope.component";
import { ActivityScopeService } from "../../../services/activityscope.service";
import { ParkingComponent } from "./parking/parking.component";
import { ParkingService } from "../../../services/parking.service";
import { CartypeComponent } from "./cartype/cartype.component";
import { CarTypeService } from "../../../services/carType.service";
import { ShiftComponent } from "./shift/shift.component";
import { ShiftService } from "../../../services/shift.service";
import { ReportGroupComponent } from "./reportgroup/reportgroup.component";
import { ReportGroupService } from "../../../services/reportgroup.service";
import { RegionComponent } from "./region/region.component";
import { CityComponent } from "./city/city.component";
import { CityService } from "../../../services/city.service";
import { AreaComponent } from "./area/area.component";
import { AreaService } from "../../../services/Area.service";
import { ZonesComponent } from "./zones/zones.component";
import { ZoneService } from "../../../services/zone.service";
import { StreetService } from "../../../services/street.service";
import { StreetComponent } from "./street/street.component";
import { StorageComponent } from "./storage/storage.component";
import { StorageService } from "../../../services/Storage.service";
import { TransactiontypesComponent } from "./transactiontypes/transactiontypes.component";
import { TransactionTypeService } from "../../../services/transactiontype.service";
import { HolidayComponent } from "./holiday/holiday.component";
import { HolidayService } from "../../../services/holiday.service";
import { SpotTypeComponent } from "./spot-type/spot-type.component";
import { SpotTypeService } from "../../../services/Codeing/spottype.service";
import { IrrigationMethodComponent } from "./irrigationmethod/irrigationmethod.component";
import { TreatyComponent } from "./treaty/treaty.component";
import { VegetationTypeComponent } from "./vegetationtype/vegetationtype.component";
import { IrrigationMethodService } from "../../../services/Codeing/irrigationmethod.service";
import { Region } from "../../../model/barrel";
import { TreatyService } from "../../../services/Codeing/treaty.service";
import { VegetationTypeService } from "../../../services/Codeing/vegetationtype.service";
import { RegionService } from "../../../services/Codeing/region.service";

@NgModule({
  declarations: [
    MenusComponent,
    SubsystemsComponent,
    ParkingownerComponent,
    ParkingtypeComponent,
    ParkingusagetypeComponent,
    ActivityscopeComponent,
    ParkingComponent,
    CartypeComponent,
    ShiftComponent,
    ReportGroupComponent,
    RegionComponent,
    CityComponent,
    AreaComponent,
    ZonesComponent,
    StreetComponent,
    StorageComponent,
    TransactiontypesComponent,
    HolidayComponent,

    SpotTypeComponent,
    RegionComponent,
    IrrigationMethodComponent,
    TreatyComponent,
    VegetationTypeComponent
  ],
  providers: [
    SubsystemService,
    MenuService,
    ParkingOwnerService,
    ParkingTypeService,
    ParkingUsageTypeService,
    ActivityScopeService,
    ParkingService,
    CarTypeService,
    ShiftService,
    ReportGroupService,
    RegionService,
    CityService,
    AreaService,
    ZoneService,
    StreetService,
    StorageService,
    TransactionTypeService,
    HolidayService,

    SpotTypeService,
    IrrigationMethodService,
    Region,
    TreatyService,
    VegetationTypeService
  ],
  imports: [
    BasicinfoRoutingModule,
    NgbModalModule,
    NgbPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BasicinfoModule {}
