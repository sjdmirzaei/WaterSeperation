import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubsystemsComponent } from './subsystems/subsystems.component';
import { MenusComponent } from './menus/menus.component';
import { ParkingownerComponent } from './parkingowner/parkingowner.component';
import { ParkingtypeComponent } from './parkingtype/parkingtype.component';
import { ParkingusagetypeComponent } from './parkingusagetype/parkingusagetype.component';
import { ActivityscopeComponent } from './activityscope/activityscope.component';
import { ParkingComponent } from './parking/parking.component';
import { CartypeComponent } from './cartype/cartype.component';
import { ShiftComponent } from './shift/shift.component';
import { ReportGroupComponent } from './reportgroup/reportgroup.component';
import { RegionComponent } from './region/region.component';
import { CityComponent } from './city/city.component';
import { AreaComponent } from './area/area.component';
import { ZonesComponent } from './zones/zones.component';
import { StreetComponent } from './street/street.component';
import { StorageComponent } from './storage/storage.component';
import { TransactiontypesComponent } from './transactiontypes/transactiontypes.component';
import { HolidayComponent } from './holiday/holiday.component';

import { SpotTypeComponent } from './spot-type/spot-type.component';
import { IrrigationMethod, Treaty } from '../../../model/barrel';
import { IrrigationMethodComponent } from './irrigationmethod/irrigationmethod.component';
import { TreatyComponent } from './treaty/treaty.component';
import { VegetationTypeComponent } from './vegetationtype/vegetationtype.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'subsystems', component: SubsystemsComponent, data: { header: 'زیر سیستم ها' } },
            { path: 'menus', component: MenusComponent, data: { header: 'منو ها' } },
            { path: 'parkingowner', component: ParkingownerComponent, data: { header: 'صاحبان پارکینگ' } },
            { path: 'parkingtype', component: ParkingtypeComponent, data: { header: 'انواع پارکینگ' } },
            { path: 'parkingusagetype', component: ParkingusagetypeComponent, data: { header: 'انواع کاربری پارکینگ' } },
            { path: 'activityscope', component: ActivityscopeComponent, data: { header: 'مناطق فعالیت' } },
            { path: 'parking', component: ParkingComponent, data: { header: 'پارکینگ ها' } },
            { path: 'cartype', component: CartypeComponent, data: { header: 'انواع ماشین' } },
            { path: 'shift', component: ShiftComponent, data: { header: 'شیفت ها' } },
            { path: 'reportgroups', component: ReportGroupComponent, data: { header: 'گروه گزارشات' } },
            { path: 'city', component: CityComponent, data: { header: 'شهر' } },
            { path: 'area', component: AreaComponent, data: { header: 'منطقه' } },
            { path: 'zones', component: ZonesComponent, data: { header: 'منطقه ها' } },
            { path: 'street', component: StreetComponent, data: { header: 'خیابان' } },
            { path: 'storage', component: StorageComponent, data: { header: 'دپو' } },
            { path: 'holiday', component: HolidayComponent, data: { header: 'تعطیلات' } },
            { path: 'transactiontype', component: TransactiontypesComponent, data: { header: 'انواع تراکنش' } },
            
            { path: 'region', component: RegionComponent, data: { header: 'حوزه' } },
            
            { path: 'spot-type', component: SpotTypeComponent, data: { header: 'انواع لکه فضای سبز' } },
            { path: 'irrigationmethod', component: IrrigationMethodComponent, data: { header: 'انواع روش های آبیاری' } },
            { path: 'treaty', component: TreatyComponent, data: { header: 'نوع پیمان' } },
            { path: 'vegetationtype', component: VegetationTypeComponent, data: { header: 'انواع پوشش گیاهی' } },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BasicinfoRoutingModule { }
