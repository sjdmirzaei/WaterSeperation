import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportManagmentComponent } from './reportmanagment/reportmanagment.component';
import { AddEditReportComponent } from './addeditreport/addeditreport.component';
import { ViewReportComponent } from './viewreport/viewreport.component';


const routes: Routes = [
    {
        path: '', 
        children: [            
            { path: 'reportmanagment', component: ReportManagmentComponent, data: { header: 'مدیریت گزارشات' } },
            { path: 'addeditreport/:id', component: AddEditReportComponent, data: { header: 'تنظیمات گزارش' } },
            { path: 'viewreport/:id', component: ViewReportComponent, data: { header: 'نمایش گزارش' } },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }
