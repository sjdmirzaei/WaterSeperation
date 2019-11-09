import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmendmentComponent } from './amendment/amendment.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'amendments', component: AmendmentComponent, data: { header: 'اصلاحیه ها' } },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AmendmentRoutingModule { }
