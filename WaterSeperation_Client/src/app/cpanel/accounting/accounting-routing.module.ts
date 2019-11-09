import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterdocumentComponent } from './registerdocument/registerdocument.component';
import { FinancialyearComponent } from './financialyear/financialyear.component';

const routes: Routes = [
   {
    path: '', 
    children: [            
        { path: 'registerdocument', component: RegisterdocumentComponent, data: { header: 'سند حسابداری' } },           
        { path: 'financialyear', component: FinancialyearComponent, data: { header: 'سال مالی' } },           
         { path: '**', redirectTo: 'dashboard' }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
