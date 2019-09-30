import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpotComponent } from './spot/spot.component';

const routes: Routes = [
   {
    path: '', 
    children: [            
        { path: 'spot', component: SpotComponent, data: { header: 'لکه فضای سبز' } },           
         { path: '**', redirectTo: 'dashboard' }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WaterresourceRoutingModule { }
