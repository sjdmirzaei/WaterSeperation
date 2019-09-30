import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";

import { Car } from '../../../../model/barrel';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

    @ViewChild('assignCustomerModalContent')
    assignCustomerModalContent: TemplateRef<any>;

    assignCustomerForm: FormGroup;
    get f() { return this.assignCustomerForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Car;

    public list: Array<Car> = [];
    public customerList: Array<Car> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: CarService) { }

    ngOnInit() {
        this.assignCustomerForm = this.formBuilder.group({
            customerId: ['']
        });

        this._service.bindCustomerList().subscribe(rec => {
            this.customerList = rec.list;
           
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

        if (this.assignCustomerForm.invalid) {
            return;
        }

        this._service.save(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

            this.load();

        });
    }

    showAssignCustomer(item: Car) {

        this.assignCustomerForm.reset();
        this.currentItem = new Car();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.assignCustomerModalContent);

    }


}

