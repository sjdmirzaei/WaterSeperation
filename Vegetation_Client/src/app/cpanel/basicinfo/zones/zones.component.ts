import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ZoneService } from '../../../../services/zone.service';
import { StreetService } from '../../../../services/street.service';
import { Zone, Street } from '../../../../model/barrel';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Zone;
    public streetlist : Array<Street>;
    public list: Array<Zone> = [];
    
    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: ZoneService, private _streetservice: StreetService) { }


  ngOnInit() {

    this.addEditForm = this.formBuilder.group({
        name: ['', Validators.required],
        street: ['', Validators.required],
        parkinglocation: ['', Validators.required],
            
    });
    this.load();
    this._streetservice.getAll().subscribe(res => {
        this.streetlist = res.list;
    });
  }

  load()
  {
      this._service.getAll(this.page).subscribe(rec => {

          this.list = rec.list;
          this.listCount = rec.count;
        

      });            
      
  }

  showAddEdit(item : Zone) {
        
    this.addEditForm.reset();
    

    this.currentItem = new Zone();        

    if(item)
        this.currentItem = {...item};
    
    this.modal.open(this.addEditModalContent);
    
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

showDelete(zone : Zone) {
                                
    this.currentItem = {...zone};
    
    this.modal.open(this.deleteModalContent);
    
}

delete() {
                                    
    this._service.delete(this.currentItem).subscribe(rec => {            
        
        this.modal.dismissAll();
        this.load();
       
    });  
}      

}
