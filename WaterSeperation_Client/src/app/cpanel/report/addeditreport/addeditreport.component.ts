import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Report, ReportParameterView, StaticItemView, ReportGroup, ReportColumnView } from '../../../../model/barrel';
import { ReportManagmentService } from '../../../../services/reportmanagment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportGroupService } from '../../../../services/reportgroup.service';

@Component({
    selector: 'app-addeditreport',
    templateUrl: './addeditreport.component.html',
    styleUrls: ['./addeditreport.component.css']
})
export class AddEditReportComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;

    @ViewChild('addEditColumnModalContent')
    addEditColumnModalContent: TemplateRef<any>;

    @ViewChild('deleteColumnModalContent')
    deleteColumnModalContent: TemplateRef<any>;

    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    addEditColumn: FormGroup;
    get fc() { return this.addEditColumn.controls; }

    addEditParameter: FormGroup;
    get fp() { return this.addEditParameter.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Report;
    public reportGroups: Array<ReportGroup> = [];
    public currentPropertyItem: ReportParameterView;
    public list: Array<Report> = [];
    public reportId: number;
    public parameterTypes: any[] = [];
    public currentColumnItem: ReportColumnView;

    constructor(private modal: NgbModal, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder
        , private _service: ReportManagmentService
        , private _serviceReportGroup: ReportGroupService) { }

    ngOnInit() {

        this.activatedRoute.params.subscribe(param => {

            this.reportId = +param['id'];

            this.currentItem = new Report();

            this.loadReportGroupsList();
            this.buildParameterTypesList();
            if (this.reportId != 0)
                this.load();
        });

        this.addEditForm = this.formBuilder.group({
            title: ['', Validators.required],
            reportGroupId: ['', Validators.required],
            query: ['', Validators.required]
        });


        this.addEditParameter = this.formBuilder.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            width: ['', Validators.required],
            type: ['', Validators.required]
        });


        this.addEditColumn = this.formBuilder.group({
            title: ['', Validators.required]
        });

    }

    load() {
        this._service.get(this.reportId).subscribe(rec => {

            this.currentItem.report = rec.report;
            this.currentItem.reportColumns = rec.reportColumns;
            this.currentItem.reportParameters = rec.reportParameters;
        });
    }

    //--------------------------------------------------------------------------------

    showAddEditColumn(item: ReportColumnView) {

        this.addEditColumn.reset();
        this.currentColumnItem = new ReportColumnView();

        if (item)
            this.currentColumnItem = { ...item };

        this.modal.open(this.addEditColumnModalContent);
    }

    showDeleteColumn(item: ReportColumnView) {

        this.currentColumnItem = { ...item };
        this.modal.open(this.deleteColumnModalContent);
    }

    onSubmitColumn() {

        if (this.addEditColumn.invalid) {
            return;
        }

        if (this.currentColumnItem.id == null) {
            var id = 0;

            try {
                id = this.currentItem.reportColumns.find(rec => rec.id == Math.min(rec.id)).id;
            }
            catch{ }

            if (id >= 0)
                this.currentColumnItem.id = -1;
            else
                this.currentColumnItem.id = id - 1;
            this.currentItem.reportColumns.unshift(this.currentColumnItem);
        }
        else {
            var index = this.currentItem.reportColumns.findIndex(rec => rec.id == this.currentColumnItem.id)
            this.currentItem.reportColumns[index] = this.currentColumnItem;
        }

        this.modal.dismissAll();
    }

    deleteColumn() {
        if (this.currentColumnItem.id > 0)
            this.currentItem.deleteColumns.push(this.currentColumnItem.id);

        var index = this.currentItem.reportColumns.findIndex(rec => rec.id == this.currentColumnItem.id)
        this.currentItem.reportColumns.splice(index, 1);
        this.modal.dismissAll();
    }

    //--------------------------------------------------------------------------------

    showAddEdit(item: ReportParameterView) {

        this.addEditParameter.reset();
        this.currentPropertyItem = new ReportParameterView();

        if (item)
            this.currentPropertyItem = { ...item };

        this.modal.open(this.addEditModalContent, { size: 'lg' });
    }

    showDelete(item: ReportParameterView) {

        this.currentPropertyItem = { ...item };
        this.modal.open(this.deleteModalContent);

    }

    onSubmitParameter() {

        if (this.addEditParameter.invalid) {
            return;
        }
        var index = this.parameterTypes.findIndex(rec => rec.value == this.currentPropertyItem.type)
        this.currentPropertyItem.typeTitle = this.parameterTypes[index].key;

        if (this.currentPropertyItem.id == null) {
            var id = 0;

            try {
                id = this.currentItem.reportParameters.find(rec => rec.id == Math.min(rec.id)).id;
            }
            catch{ }

            if (id >= 0)
                this.currentPropertyItem.id = -1;
            else
                this.currentPropertyItem.id = id - 1;
            this.currentItem.reportParameters.unshift(this.currentPropertyItem);
        }
        else {
            var index = this.currentItem.reportParameters.findIndex(rec => rec.id == this.currentPropertyItem.id)
            this.currentItem.reportParameters[index] = this.currentPropertyItem;
        }

        this.modal.dismissAll();
    }

    deleteParameter() {
        if (this.currentPropertyItem.id > 0)
            this.currentItem.deleteParameters.push(this.currentPropertyItem.id);

        var index = this.currentItem.reportParameters.findIndex(rec => rec.id == this.currentPropertyItem.id)
        this.currentItem.reportParameters.splice(index, 1);
        this.modal.dismissAll();
    }

    //--------------------------------------------------------------------------------

    onSubmit() {

        if (this.addEditForm.invalid) {

            // alert("error validation");

            return;
        }

        this._service.save(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

            // alert("successfull");

            this.router.navigate(['cpanel/report/reportmanagment']);

        });
    }

    loadReportGroupsList() {
        this._serviceReportGroup.list().subscribe(rec => {

            this.reportGroups = rec.list;

        });
    }

    buildParameterTypesList() {
        this.parameterTypes.push({ value: 1, key: 'جعبه متنی' });
        this.parameterTypes.push({ value: 2, key: 'جعبه متن عددی' });
        this.parameterTypes.push({ value: 3, key: 'جعبه تاریخ' });
        this.parameterTypes.push({ value: 4, key: 'ساعت' });
        this.parameterTypes.push({ value: 5, key: 'چک باکس' });
        this.parameterTypes.push({ value: 6, key: 'لیست کشویی ایستا' });
        this.parameterTypes.push({ value: 7, key: 'لیست کشویی پویا' });
    }

    closeColumn() {
        this.modal.dismissAll();
    }

    closeParameter() {
        this.modal.dismissAll();
    }

    addStaticItem(i) {

        // let textcontrol: FormControl = new FormControl("text" + i, Validators.required);
        // this.addEditParameter.addControl("text" + i, textcontrol);

        // let valuecontrol: FormControl = new FormControl("value" + i, Validators.required);
        // this.addEditParameter.addControl("value" + i, valuecontrol);

        this.currentPropertyItem.staticItems.push(new StaticItemView());
    }

}
