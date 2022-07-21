import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipRequestsComponent } from './internship-requests.component';

const routes: Routes = [
    {
        path: '',
        component: InternshipRequestsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipRequestsRoutingModule { }
