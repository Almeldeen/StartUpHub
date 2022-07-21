import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPeopleComponent } from './search-people.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPeopleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPeopleRoutingModule { }
