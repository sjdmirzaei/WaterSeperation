import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WaterresourceRoutingModule } from "./waterresource-routing.module";
import { SpotComponent } from "./spot/spot.component";

import { SpotService } from "../../../services/Main/spot.service";
import { Spot } from "../../../model/barrel";

import {
  NgbModalModule,
  NgbPaginationModule
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SpotComponent],
  providers: [SpotService],
  imports: [
    WaterresourceRoutingModule,
    NgbModalModule,
    NgbPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WaterresourceModule {}
