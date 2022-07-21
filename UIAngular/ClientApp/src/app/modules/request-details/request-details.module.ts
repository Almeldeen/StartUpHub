import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestDetailsRoutingModule } from './request-details-routing.module';
import { RequestDetailsComponent } from './request-details.component';
import { SharedModule } from 'app/shared/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    RequestDetailsComponent
  ],
  imports: [
    CommonModule,
    RequestDetailsRoutingModule,
    SharedModule,
    MatExpansionModule,


  ]
})
export class RequestDetailsModule { }
