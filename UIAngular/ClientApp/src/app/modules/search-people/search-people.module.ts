import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchPeopleRoutingModule } from './search-people-routing.module';
import { SearchPeopleComponent } from './search-people.component';



@NgModule({
  declarations: [
    SearchPeopleComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    SearchPeopleRoutingModule,
    SharedModule
  ]
})
export class SearchPeopleModule { }
