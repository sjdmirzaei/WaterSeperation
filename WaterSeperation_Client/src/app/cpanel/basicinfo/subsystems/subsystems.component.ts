import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subsystem } from '../../../../model/barrel';
import { SubsystemService } from '../../../../services/subsystem.service';

@Component({
    selector: 'app-subsystems',
    templateUrl: './subsystems.component.html',
    styleUrls: ['./subsystems.component.css']
})
export class SubsystemsComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }
    
    public page: number = 1;
    public listCount : number = 1;
    public currentItem : Subsystem;

    public list : Array<Subsystem>;

    constructor(private modal: NgbModal, private formBuilder: FormBuilder , private subsystemService : SubsystemService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            icon: ['', Validators.required]            
        });


       this.load();
    }

    load()
    {
        this.subsystemService.getAll(this.page).subscribe(rec => {

            this.list = rec.list;
            this.listCount = rec.count;

        });            
        
    }

    onSubmit() {

        if (this.addEditForm.invalid) 
        {                        
            return;   
        }
            
        this.subsystemService.save(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();

            this.load();                              
            
        });
    }    

    showAddEdit(subsystem : Subsystem) {
        
        this.addEditForm.reset();
        

        this.currentItem = new Subsystem();

        if(subsystem)
            this.currentItem = {...subsystem};
        
        this.modal.open(this.addEditModalContent);
        
    }

    showDelete(subsystem : Subsystem) {
                                
        this.currentItem = {...subsystem};
        
        this.modal.open(this.deleteModalContent);
        
    }

    delete() {
                                        
        this.subsystemService.delete(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();
            this.load();
           
        });        
        
    }

}
