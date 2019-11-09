import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { StreetService } from '../../../../services/street.service';
import { AreaService } from '../../../../services/Area.service';
import { StorageService } from '../../../../services/Storage.service';
import { Street,Area,Storage } from '../../../../model/barrel';

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.css']
})
export class StreetComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;

    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Street;
    public arealist : Array<Area>;
    public storagelist : Array<Storage>;
    public list: Array<Street> = [];
    
    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: StreetService, private areaService:AreaService, private storageService:StorageService) { }

  ngOnInit() {
    this.addEditForm = this.formBuilder.group({
        name: ['', Validators.required],
        area: ['', Validators.required],
        storage: ['', Validators.required],
            
    });
    this.load();
    this.areaService.getAll().subscribe(res => {
        this.arealist = res.list;
    });
    this.storageService.getAll().subscribe(res => {
        this.storagelist = res.list;
    });

  }
  load()
  {
      this._service.getAll(this.page).subscribe(rec => {

          this.list = rec.list;
          this.listCount = rec.count;
        

      });            
      
  }

  showAddEdit(item : Street) {
        
    this.addEditForm.reset();
    

    this.currentItem = new Street();        

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
showDelete(street : Street) {
                                
    this.currentItem = {...street};
    
    this.modal.open(this.deleteModalContent);
    
}

delete() {
                                    
    this._service.delete(this.currentItem).subscribe(rec => {            
        
        this.modal.dismissAll();
        this.load();
       
    });  
}  

}
