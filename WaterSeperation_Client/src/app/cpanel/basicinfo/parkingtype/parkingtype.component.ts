import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";

import { ParkingType } from '../../../../model/barrel';
import { ParkingTypeService } from '../../../../services/parakingtype.service';

@Component({
  selector: 'app-parkingtype',
  templateUrl: './parkingtype.component.html',
  styleUrls: ['./parkingtype.component.css']
})
export class ParkingtypeComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }
    
    public page: number = 1;
    public listCount : number = 1;
    public currentItem : ParkingType;

    public list : Array<ParkingType>;

    constructor(private modal: NgbModal, private formBuilder: FormBuilder , private _Service : ParkingTypeService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required]            
        });


       this.load();
    }

    load()
    {
        this._Service.getAll(this.page).subscribe(rec => {

            this.list = rec.list;
            this.listCount = rec.count;

        });            
        
    }

    onSubmit() {

        if (this.addEditForm.invalid) 
        {                        
            return;   
        }
            
        this._Service.save(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();

            this.load();                              
            
        });
    }    

    showAddEdit(parkingtype : ParkingType) {
        
        this.addEditForm.reset();
        

        this.currentItem = new ParkingType();

        if(parkingtype)
            this.currentItem = {...parkingtype};
        
        this.modal.open(this.addEditModalContent, { size: 'lg' });
        
    }

    showDelete(item : ParkingType) {
                                
        this.currentItem = {...item};
        
        this.modal.open(this.deleteModalContent);
        
    }

    delete() {
                                        
        this._Service.delete(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();
            this.load();
           
        });        
        
    }


}
