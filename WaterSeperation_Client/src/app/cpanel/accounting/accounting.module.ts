import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { RegisterdocumentComponent } from './registerdocument/registerdocument.component';
import { RegisterdocumentService } from '../../../services/registerdocument.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FinancialyearComponent } from './financialyear/financialyear.component';
import { FinancialYearService } from '../../../services/FinancialYear.service';

@NgModule({
  declarations: [RegisterdocumentComponent, FinancialyearComponent],
  providers:[
    RegisterdocumentService,FinancialYearService ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    FormsModule,
    CommonModule,
    NgbModalModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class AccountingModule { }
