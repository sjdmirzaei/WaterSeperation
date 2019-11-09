import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Discount } from '../../../../model/barrel';
import { DiscountService } from '../../../../services/discount.service';
@Component({
    selector: 'app-discount',
    templateUrl: './discount.component.html',
    styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;

    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Discount;

    public list: Array<Discount> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: DiscountService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required]
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

        this._service.save(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

            this.load();

        });
    }

    showAddEdit(item: Discount) {

        this.addEditForm.reset();
        this.currentItem = new Discount();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.addEditModalContent);

    }

    showDelete(menu: Discount) {

        this.currentItem = { ...menu };
        this.modal.open(this.deleteModalContent);

    }

    delete() {

        this._service.delete(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();
            this.load();

        });

    }

}


