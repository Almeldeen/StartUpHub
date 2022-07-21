import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestedInternshipsComponent } from './requested-internships.component';

const routes: Routes = [
  {
    path: '',
    component: RequestedInternshipsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestedInternshipsRoutingModule { }
