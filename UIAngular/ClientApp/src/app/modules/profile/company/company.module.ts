import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomeComponent,
    CompanyComponent,
    FollowersComponent,
    FollowingComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatIconModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatTooltipModule,
    SharedModule
  ],
  exports: [
    CompanyComponent
  ]
})
export class CompanyModule { }
