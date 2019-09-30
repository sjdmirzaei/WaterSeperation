import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReportManagmentService } from '../../../../services/reportmanagment.service';
import { Report, ReportResult } from '../../../../model/barrel';
import 'rxjs/add/operator/map'

@Component({
    selector: 'app-viewreport',
    templateUrl: './viewreport.component.html',
    styleUrls: ['./viewreport.component.css']
})

export class ViewReportComponent implements OnInit {

    // executeForm: FormGroup;
    // get f() { return this.executeForm.controls; }

    public reportId: number;
    public currentItem: Report;
    public result: Array<ReportResult> = [];
    public columns: any[] = [];
    public rows: any[] = [];
    public sumRow: {};
    public avgRow: {};
    public isSum: boolean = false;
    public isAvg: boolean = false;

    constructor(private modal: NgbModal, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private _service: ReportManagmentService) { }

    ngOnInit() {
       

        this.activatedRoute.params.subscribe(param => {
           
            this.result = [];
            this.columns = [];
            this.rows = [];
            this.sumRow = {};
            this.avgRow = {};

            this.reportId = +param['id'];

            this.currentItem = new Report();

            if (this.reportId != 0)
                this.load();

        });

    }


    load() {
        this._service.getbyexecute(this.reportId).subscribe(rec => {

            this.currentItem = rec.result;
            this.currentItem.reportColumns.forEach(element => {
                element.checked = true;
            });

        });
    }

    execute() {

        // if (this.executeForm.invalid) {
        //     return;
        // }
        
        this.isSum = false;
        this.isAvg = false;

        this._service.execute(this.currentItem).subscribe(rec => {

            this.columns = rec.columns;
            this.rows = rec.rows;

            this.sumRow = rec.sumRow.itemArray;
            for (const [key, value] of Object.entries(this.sumRow)) {
                if (value != null)
                    this.isSum = true;
            }

            this.avgRow = rec.avgRow.itemArray;
            for (const [key, value] of Object.entries(this.avgRow)) {
                if (value != null)
                    this.isAvg = true;
            }
        });
    }

}
