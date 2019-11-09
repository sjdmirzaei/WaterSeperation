import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { NgbModal, NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";

import { Treaty } from "../../../../model/barrel";
import { TreatyService } from "../../../../services/Codeing/treaty.service";

  @Component({
    selector: 'app-treaty',
    templateUrl: './treaty.component.html',
    styleUrls: ['./treaty.component.css']
  })
  
export class TreatyComponent implements OnInit {
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
  public currentItem: Treaty;

  public list: Array<Treaty>;

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private _Service: TreatyService
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

  showAddEdit(treaty: Treaty) {
    this.addEditForm.reset();

    this.currentItem = new Treaty();

    if (treaty) this.currentItem = { ...treaty };

    this.modal.open(this.addEditModalContent, { size: "lg" });
  }

  showDelete(item: Treaty) {
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


