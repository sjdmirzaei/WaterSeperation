import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CpanelRoutingModule } from "./cpanel-routing.module";
import { CpanelComponent } from "./cpanel.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BlocksModule } from "../blocks/blocks.module";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { CalendareComponent } from "./calendare/calendare.component";
import { SupportComponent } from "./support/support.component";
import { HttpService } from "../../services/http.service";
import {
  NgbModalModule,
  NgbPaginationModule
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BasicinfoModule } from "./basicinfo/basicinfo.module";
import { AgmCoreModule } from "@agm/core";
import { HumanresourceModule } from "./humanresource/humanresource.module";
import { ReportModule } from "./report/report.module";
import { FormulageneratorModule } from "./formulagenerator/formulagenerator.module";
import { ShiftModule } from "./shift/shift.module";
import { RegionComponent } from "./basicinfo/region/region.component";
import { CityComponent } from "./basicinfo/city/city.component";
import { AreaComponent } from "./basicinfo/area/area.component";
import { AccountingModule } from "./accounting/accounting.module";
import { AmendmentModule } from "./amendment/amendment.module";
import { DeviceService } from "../../services/device.service";
import { WaterresourceModule } from "./waterresource/waterresource.module";

@NgModule({
  imports: [
    NgbModalModule,
    NgbPaginationModule,
    CommonModule,
    CpanelRoutingModule,
    BlocksModule,
    FormsModule,
    ReactiveFormsModule,
    BasicinfoModule,
    HumanresourceModule,
    WaterresourceModule,
    ReportModule,
    FormulageneratorModule,
    AccountingModule,
    WaterresourceModule,
    ShiftModule,
    AmendmentModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAYMTUnMzTtffSdH_k5U9ct1BaPKfmBmVM"
    })
  ],
  providers: [HttpService, DeviceService],
  declarations: [
    CpanelComponent,
    DashboardComponent,
    ProfileComponent,
    SettingsComponent,
    CalendareComponent,
    SupportComponent
  ]
})
export class CpanelModule {}
