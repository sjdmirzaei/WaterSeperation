import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";

import { ActivityScope } from '../../../../model/barrel';
import { ActivityScopeService } from '../../../../services/activityscope.service';

@Component({
  selector: 'app-activityscope',
  templateUrl: './activityscope.component.html',
  styleUrls: ['./activityscope.component.css']
})
export class ActivityscopeComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }
    
    public page: number = 1;
    public listCount : number = 1;
    public currentItem : ActivityScope;

    public list : Array<ActivityScope>;

    constructor(private modal: NgbModal, private formBuilder: FormBuilder , private _parkingtypeService : ActivityScopeService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            phone: [''],            
            address: ['', Validators.required]            
        });


       this.load();
    }

    load()
    {
        this._parkingtypeService.getAll(this.page).subscribe(rec => {

            this.list = rec.list;
            this.listCount = rec.count;

        });            
        
    }

    onSubmit() {

        if (this.addEditForm.invalid) 
        {                        
            return;   
        }
            
        this._parkingtypeService.save(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();

            this.load();                              
            
        });
    }    

    showAddEdit(item : ActivityScope) {
        
        this.addEditForm.reset();
        

        this.currentItem = new ActivityScope();

        if(item)
            this.currentItem = {...item};
        
        this.modal.open(this.addEditModalContent, { size: 'lg' });
        
    }

    showDelete(item : ActivityScope) {
                                
        this.currentItem = {...item};
        
        this.modal.open(this.deleteModalContent);
        
    }

    delete() {
                                        
        this._parkingtypeService.delete(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();
            this.load();
           
        });        
        
    }

}
