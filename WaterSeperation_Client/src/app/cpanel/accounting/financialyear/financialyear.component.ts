import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { FinancialYearService } from '../../../../services/FinancialYear.service';
import { FinancialYear } from '../../../../model/barrel';

@Component({
  selector: 'app-financialyear',
  templateUrl: './financialyear.component.html',
  styleUrls: ['./financialyear.component.css']
})
export class FinancialyearComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: FinancialYear;

    public list: Array<FinancialYear> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: FinancialYearService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            status: [''],
            FormDate: ['', Validators.required],
            toDate: ['', Validators.required],
        });

        this.load();
    }

    load() {
        this._service.getAll(this.page).subscribe(rec => {

            this.list = rec.list;
            this.listCount = rec.count;

        });

    }

    onSubmit() {

        if (this.addEditForm.invalid) {
            return;
        }
        this.currentItem.status=true;
        this._service.save(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

            this.load();

        });
    }

    showAddEdit(item: FinancialYear) {

        this.addEditForm.reset();
        this.currentItem = new FinancialYear();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.addEditModalContent, { size: 'lg' });

    }

    showDelete(FinancialYear: FinancialYear) {

        this.currentItem = { ...FinancialYear };
        this.modal.open(this.deleteModalContent);

    }

    delete() {

        this._service.delete(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();
            this.load();

        });

    }

   
}
