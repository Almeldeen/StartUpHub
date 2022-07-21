import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MyJobsComponent } from './my-jobs.component';

const routes: Routes = [
  {
    path: '',
    component: MyJobsComponent
  },
  {
    path: ':id',
    component: JobDetailsComponent
  },
]

@NgModule({
  declarations: [
    MyJobsComponent,
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MyJobsModule { }
