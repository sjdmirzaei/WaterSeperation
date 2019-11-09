import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { NgbModal, NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";

import { SpotType } from "../../../../model/barrel";
import { SpotTypeService } from "../../../../services/Codeing/spottype.service";

@Component({
  selector: "app-spot-type",
  templateUrl: "./spot-type.component.html",
  styleUrls: ["./spot-type.component.css"]
})
export class SpotTypeComponent implements OnInit {
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
  public currentItem: SpotType;

  public list: Array<SpotType>;

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private _Service: SpotTypeService
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

  showAddEdit(spottype: SpotType) {
    this.addEditForm.reset();

    this.currentItem = new SpotType();

    if (spottype) this.currentItem = { ...spottype };

    this.modal.open(this.addEditModalContent, { size: "lg" });
  }

  showDelete(item: SpotType) {
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
