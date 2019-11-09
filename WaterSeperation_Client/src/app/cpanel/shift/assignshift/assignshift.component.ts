import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { AssignShift } from '../../../../model/barrel';
import { addHours, startOfDay, addMinutes } from 'date-fns';
import { Street, Zone } from '../../../../model/barrel';
// import { stringify } from '@angular/core/src/render3/util';
import { Subject } from 'rxjs';
import { AssignShiftService } from '../../../../services/assignshift.service';
import { load } from '@angular/core/src/render3';
import { ActivatedRoute } from '@angular/router';
// import { viewDef } from '@angular/core/src/view';

@Component({
    selector: 'app-assignshift',
    templateUrl: './assignshift.component.html',
    styleUrls: ['./assignshift.component.css'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignshiftComponent implements OnInit {

    @ViewChild('assignModalContent')
    assignModalContent: TemplateRef<any>;

    assignForm: FormGroup;
    get f() { return this.assignForm.controls; }

    public currentItem: AssignShift;
    public areas: any[] = [];
    public shifts: any[] = [];
    public mainshifts: any[] = [];
    public users: any[] = [];
    public polices: any[] = [];
    public students: any[] = [];
    public areaId: number;
    public date: Date;
    private status: number;

    public streets: Array<any> = [

    ];

    public viewDate = new Date();

    externalEvents: CalendarEvent[] = [
        {
            title: 'Event 1',
            start: addHours(startOfDay(new Date()), 7),
            end: addHours(startOfDay(new Date()), 14),
            draggable: true
        },
        {
            title: 'Event 2',
            start: addHours(startOfDay(new Date()), 9),
            end: addHours(startOfDay(new Date()), 14),
            draggable: true
        }
    ];


    refresh: Subject<any> = new Subject();

    public events: CalendarEvent[] = [
    ];


    constructor(private modal: NgbModal, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private _service: AssignShiftService) {

    }

    ngOnInit() {

        this.status = this.activatedRoute.snapshot.data['status'];

        this.currentItem = new AssignShift();

        this.assignForm = this.formBuilder.group({
            parkbanId: [''],
            studentId: [''],
            policeId: ['']
        });


        this.date = this.viewDate;

        if (this.status == 1)
            this.load();
        else if (this.status == 2)
            this.loadnonmatgin();
    }


    load() {

        var _this = this;
        this._service.load().subscribe(rec => {

            this.areas = rec.areas;
            _this.mainshifts = rec.shifts;

            rec.shifts.forEach(function (value) {
                var item = value;
                item.start = addMinutes(addHours(startOfDay(_this.date), item.starthour), item.startminute);
                item.end = addMinutes(addHours(startOfDay(_this.date), item.endhour), item.endminute)
                _this.shifts.push(item);
            });

            this.users = rec.users;
            this.students = rec.students;
            this.polices = rec.polices;
        });
    }


    loadnonmatgin() {

        var _this = this;
        this._service.loadnonmatgin().subscribe(rec => {

            this.areas = rec.areas;
            _this.mainshifts = rec.shifts;

            rec.shifts.forEach(function (value) {
                var item = value;
                item.start = addMinutes(addHours(startOfDay(_this.date), item.starthour), item.startminute);
                item.end = addMinutes(addHours(startOfDay(_this.date), item.endhour), item.endminute)
                _this.shifts.push(item);
            });

            this.users = rec.users;
            this.students = rec.students;
            this.polices = rec.polices;
        });
    }


    selectarea() {
        this.streets = this.areas.filter(rec => rec.id == this.areaId).map(res =>
            res.streets
        )[0];

        this.refresh.next();
    }

    onEventClick(event: any): void {

        this.assignForm.reset();

        if (event)
            this.currentItem = event;

        this.modal.open(this.assignModalContent);
    }

    oneventTimesChanged({
        event,
        newStart,
        newEnd
    }: CalendarEventTimesChangedEvent): void {

        event.start = newStart;
        event.end = newEnd;
        this.refresh.next();
    }


    onSubmit() {

        if (this.assignForm.invalid) {
            return;
        }

        this.modal.dismissAll();
    }

}
