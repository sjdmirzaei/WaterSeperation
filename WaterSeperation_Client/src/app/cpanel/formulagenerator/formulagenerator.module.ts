import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbPaginationModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormulageneratorRoutingModule } from './formulagenerator-routing.module';
import { FormulaComponent } from './formula/formula.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulaService } from '../../../services/formula.service';

@NgModule({
    declarations: [FormulaComponent],
    providers: [
        FormulaService
    ],
    imports: [
        CommonModule,
        FormulageneratorRoutingModule,
        NgbModalModule,
        NgbPaginationModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class FormulageneratorModule { }
