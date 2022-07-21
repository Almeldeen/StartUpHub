import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CVComponent } from './cv/cv.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { HomeComponent } from './home/home.component';
import { InternComponent } from './intern.component';


const routes: Routes = [

  {
    path: ':id',
    component: InternComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'cv',
        component: CVComponent
      },
      {
        path: 'followers',
        component: FollowersComponent
      },
      {
        path: 'following',
        component: FollowingComponent
      },
      {
        path: 'requests',
        loadChildren: () => import('./internship-requests/internship-requests.module').then(m => m.InternshipRequestsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternRoutingModule { }
