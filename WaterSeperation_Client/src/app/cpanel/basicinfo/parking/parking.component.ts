import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Parking, ParkingOwner, ParkingType, ParkingUsageType, ActivityScope } from '../../../../model/barrel';
import { ParkingService } from '../../../../services/parking.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
  
    get f() { return this.addEditForm.controls; }
    
    public page: number = 1;
    public listCount : number = 1;
    public currentItem : Parking;

    public list : Array<Parking> = [];

    public ownerList : Array<ParkingOwner> = [];
    public typeList : Array<ParkingType> = [];
    public usageTypeList : Array<ParkingUsageType> = [];
    public scopeList : Array<ActivityScope> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder , private _service : ParkingService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],            
            capacity: ['', [Validators.required , Validators.pattern('[0-9]*')]],            
            cartcount: ['', [Validators.required , , Validators.pattern('[0-9]*')]],            
            ownerId : ['', Validators.required],            
            typeId : ['', Validators.required],            
            usagetypeId : ['', Validators.required],            
            scopeId : ['', Validators.required],
            address : ['']        
        });


       this.load();
    

       this._service.getAllBaseInfo().subscribe(rec => {
           this.ownerList = rec.listParkingOwner;
           this.typeList = rec.listParkingType;
           this.usageTypeList = rec.listParkingUsageType;
           this.scopeList = rec.listActivateScope;
       });

    }

    load()
    {
        this._service.getAll(this.page).subscribe(rec => {

            this.list = rec.list;
            this.listCount = rec.count;

        });            
        
    }

  

    onSubmit() {

        if (this.addEditForm.invalid) 
        {                        
            return;   
        }
            
        this._service.save(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();

            this.load();                              
            
        });
    }    

    showAddEdit(item : Parking) {
        
        this.addEditForm.reset();
        

        this.currentItem = new Parking();

        if(item)
            this.currentItem = {...item};
        
        this.modal.open(this.addEditModalContent, { size: 'lg' });
        
    }

    showDelete(item : Parking) {
                                
        this.currentItem = {...item};
        
        this.modal.open(this.deleteModalContent);
        
    }

    delete() {
                                        
        this._service.delete(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();
            this.load();
           
        });        
        
    }
}
