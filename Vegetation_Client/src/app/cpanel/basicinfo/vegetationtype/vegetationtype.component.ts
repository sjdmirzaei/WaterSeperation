import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { NgbModal, NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";

import { VegetationType } from "../../../../model/barrel";
import { VegetationTypeService } from "../../../../services/Codeing/vegetationtype.service";

  @Component({
    selector: 'app-vegetationtype',
    templateUrl: './vegetationtype.component.html',
    styleUrls: ['./vegetationtype.component.css']
  })
  
export class VegetationTypeComponent implements OnInit {
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
  public currentItem: VegetationType;

  public list: Array<VegetationType>;

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private _Service: VegetationTypeService
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

  showAddEdit(vegetationtype: VegetationType) {
    this.addEditForm.reset();

    this.currentItem = new VegetationType();

    if (vegetationtype) this.currentItem = { ...vegetationtype };

    this.modal.open(this.addEditModalContent, { size: "lg" });
  }

  showDelete(item: VegetationType) {
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



