import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CpanelComponent } from './cpanel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';
import { CalendareComponent } from './calendare/calendare.component';
import { BasicinfoModule } from './basicinfo/basicinfo.module';
import { FormulageneratorModule } from './formulagenerator/formulagenerator.module';
import { ReportModule } from './report/report.module';
import { ShiftModule } from './shift/shift.module';
import { AmendmentModule } from './amendment/amendment.module';

const routes: Routes = [
    {
        path: '',
        component: CpanelComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { header: 'داشبورد' } },
            { path: 'profile', component: ProfileComponent, data: { header: 'پروفایل' } },
            { path: 'settings', component: SettingsComponent, data: { header: 'تنظیمات' } },
            { path: 'support', component: SupportComponent, data: { header: 'پششتبانی' } },
            { path: 'calendare', component: CalendareComponent, data: { header: 'تقویم' } },
            { path: 'basicinfo', loadChildren: './basicinfo/basicinfo.module#BasicinfoModule' },
            { path: 'accounting', loadChildren: './accounting/accounting.module#AccountingModule' },
            { path: 'formulagenerator', loadChildren: './formulagenerator/formulagenerator.module#FormulageneratorModule' },
            { path: 'humanresource', loadChildren: './humanresource/humanresource.module#HumanresourceModule' },
            { path: 'waterresource', loadChildren: './waterresource/waterresource.module#WaterresourceModule' },
            { path: 'report', loadChildren: './report/report.module#ReportModule' },
            { path: 'shift', loadChildren: './shift/shift.module#ShiftModule' },
            { path: 'amendment', loadChildren: './amendment/amendment.module#AmendmentModule' },
            { path: '**', redirectTo: 'dashboard' }
        ]

    }];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CpanelRoutingModule { }
