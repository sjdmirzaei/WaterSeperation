import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CarType } from '../../../../model/barrel';
import { CarTypeService } from '../../../../services/carType.service';

@Component({
    selector: 'app-cartype',
    templateUrl: './cartype.component.html',
    styleUrls: ['./cartype.component.css']
})
export class CartypeComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: CarType;

    public list: Array<CarType> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: CarTypeService) { }

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

    showAddEdit(item: CarType) {

        this.addEditForm.reset();
        this.currentItem = new CarType();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.addEditModalContent);

    }

    showDelete(menu: CarType) {

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
