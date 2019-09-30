import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { BuilderComponent } from './builder/builder.component';
import { QuickviewComponent } from './quickview/quickview.component';
import { MorphsearchComponent } from './morphsearch/morphsearch.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DayViewSchedulerComponent } from './day-view-scheduler/day-view-scheduler.component';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      }),
    RouterModule        
  ],
  declarations: [TopBarComponent, SideBarComponent, FooterComponent, BuilderComponent, QuickviewComponent, MorphsearchComponent, LoaderComponent,DayViewSchedulerComponent , MapComponent],
  exports : [ TopBarComponent ,  SideBarComponent ,  FooterComponent, BuilderComponent, QuickviewComponent, MorphsearchComponent, LoaderComponent,DayViewSchedulerComponent , MapComponent]
})
export class BlocksModule { }
