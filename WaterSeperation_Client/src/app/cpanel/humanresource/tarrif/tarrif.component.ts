import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Tarrif } from '../../../../model/barrel';
import { TarrifService } from '../../../../services/tarrif.service';
import { TarrifCondition } from '../../../../model/TarrifCondition';
import { EnumList } from '../../../../model/EnumList';
import { TarrifConditionMargin } from '../../../../model/TarrifConditionMargin';


@Component({
    selector: 'app-tarrif',
    templateUrl: './tarrif.component.html',
    styleUrls: ['./tarrif.component.css']
})
export class TarrifComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('addEditConditionModalContent')
    addEditConditionModalContent: TemplateRef<any>;

    @ViewChild('addEditConditionMarginModalContent')
    addEditConditionMarginModalContent: TemplateRef<any>;


    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;

    @ViewChild('deleteConditionModalContent')
    deleteConditionModalContent: TemplateRef<any>;



    addEditForm: FormGroup;
    addEditConditionForm: FormGroup;
    addEditConditionMarginForm: FormGroup;
    get f() { return this.addEditForm.controls; }
    get f1() { return this.addEditConditionForm.controls; }
    get f2() { return this.addEditConditionMarginForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Tarrif;
    public current: TarrifCondition;
    public currentMargin: TarrifConditionMargin;
    public list: Array<Tarrif> = [];
    public Conditionlist: Array<TarrifCondition> = [];
    public ConditionMarginlist: Array<TarrifConditionMargin> = [];
    public CurrentTarrifId: number;
    public CurrentAction: number = 0;
    


    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: TarrifService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            parkingKind:['', Validators.required],
            RegisterFromDate: ['', Validators.required],
            RegisterToDate: ['', Validators.required],
            fromTime:[''],
            toTime:[''],
            fixCost:[''],
            intervalTime:[''],
            percent:[''],
        });

        this.addEditConditionForm = this.formBuilder.group({
            Cost: ['', Validators.required],
            Count: ['', Validators.required],
            PeriodicalCount: ['', Validators.required],
        });

        this.addEditConditionMarginForm = this.formBuilder.group({
            fromTime: [''],
            toTime: ['', Validators.required],
            fixCost: ['', Validators.required],
            intervalTime: ['', Validators.required],
            percent: ['', Validators.required],
            
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


        if (this.CurrentAction == 0) {
            if (this.addEditForm.invalid) {
                return;
            }
            this._service.save(this.currentItem).subscribe(rec => {
                this.ConditionMarginlist=rec.tarrifConditionMargin;
                this.Conditionlist=rec.tarrifCondition;
                this.current = rec.TarrifCondition;
                this.CurrentTarrifId=rec.currentId;
                this.modal.dismissAll();

                this.load();
                this.showAddEditCondition(null);

            });
        }
        else if (this.current != null) {
            if (this.addEditConditionForm.invalid) {
                return;
            }
            this.current.tarrifId = this.CurrentTarrifId;
            this._service.saveCondition(this.current).subscribe(rec => {

                this.Conditionlist = rec.conditionList;
                this.current.id=0;
                this.ngOnInit();
            });
        }

    }

    saveMargin(){
        if (this.addEditConditionMarginForm.invalid) {
            return;
        }
        this.currentMargin.tarrifId = this.CurrentTarrifId;
        this._service.saveConditionMargin(this.currentMargin).subscribe(rec => {

            this.ConditionMarginlist = rec.conditionMarginList;
            this.currentMargin.id=0;
            this.ngOnInit();
            this.currentMargin.intervalTime=30;
        });
    }

    showAddEdit(item: Tarrif) {

        this.addEditForm.reset();
        this.currentItem = new Tarrif();

        if (item)
        {
            this.currentItem = { ...item };
            this.CurrentTarrifId=item.id;
        }
       
        this.CurrentAction=0;
        this.modal.open(this.addEditModalContent);

    }



    showAddEditConditionTemp(item: TarrifCondition) {
        this.current = new TarrifCondition();
        if (item)
            this.current = { ...item };
    }

    showAddEditConditionMarginTemp(item: TarrifConditionMargin) {
        this.currentMargin = new TarrifConditionMargin();
        if (item)
            this.currentMargin = { ...item };
    }

    showAddEditCondition(item: TarrifCondition) {

       
        if(this.currentItem.parkingKind==1)
        {
            this.addEditConditionMarginForm.reset();


            this.currentMargin = new TarrifConditionMargin();
    
            if (item)
            {
                this.current = { ...item };
                this.CurrentTarrifId=this.current.tarrifId;
            }
            this._service.getConditionList(this.CurrentTarrifId).subscribe(rec => {

                this.Conditionlist = rec.list;
                this.CurrentAction = 1;
                this.modal.open(this.addEditConditionMarginModalContent, { size: 'lg' });
            });
        }
        else{
            this.addEditConditionForm.reset();


            this.current = new TarrifCondition();
    
            if (item)
            {
                this.current = { ...item };
                this.CurrentTarrifId=this.current.tarrifId;
            }
            this._service.getConditionList(this.CurrentTarrifId).subscribe(rec => {

                this.Conditionlist = rec.list;
                this.CurrentAction = 1;
                this.modal.open(this.addEditConditionModalContent);
            });
        }
        



    }


    showDelete(item: Tarrif) {
        this.currentItem = { ...item };
        this.modal.open(this.deleteModalContent);
    }


    delete() {
        this._service.delete(this.currentItem).subscribe(rec => {
            this.modal.dismissAll();
            this.load();
        });

    }

    showDeleteCondition(item: TarrifCondition) {
        this.current = { ...item };
        
        this.modal.open(this.deleteConditionModalContent);
    }

    deleteCondition(item: TarrifCondition) {
        this.current = { ...item };
        this._service.deleteCondition(this.current).subscribe(rec => {
            this._service.getConditionList(this.current.tarrifId).subscribe(rec => {
                this.Conditionlist = rec.list;
                this.current.id=0;
                this.ngOnInit();
            });
            
        });

    }

    deleteConditionMargin(item: TarrifConditionMargin) {
        this.currentMargin = { ...item };
        this._service.deleteConditionMargin(this.currentMargin).subscribe(rec => {
            this._service.getConditionMarginList(this.currentMargin.tarrifId).subscribe(rec => {
                this.ConditionMarginlist = rec.list;
                this.currentMargin.id=0;
                this.ngOnInit();
            });
            
        });

    }
}
