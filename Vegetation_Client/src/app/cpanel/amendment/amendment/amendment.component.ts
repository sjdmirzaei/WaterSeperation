import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Amendment, TransactionType, PelakLetter} from '../../../../model/barrel';
import { AmendmentService } from '../../../../services/amendment.service';

@Component({
  selector: 'app-amendment',
  templateUrl: './amendment.component.html',
  styleUrls: ['./amendment.component.css']
})
export class AmendmentComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: Amendment;

    public list: Array<Amendment> = [];
    public pelakletterList: Array<PelakLetter> = [];
    public transactionTypeList: Array<TransactionType> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: AmendmentService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            pelaksection1: ['', Validators.required],
            pelaksection2: ['', Validators.required],
            pelaksection3: ['', Validators.required],
            pelaksection4: ['', Validators.required],
            transactiontypeidref:['',Validators.required],
            value:['',Validators.required]
 
        });

        this.load();

        this._service.bindPelakLetterList().subscribe(rec => {
            this.pelakletterList = rec.list;
           
        });

        this._service.bindTransactionTypeEditableList().subscribe(rec => {
            this.transactionTypeList = rec.list;
           
        });
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
        // this.currentItem.regionId=+this.currentItem.region.id;
        this._service.save(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

            this.load();

        });
    }

    showAddEdit(item: Amendment) {

        this.addEditForm.reset();
        this.currentItem = new Amendment();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.addEditModalContent);

    }

    showDelete(menu: Amendment) {

        this.currentItem = { ...menu };
        this.modal.open(this.deleteModalContent);

    }

    delete() {

        this._service.delete(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();
            this.load();

        });

    }

}
