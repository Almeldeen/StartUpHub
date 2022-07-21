import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RequestedInternshipsRoutingModule } from './requested-internships-routing.module';
import { RequestedInternshipsComponent } from './requested-internships.component';



@NgModule({
  declarations: [
    RequestedInternshipsComponent
    ],
  imports: [
    CommonModule,
    RequestedInternshipsRoutingModule,
    SharedModule
  ]


})
export class RequestedInternshipsModule { }
