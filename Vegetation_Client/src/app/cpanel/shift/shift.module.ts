import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRoutingModule } from './shift-routing.module';
import { AssignshiftComponent } from './assignshift/assignshift.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BlocksModule } from '../../blocks/blocks.module';

import { AssignShiftService } from '../../../services/assignshift.service';
import { ReportRoutingModule } from '../report/report-routing.module';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AssignshiftComponent],
    providers: [
        AssignShiftService
    ],
    imports: [
        CommonModule,
        ShiftRoutingModule,
        ReportRoutingModule,
        NgbModalModule,
        NgbPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        BlocksModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })
    ]
})
export class ShiftModule { }
