import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Parking, ParkingOwner, ParkingType, ParkingUsageType, ActivityScope } from '../../../../model/barrel';
import { ParkingService } from '../../../../services/parking.service';

import { Spot, IrrigationMethod, Region, SpotType, Treaty, VegetationType } from '../../../../model/barrel';
import { SpotService } from '../../../../services/Main/spot.service';

@Component({
    selector: 'app-spot',
    templateUrl: './spot.component.html',
    styleUrls: ['./spot.component.css']
  })
  
export class SpotComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
  
    get f() { return this.addEditForm.controls; }
    
    public page: number = 1;
    public listCount : number = 1;
    public currentItem : Spot;

    public list : Array<Spot> = [];

    public irrigationMethodList : Array<IrrigationMethod> = [];
    public regionList : Array<Region> = [];
    public spotTypeList : Array<SpotType> = [];
    public treatyList : Array<Treaty> = [];
    public vegetationTypeList : Array<VegetationType> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder , private _service : SpotService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],            
            space: ['', [Validators.required , Validators.pattern('[0-9]*')]],            
            irridationMethodId : ['', Validators.required],            
            regionId : ['', Validators.required],            
            spotTypeId : ['', Validators.required],            
            treatyId : ['', Validators.required],
            vegetationTypeId : ['', Validators.required],
        });


       this.load();
 
       this._service.getAllBaseInfo().subscribe(rec => {
           this.irrigationMethodList = rec.listIrrigationMethod;
           this.regionList = rec.listRegion;
           this.spotTypeList = rec.listSpotType;
           this.treatyList = rec.listTreaty;
           this.vegetationTypeList = rec.listVegetationType;
       });

    }

    load()
    {
        this._service.getAll(this.page).subscribe(rec => {

            this.list = rec.data;
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

    showAddEdit(item : Spot) {
        
        this.addEditForm.reset();
        

        this.currentItem = new Spot();

        if(item)
            this.currentItem = {...item};
        
        this.modal.open(this.addEditModalContent, { size: 'lg' });
        
    }

    showDelete(item : Spot) {
                                
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


