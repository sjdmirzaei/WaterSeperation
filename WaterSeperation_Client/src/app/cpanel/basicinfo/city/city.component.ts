import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { City ,Region} from '../../../../model/barrel';
import { CityService } from '../../../../services/city.service';

@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('deleteModalContent')
    deleteModalContent: TemplateRef<any>;


    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    public page: number = 1;
    public listCount: number = 1;
    public currentItem: City;

    public list: Array<City> = [];
    public regionList: Array<Region> = [];

    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private _service: CityService) { }

    ngOnInit() {
        this.addEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            regionId: ['', Validators.required]    
        });

        this.load();

        this._service.bindRegionList().subscribe(rec => {
            this.regionList = rec.regionlist;
           
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
        this.currentItem.regionId=+this.currentItem.region.id;
        this._service.save(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

            this.load();

        });
    }

    showAddEdit(item: City) {

        this.addEditForm.reset();
        this.currentItem = new City();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.addEditModalContent);

    }

    showDelete(menu: City) {

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
