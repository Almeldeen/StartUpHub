import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline.component';


@NgModule({
  declarations: [
    TimelineComponent,
  ],
  imports: [
    CommonModule,
    TimelineRoutingModule,
    SharedModule,
    InfiniteScrollModule,
  ]
})
export class TimelineModule { }
