import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Menu, Subsystem} from '../../../../model/barrel';
import { MenuService } from '../../../../services/menu.service';
import { SubsystemService } from '../../../../services/subsystem.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }
    
    public page: number = 1;
    public listCount : number = 1;
    public currentItem : Menu;


    public list : Array<Menu>;

    public subsystemlist : Array<Subsystem>;

    public parentmenulist : Array<Menu>;

    constructor(private modal: NgbModal, private formBuilder: FormBuilder , private menuService : MenuService , private subsystemService : SubsystemService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            title: ['', Validators.required],
            url: ['', Validators.required],
            icon: ['', Validators.required],
            subsystem : ['' , Validators.required],  
            parentmenu : ['']       
        });

       this.load();

        this.subsystemService.getAll().subscribe(res => {
            this.subsystemlist = res.list;
        });
          
    }

    load()
    {
        this.menuService.getAll(this.page).subscribe(rec => {

            this.list = rec.list;
            this.listCount = rec.count;
            this.parentmenulist=rec.listParent;

        });            
        
    }

    onSubmit() {

        if (this.addEditForm.invalid) 
        {                        
            return;   
        }
            
        this.menuService.save(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();

            this.load();                              
            
        });
    }    

    showAddEdit(item : Menu) {
        
        this.addEditForm.reset();
        

        this.currentItem = new Menu();        

        if(item)
            this.currentItem = {...item};
        
        this.modal.open(this.addEditModalContent, { size: 'lg' });
        
    }

    showDelete(menu : Menu) {
                                
        this.currentItem = {...menu};
        
        this.modal.open(this.deleteModalContent);
        
    }

    delete() {
                                        
        this.menuService.delete(this.currentItem).subscribe(rec => {            
            
            this.modal.dismissAll();
            this.load();
           
        });        
        
    }


}
