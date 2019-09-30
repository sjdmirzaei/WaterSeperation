import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbPaginationModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmendmentRoutingModule } from './amendment-routing.module';
import { AmendmentComponent } from './amendment/amendment.component';
import { AmendmentService } from '../../../services/amendment.service';

@NgModule({
  declarations: [AmendmentComponent],
  providers: [AmendmentService ],
  imports: [
    CommonModule,
    NgbModalModule,
    NgbPaginationModule,
    AmendmentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AmendmentModule { }
