import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbPaginationModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportManagmentService } from '../../../services/reportmanagment.service';
import { ReportRoutingModule } from './report-routing.module';
import { ReportManagmentComponent } from './reportmanagment/reportmanagment.component';
import { AddEditReportComponent } from './addeditreport/addeditreport.component';
import { ViewReportComponent } from './viewreport/viewreport.component';

@NgModule({
    declarations: [ReportManagmentComponent, AddEditReportComponent, ViewReportComponent],
    providers: [
        ReportManagmentService
    ],
    imports: [
        CommonModule,
        ReportRoutingModule,
        NgbModalModule,
        NgbPaginationModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ReportModule { }
