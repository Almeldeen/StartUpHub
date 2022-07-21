import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PostDetailsComponent } from './post-details.component';


const routes: Routes = [
  {
    path: '',
    component: PostDetailsComponent
  }
]

@NgModule({
  declarations: [
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PostDetailsModule { }
