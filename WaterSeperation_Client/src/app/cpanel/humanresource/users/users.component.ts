import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserService } from '../../../../services/user.service';
import { RoleService } from '../../../../services/role.service';
import { User,Role } from '../../../../model/barrel';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('roleModalContent')
    roleModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;

    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

   

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: User;

    public list: Array<User> = [];
    public rolelist : Array<Role>;
    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: UserService, private _roleservice: RoleService) { }


  ngOnInit() {

    this.addEditForm = this.formBuilder.group({
        name: ['', Validators.required],
        family: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        Deactivated: [''],
    });
    


    
    this. _roleservice.getAll().subscribe(res => {
        this.rolelist = res.list;
    });

    this.load();    
  }

  load() {
    this._service.getAll(this.page).subscribe(rec => {

        this.list = rec.list;
        this.listCount = rec.count;
    });

    }

    onSubmit() {

        if (this.addEditForm.invalid) {
            return;
        }

        this._service.save(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

            this.load();

        });
    }

    showAddEdit(item: User) {

        this.addEditForm.reset();
        this.currentItem = new User();
    
        if (item)
            this.currentItem = { ...item };
    
        this.modal.open(this.addEditModalContent);
    }

    showRoles(item: User) {
        this.rolelist.forEach(function (value) {
            value.checked=false;
          }); 
        
        this.currentItem = new User();
    
        if (item)
            this.currentItem = { ...item };

        for (let i = 0; i < this.rolelist.length ; i++) {
            
           if(this.currentItem.roles.findIndex(rec=>rec.id==this.rolelist[i].id)>=0)
                this.rolelist[i].checked=true;
              }
    
        this.modal.open(this.roleModalContent);
    }

   

    onRoleSubmit() {
        this.currentItem.roles= this.rolelist
     .filter(opt => opt.checked);
     
        
        this._service.saveRole(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

            this.load();

        });
    }

    showDelete(user: User) {

        this.currentItem = { ...user };
        this.modal.open(this.deleteModalContent);

    }

    delete() {

        this._service.delete(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();
            this.load();

        });

    }

}



