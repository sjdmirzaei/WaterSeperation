import { Component, EventEmitter, Injectable, Output, Input, ViewChild, TemplateRef } from '@angular/core';
import { CalendarDayViewComponent, CalendarUtils } from 'angular-calendar';
import { DayView, DayViewEvent, GetDayViewArgs, CalendarEvent } from 'calendar-utils';
import { CalendarEventTimesChangedEvent } from '../../../../node_modules/angular-calendar/modules/common/calendar-event-times-changed-event.interface.d';

const EVENT_WIDTH = 100;


@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
    
    getDayView(args: GetDayViewArgs): DayView {

        const view: DayView = {
            ...super.getDayView(args)            
        };

        view.events = view.events.map(dayViewEvent => {
          
            dayViewEvent.left = (dayViewEvent.event.meta.index - 1) * EVENT_WIDTH;
            return dayViewEvent;

        });

        view.width = EVENT_WIDTH;
        return view;
    }

    
}

@Component({
    selector: 'mwl-day-view-scheduler',
    templateUrl: 'day-view-scheduler.component.html',
    styleUrls: ['./day-view-scheduler.component.css'],

    providers: [
        {
            provide: CalendarUtils,
            useClass: DayViewSchedulerCalendarUtils
        }
    ]
})

export class DayViewSchedulerComponent extends CalendarDayViewComponent {
    
    @Input()    
    streets: Array<any>;

    @Input()
    eventClicked: EventEmitter<{
        event: CalendarEvent<any>;
    }>;


    @ViewChild('customCellTemplate')
    eventTemplate: TemplateRef<any>;      

    @Input()
    eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent<any>>;
    
    eventDropped(event : any , zone : any): void {

        console.log(zone);

        event.meta = {
            index : zone.id
        }
        this.events.push({...event});
        this.refresh.next();
     }
   
    getjson(obj){
        console.log(obj);
        return JSON.stringify(obj);
    }
}
