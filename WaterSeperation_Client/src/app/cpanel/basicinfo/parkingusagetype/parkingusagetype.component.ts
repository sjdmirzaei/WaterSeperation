import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";

import { ParkingUsageType } from '../../../../model/barrel';
import { ParkingUsageTypeService } from '../../../../services/parakingusagetype.service';


@Component({
  selector: 'app-parkingusagetype',
  templateUrl: './parkingusagetype.component.html',
  styleUrls: ['./parkingusagetype.component.css']
})
export class ParkingusagetypeComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }
    
    public page: number = 1;
    public listCount : number = 1;
    public currentItem : ParkingUsageType;

    public list : Array<ParkingUsageType>;

    constructor(private modal: NgbModal, private formBuilder: FormBuilder , private _parkingtypeService : ParkingUsageTypeService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required]            
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

    showAddEdit(item : ParkingUsageType) {
        
        this.addEditForm.reset();
        

        this.currentItem = new ParkingUsageType();

        if(item)
            this.currentItem = {...item};
        
        this.modal.open(this.addEditModalContent, { size: 'lg' });
        
    }

    showDelete(item : ParkingUsageType) {
                                
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
