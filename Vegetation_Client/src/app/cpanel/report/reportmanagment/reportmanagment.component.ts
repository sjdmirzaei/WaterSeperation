import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ReportManagment } from '../../../../model/barrel';
import { ReportManagmentService } from '../../../../services/reportmanagment.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reportmanagment',
    templateUrl: './reportmanagment.component.html',
    styleUrls: ['./reportmanagment.component.css']
})
export class ReportManagmentComponent implements OnInit {

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: ReportManagment;

    public list: Array<ReportManagment> = [];

    constructor(private modal: NgbModal, private router: Router, private formBuilder: FormBuilder, private _service: ReportManagmentService) { }

    ngOnInit() {

        this.load();
    }

    load() {
        this._service.list(this.page).subscribe(rec => {

            this.list = rec.list;
            this.listCount = rec.count;

        });

    }

    showAddEdit(item: ReportManagment) {

        try {
            this.router.navigate(['cpanel/report/addeditreport/' + item.id]);
        }
        catch {
            this.router.navigate(['cpanel/report/addeditreport/0']);
        }
    }

    showDelete(item: ReportManagment) {

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
