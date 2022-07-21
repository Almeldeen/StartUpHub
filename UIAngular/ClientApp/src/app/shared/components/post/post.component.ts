import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { dateFormat } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { TimelineArticle } from 'app/core/backend/models';
import { ArticlesService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmationService } from 'theme/services/confirmation';
import { CreateArticleDialogComponent } from '../create-article-dialog/create-article-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() showViewBtn = true;
  @Input() showComments = true;
  dateFormat = dateFormat;
  @Input() article: TimelineArticle | null;
  constructor(
    private articlesService: ArticlesService,
    private accService: AccountService,
    private toastr: ToastrService,
    private _matDialog: MatDialog,
    private confirmService: FuseConfirmationService,
  ) { }

  ngOnInit(): void {
  }

  deleteArticle(article: TimelineArticle) {
    this.confirmService.open({
      icon: {
        name: 'mat_outline:delete',
        color: 'warn',
        show: true
      },
      title: 'Delete article',
      message: 'Sure to delete your article?',
      dismissible: true,
      actions: {
        confirm: {
          color: 'warn',
          label: 'Sure, delete it',
          show: true
        },
        cancel: {
          label: 'Cancel',
          show: true
        }
      }
    }).afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.articlesService.deleteArticle({
          id: article.id
        }).subscribe({
          next: () => {
            this.article = null;
            this.toastr.success('', 'Your article has been deleted')
          },
          error: (err) => {

            this.toastr.error(err?.error || '', 'Error has been occurred!')
          }
        })
      }
    })

  }

  updateArticle(article: TimelineArticle){
    const dialogRef = this._matDialog.open(CreateArticleDialogComponent, {
      width: window.innerWidth < 500 ?  '100%' : '700px',
      maxWidth: window.innerWidth < 500 ?  '100%' : '700px',
      height: 'auto',
      closeOnNavigation:true,
      data: {
        article
      },
      autoFocus: false,
      restoreFocus: true
  });

  dialogRef.afterClosed().subscribe({
    next: (data: TimelineArticle) =>{
      this.article.content = data.content;
      this.article.images = data.images;
      this.article.fieldId = data.fieldId;
      this.article.fieldName = data.fieldName;
    },
    error: (err) => {
      console.error(err);
    }
  });
  }


  likeArticle(article: TimelineArticle){
    article.likedByUser = true;
    article.likesCount++;
    this.articlesService.likeArticle({PostId: article.id}).subscribe({
      error: () => {
        article.likedByUser = false;
        article.likesCount--;
      }
    })
  }

  dislikeArticle(article: TimelineArticle){
    article.likedByUser = false;
    article.likesCount--; 
    this.articlesService.dislikeArticle({
      PostId: article.id
    }).subscribe({
      error: () => {
        article.likesCount++; 
        article.likedByUser = true;
      }
    })
  }

  deleteComment(){
    this.article.commentsCount--;
  }
  addComment(){
    this.article.commentsCount++;
  }

  copyLink(postId: string){
    const text = location.host + '/post/' +postId
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    this.toastr.success('Link has been copied!')
  }

}
