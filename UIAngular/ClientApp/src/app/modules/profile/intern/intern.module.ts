import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { SharedModule } from 'app/shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { QuillModule } from 'ngx-quill';
import { CVComponent } from './cv/cv.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { HomeComponent } from './home/home.component';
import { InternRoutingModule } from './intern-routing.module';
import { InternComponent } from './intern.component';

@NgModule({
  declarations: [
    HomeComponent,
    InternComponent,
    CVComponent,
    FollowersComponent,
    FollowingComponent,

  ],
  imports: [
    CommonModule,
    InternRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    NgxDropzoneModule,
    MatTooltipModule,
    InfiniteScrollModule,
    PdfViewerModule,
    MatFormFieldModule,
    MatTooltipModule,
    QuillModule,
    PhotoGalleryModule.forRoot({
      defaultOptions: {
        arrowEl: true,
        arrowKeys: true,
        fullscreenEl: false,
        zoomEl: false,
        indexIndicatorSep: '-',
 }
    }),
    SharedModule
  ],
  exports: [
    InternComponent,

  ]
})
export class InternModule { }
