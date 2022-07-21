import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'requested-internships',
    pathMatch: 'full'
  },
  {
    path: 'requested-internships',
    loadChildren: () => import('../requested-internships/requested-internships.module').then(m => m.RequestedInternshipsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternRoutingModule { }
