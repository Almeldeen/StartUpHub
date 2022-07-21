import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { QuillModule } from 'ngx-quill';
import { FuseConfirmationModule } from 'theme/services/confirmation';
import { ApplyToJobDialogComponent } from './components/apply-to-job-dialog/apply-to-job-dialog.component';
import { CommentsComponent } from './components/comments/comments.component';
import { UserCommentPipe } from './components/comments/user-comment.pipe';
import { CreateArticleDialogComponent } from './components/create-article-dialog/create-article-dialog.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { JobComponent } from './components/job/job.component';
import { UserJobPipe } from './components/job/user-job.pipe';
import { PostComponent } from './components/post/post.component';
import { UserPostPipe } from './components/post/user-post.pipe';
import { HasAnyAuthorityDirective } from './directives/has-any-authority.directive';
import { PublicProfileCompanyDirective } from './directives/public-profile-company.directive';
import { PublicProfileDirective } from './directives/public-profile.directive';
import { CompareDatesPipe } from './pipes/compare-dates.pipe';
import { SharedLibsModule } from './shared-libs.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        SharedLibsModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        FuseConfirmationModule,
        MatFormFieldModule,
        MatIconModule,
        QuillModule.forRoot(),
        NgxDropzoneModule,
        PhotoGalleryModule.forRoot({
            defaultOptions: {
                arrowEl: true,
                arrowKeys: true,
                fullscreenEl: false,
                zoomEl: false,
                indexIndicatorSep: '-',
            }
        }),
        MatInputModule,
        MatMenuModule,
        MatTooltipModule,
    ],

    declarations: [
        CreateArticleComponent,
        HasAnyAuthorityDirective,
        CreateArticleDialogComponent,
        CommentsComponent,
        UserCommentPipe,
        PostComponent,
        UserPostPipe,
        UserJobPipe,
        CompareDatesPipe,
        PublicProfileDirective,
        PublicProfileCompanyDirective,
        JobComponent,
        ApplyToJobDialogComponent
    ],
    exports: [
        SharedLibsModule,
        HasAnyAuthorityDirective,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CreateArticleComponent,
        HasAnyAuthorityDirective,
        CommentsComponent,
        PostComponent,
        CompareDatesPipe,
        PublicProfileDirective,
        JobComponent,
        ApplyToJobDialogComponent,
        PublicProfileCompanyDirective,




    ],
})
export class SharedModule {
}
