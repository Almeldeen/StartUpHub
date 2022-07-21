import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { JobDetailsComponent } from './job-details.component';


const routes: Routes = [
  {
    path: '',
    component: JobDetailsComponent
  }
]


@NgModule({
  declarations: [
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class JobDetailsModule { }
