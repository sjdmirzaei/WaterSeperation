import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";

import { ParkingOwner } from '../../../../model/barrel';
import { ParkingOwnerService } from '../../../../services/parakingowner.service';

@Component({
  selector: 'app-parkingowner',
  templateUrl: './parkingowner.component.html',
  styleUrls: ['./parkingowner.component.css']
})
export class ParkingownerComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }
    
    public page: number = 1;
    public listCount : number = 1;
    public currentItem : ParkingOwner;

    public list : Array<ParkingOwner>;

    constructor(private modal: NgbModal, private formBuilder: FormBuilder , private _parkingownerService : ParkingOwnerService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            phone: ['', Validators.required]            
        });


       this.load();
    }

    load() {
        this._parkingownerService.getAll(this.page).subscribe(rec => {

            this.list = rec.list;
            this.listCount = rec.count;

        });

    }

    onSubmit() {

        if (this.addEditForm.invalid) 
        {                        
            return;   
        }
            
        this._parkingownerService.save(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();

            this.load();                              
            
        });
    }    

    showAddEdit(parkingowner : ParkingOwner) {
        
        this.addEditForm.reset();
        

        this.currentItem = new ParkingOwner();

        if(parkingowner)
            this.currentItem = {...parkingowner};
        
        this.modal.open(this.addEditModalContent, { size: 'lg' });
        
    }

    showDelete(item : ParkingOwner) {
                                
        this.currentItem = {...item};
        
        this.modal.open(this.deleteModalContent);
        
    }

    delete() {
                                        
        this._parkingownerService.delete(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();
            this.load();
           
        });        
        
    }


}
