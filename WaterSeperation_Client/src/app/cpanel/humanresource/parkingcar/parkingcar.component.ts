import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Parking, Parkingcar, PelakLetter, ListParkingcar } from '../../../../model/barrel';
import { ParkingService } from '../../../../services/parking.service';
import { AmendmentService } from '../../../../services/amendment.service';
import { ParkingcarService } from '../../../../services/parkingcar.service';
import { DeviceService } from '../../../../services/device.service';
import { ElectronService } from '../../../../services/electron.service';
@Component({
    selector: 'app-parkingcar',
    templateUrl: './parkingcar.component.html',
    styleUrls: ['./parkingcar.component.css']
})
export class ParkingcarComponent implements OnInit {
    @ViewChild('addEditModalContent')
    addEditModalContent: TemplateRef<any>;

    @ViewChild('chargeModalContent')
    chargeModalContent: TemplateRef<any>;

    @ViewChild('parkingExitModalContent')
    parkingExitModalContent: TemplateRef<any>;

    addEditForm: FormGroup;
    get f() { return this.addEditForm.controls; }

    chargeForm: FormGroup;
    get c() { return this.chargeForm.controls; }

    parkingExitForm: FormGroup;
    get m() { return this.parkingExitForm.controls; }

    public parkinglist: Array<Parking>;
    public parkinglistCount: number;
    public ParkingCarlist: Array<ListParkingcar>;
    public currentparkedcar: ListParkingcar;
    public parking: Parking;
    public parkingId: number;
    public currentItem: Parkingcar;
    public ShowModalCharge: boolean = false;
    public pelakletterList: Array<PelakLetter> = [];
    public page: number = 1;

    constructor(private electronSrv: ElectronService, private deviceSrv: DeviceService, private modal: NgbModal, private formBuilder: FormBuilder, private parkingservice: ParkingService, private amendmentservice: AmendmentService, private _service: ParkingcarService) { }


    ngOnInit() {

        this.addEditForm = this.formBuilder.group({
            pelaksection1: ['', Validators.required],
            pelaksection2: ['', Validators.required],
            pelaksection3: ['', Validators.required],
            pelaksection4: ['', Validators.required],
            entrancedate: ['', Validators.required],
            entrancetime: ['', Validators.required],
            cardNo: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            nationalcode: ['', Validators.required],
            phone: ['']


        });

        this.chargeForm = this.formBuilder.group({
            pelaksection1: ['', Validators.required],
            pelaksection2: ['', Validators.required],
            pelaksection3: ['', Validators.required],
            pelaksection4: ['', Validators.required],
            charge: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            nationalcode: ['', Validators.required],
            phone: ['']

        });

        this.parkingExitForm = this.formBuilder.group({
            exitdate: ['', Validators.required],
            exittime: ['', Validators.required],

        });

        this.parkingservice.getAll().subscribe(res => {
            this.parkinglist = res.list;
        });

        this.amendmentservice.bindPelakLetterList().subscribe(rec => {
            this.pelakletterList = rec.list;

        });

    }

    showAddEdit(item: Parkingcar) {

        this.addEditForm.reset();
        this.currentItem = new Parkingcar();

        if (item)
            this.currentItem = { ...item };

        this.modal.open(this.addEditModalContent);

        if (this.electronSrv.isElectronApp()) {
            this.deviceSrv.readCard().then(rec => {
                this.currentItem.cardNo = rec;
            });
        }

    }

    showCharge(item: Parkingcar) {

        this.chargeForm.reset();
        if (!this.ShowModalCharge)
            this.currentItem = new Parkingcar();

        this.ShowModalCharge = false;
        this.modal.open(this.chargeModalContent);

    }

    onSubmit() {

        if (this.currentItem.pelaksection1 == null) {
            return;
        }

        this.currentItem.parkingID = this.parkingId;
        this._service.save(this.currentItem).subscribe(rec => {
            this.currentItem.carID = rec.carId,
                this.currentItem.hasCharge = rec.hasCharge;

            if (this.currentItem.carID != 0 && this.currentItem.hasCharge) {
                this.modal.dismissAll();
                this.load();
            }

            else if (this.currentItem.carID != 0 && !this.currentItem.hasCharge) {
                this.ShowModalCharge = true;
                this.modal.dismissAll();
                this.showCharge(this.currentItem);

            }

            else
                this.ShowModalCharge = false;

        });

    }



    addcharge() {



        this._service.savecharge(this.currentItem).subscribe(rec => {

            this.modal.dismissAll();

        }, error => {

            if (error.status == 400)

                this.currentItem.carNotFount = true;
            else {
                this.modal.dismissAll();
            }

        });
    }

    onChange(deviceValue) {

        this.load();
    }

    showExit(item: ListParkingcar) {

        this.parkingExitForm.reset();
        this.currentparkedcar = new ListParkingcar();

        if (item)
            this.currentparkedcar = { ...item };

        this.modal.open(this.parkingExitModalContent);

    }

    load() {
        this.currentItem = new Parkingcar();
        this.currentItem.parkingID = this.parkingId;
        this.currentItem.page = this.page;
        this._service.getAll(this.currentItem).subscribe(rec => {

            this.ParkingCarlist = rec.list;
            this.parkinglistCount = rec.count;

        });
    }

    exitCar() {
        this._service.exitCar(this.currentparkedcar).subscribe(rec => {

            this.modal.dismissAll();
            this.load();

        });
    }

    onSearchChange(searchValue: string) {
        if (this.currentItem.pelaksection1 == null) {
            return;
        }
        this.currentItem.carID = null;
        this.currentItem.parkingID = this.parkingId;
        this._service.save(this.currentItem).subscribe(rec => {
            this.currentItem.carID = rec.carId,
                this.currentItem.hasCharge = rec.hasCharge;

            if (this.currentItem.carID != 0 && this.currentItem.hasCharge)
                this.modal.dismissAll();
            else if (this.currentItem.carID != 0 && !this.currentItem.hasCharge) {
                this.ShowModalCharge = true;
                this.modal.dismissAll();
                this.showCharge(this.currentItem);

            }

            else
                this.ShowModalCharge = false;

        });

    }




}
