import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { AddJobComponent } from './add-job/add-job.component';
import { StartupRoutingModule } from './startup-routing.module';



@NgModule({
  declarations: [
    AddJobComponent
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    SharedModule,
    MatChipsModule,

    QuillModule.forRoot(),
    MatDatepickerModule,
    MatMomentDateModule,
  ]
})
export class StartupModule { }
