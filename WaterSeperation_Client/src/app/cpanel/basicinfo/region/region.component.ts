import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { NgbModal, NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";

import { Region } from "../../../../model/barrel";
import { RegionService } from "../../../../services/Codeing/region.service";

@Component({
    selector: 'app-Region',
    templateUrl: './Region.component.html',
    styleUrls: ['./Region.component.css']
  })
  

export class RegionComponent implements OnInit {
  @ViewChild("addEditModalContent")
  addEditModalContent: TemplateRef<any>;

  @ViewChild("deleteModalContent")
  deleteModalContent: TemplateRef<any>;

  addEditForm: FormGroup;
  get f() {
    return this.addEditForm.controls;
  }

  public page: number = 1;
  public listCount: number = 1;
  public currentItem: Region;

  public list: Array<Region>;

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private _Service: RegionService
  ) {}

  ngOnInit() {
    this.addEditForm = this.formBuilder.group({
      name: ["", Validators.required],
      code: ["", Validators.required],
      description: [""]
    });

    this.load();
  }

  load() {
    this._Service.getAll(this.page).subscribe(rec => {
      this.list = rec.data;
      this.listCount = rec.count;
    });
  }

  onSubmit() {
    if (this.addEditForm.invalid) {
      return;
    }
    if (!this.currentItem.description) {
      this.currentItem.description = "   ";
    }
    this._Service.save(this.currentItem).subscribe(rec => {
      this.modal.dismissAll();

      this.load();
    });
  }

  showAddEdit(region: Region) {
    this.addEditForm.reset();

    this.currentItem = new Region();

    if (region) this.currentItem = { ...region };

    this.modal.open(this.addEditModalContent, { size: "lg" });
  }

  showDelete(item: Region) {
    this.currentItem = { ...item };

    this.modal.open(this.deleteModalContent);
  }

  delete() {
    this._Service.delete(this.currentItem).subscribe(rec => {
      this.modal.dismissAll();
      this.load();
    });
  }
}


