import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchJobsComponent } from './search-jobs.component';

const routes: Routes = [
  {
    path: '',
    component: SearchJobsComponent
  }
]

@NgModule({
  declarations: [
    SearchJobsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InfiniteScrollModule
  ]
})
export class SearchJobsModule { }
