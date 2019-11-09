import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Layer } from '../../../../model/barrel';
import { LayerService } from '../../../../services/layers.service';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
  
    get f() { return this.addEditForm.controls; }
    
    public page: number = 1;
    public listCount : number = 1;
    public currentItem : Layer;

    public list : Array<Layer> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder , private _service : LayerService) { }

  ngOnInit() {
    this.addEditForm = this.formBuilder.group({
        title: ['', Validators.required],
        url: ['', Validators.required]
    });


   this.load();
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

showAddEdit(item : Layer) {
    this.addEditForm.reset();
    
    this.currentItem = new Layer();

    if(item)
        this.currentItem = {...item};
    
    this.modal.open(this.addEditModalContent, { size: 'lg' });
}

showDelete(item : Layer) {
                            
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
