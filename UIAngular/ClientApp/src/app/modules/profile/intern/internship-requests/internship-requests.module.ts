import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternshipRequestsRoutingModule } from './internship-requests-routing.module';
import { InternshipRequestsComponent } from './internship-requests.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    InternshipRequestsComponent
  ],
  imports: [
    CommonModule,
    InternshipRequestsRoutingModule,
    SharedModule
  ]
})
export class InternshipRequestsModule { }
