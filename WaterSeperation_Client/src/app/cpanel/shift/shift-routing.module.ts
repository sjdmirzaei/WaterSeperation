import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignshiftComponent } from './assignshift/assignshift.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'assignshiftmargin', component: AssignshiftComponent, data: { header: 'انتساب شیفت حاشیه ای', status: 1 } },
            { path: 'assignshiftnonmargin', component: AssignshiftComponent, data: { header: 'انتساب شیفت غیر حاشیه ای', status: 2 } },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShiftRoutingModule { }




