import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Formula } from '../../../../model/barrel';
import { FormulaService } from '../../../../services/formula.service';

@Component({
    selector: 'app-formula',
    templateUrl: './formula.component.html',
    styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Formula;

    public list: Array<Formula>;

    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private formulaService: FormulaService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            content: ['', Validators.required],
            parameters: [''],
            index: ['']
        });


        this.load();
    }

    load() {
        this.formulaService.getAll(this.page).subscribe(rec => {

            this.list = rec.list;
            this.listCount = rec.count;

        });

    }

    onSubmit() {

        if (this.addEditForm.invalid) {
            return;
        }

        this.formulaService.save(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

            this.load();

        });
    }

    showAddEdit(item: Formula) {

        this.addEditForm.reset();


        this.currentItem = new Formula();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.addEditModalContent, { size: 'lg' });

    }

    showDelete(formula: Formula) {

        this.currentItem = { ...formula };

        this.modal.open(this.deleteModalContent);

    }

    delete() {

        this.formulaService.delete(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();
            this.load();

        });

    }

    execute(formula: Formula) {

        this.currentItem = { ...formula };

        this.formulaService.execute(this.currentItem).subscribe(rec => {

        });

    }

}
