import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulaComponent } from './formula/formula.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'formula', component: FormulaComponent, data: { header: 'فرمول ها' } },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormulageneratorRoutingModule { }
