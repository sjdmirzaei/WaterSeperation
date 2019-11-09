import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ShiftService } from '../../../../services/shift.service';
import { Shift } from '../../../../model/barrel';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Shift;

    public list: Array<Shift> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: ShiftService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            startDelay: ['', Validators.required]
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

    showAddEdit(item: Shift) {

        this.addEditForm.reset();
        this.currentItem = new Shift();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.addEditModalContent, { size: 'lg' });

    }

    showDelete(shift: Shift) {

        this.currentItem = { ...shift };
        this.modal.open(this.deleteModalContent);

    }

    delete() {

        this._service.delete(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();
            this.load();

        });

    }

}
