import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanresourceRoutingModule } from './humanresource-routing.module';
import { RolesComponent } from './roles/roles.component';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { UsersComponent } from './users/users.component';
import { UserService } from '../../../services/user.service';
import { TarrifComponent } from './tarrif/tarrif.component';
import { TarrifService } from '../../../services/tarrif.service';
import { CustomersComponent } from './customers/customers.component';
import { CustomerService } from '../../../services/customer.service';
import { CarsComponent } from './cars/cars.component';
import { CarService } from '../../../services/car.service';
import { DiscountComponent } from './discount/discount.component';
import { DiscountService } from '../../../services/discount.service';
import { ParkingcarComponent } from './parkingcar/parkingcar.component';
import { ParkingcarService } from '../../../services/parkingcar.service';
import { DeviceService } from '../../../services/device.service';
import { ElectronService } from '../../../services/electron.service';

@NgModule({
  declarations: [RolesComponent, UsersComponent, CustomersComponent, CarsComponent, DiscountComponent, ParkingcarComponent,TarrifComponent],
  providers : [
      RoleService,
      UserService,
      CustomerService,
      CarService,
      DiscountService,
      ParkingcarService,
      TarrifService,
      DeviceService,
      ElectronService
  ],
  imports: [
    CommonModule,     
    NgbModalModule,
    NgbPaginationModule,
    CommonModule,        
    FormsModule,
    ReactiveFormsModule,
    HumanresourceRoutingModule
  ]
})
export class HumanresourceModule { }
