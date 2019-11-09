import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CityService } from '../../../../services/city.service';
import { StorageService } from '../../../../services/Storage.service';
import { Storage,City } from '../../../../model/barrel';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;

    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Storage;
    public citylist : Array<City>;
    public list: Array<Storage> = [];
    
    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: StorageService, private cityService:CityService) { } 

  ngOnInit() {
    this.addEditForm = this.formBuilder.group({
        name: ['', Validators.required],
        city: ['', Validators.required],
       
            
    });
    this.load();
    this.cityService.getBind().subscribe(res => {
        this.citylist = res.list;
    });
  
  }

  load()
  {
      this._service.getAll(this.page).subscribe(rec => {

          this.list = rec.list;
          this.listCount = rec.count;
        

      });            
      
  }

  showAddEdit(item : Storage) {
        
    this.addEditForm.reset();
    

    this.currentItem = new Storage();        

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

showDelete(storage : Storage) {
                                
    this.currentItem = {...storage};
    
    this.modal.open(this.deleteModalContent);
    
}

delete() {
                                    
    this._service.delete(this.currentItem).subscribe(rec => {            
        
        this.modal.dismissAll();
        this.load();
       
    });  
}  


}
