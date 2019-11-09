import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ReportGroup } from '../../../../model/barrel';
import { ReportGroupService } from '../../../../services/reportgroup.service';

@Component({
    selector: 'app-reportgroup',
    templateUrl: './reportgroup.component.html',
    styleUrls: ['./reportgroup.component.css']
})
export class ReportGroupComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: ReportGroup;

    public list: Array<ReportGroup>;

    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: ReportGroupService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            icon: ['', Validators.required]
        });


        this.load();
    }

    load() {
        this._service.list(this.page).subscribe(rec => {

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

    showAddEdit(item: ReportGroup) {

        this.addEditForm.reset();


        this.currentItem = new ReportGroup();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.addEditModalContent);

    }

    showDelete(item: ReportGroup) {

        this.currentItem = { ...item };

        this.modal.open(this.deleteModalContent);

    }

    delete() {

        this._service.delete(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();
            this.load();

        });

    }

}
