import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import {TarrifComponent } from './tarrif/tarrif.component';
import { CustomersComponent } from './customers/customers.component';
import { CarsComponent } from './cars/cars.component';
import { DiscountComponent } from './discount/discount.component';
import { ParkingcarComponent } from './parkingcar/parkingcar.component';

const routes: Routes = [
    {
        path: '', 
        children: [            
            { path: 'roles', component: RolesComponent, data: { header: 'نقش ها' } },           
            { path: 'users', component: UsersComponent, data: { header: 'کاربران' } },    
            { path: 'tarrif', component: TarrifComponent, data: { header: 'تعرفه ها' } },           
            { path: 'users', component: UsersComponent, data: { header: 'کاربران' } }, 
            { path: 'customers', component: CustomersComponent, data: { header: 'مشتریان' } }, 
            { path: 'cars', component: CarsComponent, data: { header: 'خودروها' } },  
            { path: 'discount', component: DiscountComponent, data: { header: 'تخفیف ها' } },  
            { path: 'parkingcar', component: ParkingcarComponent, data: { header: 'ورود خروج ماشین' } },                  
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanresourceRoutingModule { }
