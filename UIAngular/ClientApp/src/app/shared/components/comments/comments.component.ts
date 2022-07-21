import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { dateFormat } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account, Comment, TimelineArticle } from 'app/core/backend/models';
import { ArticlesService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmationService } from 'theme/services/confirmation';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  dateFormat = dateFormat;
  @ViewChild('commentsWrapper') commentsWrapper: ElementRef;
  @ViewChild('commentField') commentField: ElementRef;
  @Input() showComments = true;
  @Output() deleteCommentEmitter = new EventEmitter<any>()
  @Output() addCommentEmitter = new EventEmitter<any>()

  @Input() postId: TimelineArticle['id'];
  comments: Comment[] | null = null;
  commentMode: 'ADD' | 'UPDATE' = 'ADD';
  commentToUpdate: Comment | null = null;
  acc: Account | null = null;
  sending = false;
  gettingComments = false;


  $total =1;
  $page = 1;
  $pageSize = 5;
  constructor(
    private articlesService: ArticlesService,
    private accService: AccountService,
    private toastr: ToastrService,
    private confirmService: FuseConfirmationService,
  ) { }

  ngOnInit(): void {
    this.accService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    });
    this.getComments(1);
  }


  getComments(page: number) {
    if(page > this.$total || !this.$total){
      return;
    }
    this.$page = page;
    this.gettingComments = true;
    this.articlesService.getComments({
      PostId: this.postId,
      page: page,
      pageSize: this.$pageSize
    }).subscribe({
      next: (data) => {
        if(!this.comments){
          this.comments = [];
        }
        if(data.data){
          this.comments.push(...data.data);
        }
        this.gettingComments = false;
        this.$total = data.totalPages;
        if (this.$page === 1) {
          this.commentsWrapper.nativeElement.scrollTop = 0;
        }
      },
      error: () => {
        this.gettingComments = false;
        this.comments = [];
      }
    })
  }

  onScroll(){
    this.$page++;
    this.getComments(this.$page);
  }
  addComment(content: string) {
    this.sending = true;
    this.articlesService.addComment({
      Cotent: content,
      PostId: this.postId,
    }).subscribe({
      next: (data) => {
        this.sending = false;
        data.rating = 0;
        this.comments.unshift(data);
        this.addCommentEmitter.emit(true);
        this.commentsWrapper.nativeElement.scrollTop = 0;
        this.toastr.success('', 'Your comment has been published');
        this.cancelUpdate();
      },
      error: (err) => {

        this.sending = false;
        this.toastr.error(err?.error || '', 'Error has been occurred!')
      }
    })
  }

  deleteComment(comment: Comment) {
    this.confirmService.open({
      icon: {
        name: 'mat_outline:delete',
        color: 'warn',
        show: true
      },
      title: 'Delete comment',
      message: 'Sure to delete your comment?',
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
        this.articlesService.deleteComment({
          commentId: comment.id,
          PostId: this.postId
        }).subscribe({
          next: () => {
            this.comments.splice(this.comments.findIndex(e => e.id === comment.id), 1);
            this.deleteCommentEmitter.emit(true);
            this.toastr.success('', 'Your comment has been deleted')
          },
          error: (err) => {

            this.toastr.error(err?.error || '', 'Error has been occurred!')
          }
        })
      }
    })

  }

  updateComment(newContent: string) {
    this.sending = true;
    
    this.articlesService.updateComment({
      Cotent: newContent,
      PostId: this.postId,
      commentId: this.commentToUpdate.id
    }).subscribe({
      next: () => {
        this.sending = false;
        this.commentToUpdate.content = newContent;
        this.comments[this.comments.findIndex(e => e.id === this.commentToUpdate.id)] = this.commentToUpdate;
        this.toastr.success('', 'Your comment has been updated');
        this.cancelUpdate();
      },
      error: (err) => {
        this.sending = false;
        this.toastr.error(err?.error || '', 'Error has been occurred!')
      }
    })
  }


  editMode(comment: Comment) {
    this.commentToUpdate = comment;
    this.commentMode = 'UPDATE';
    this.commentField.nativeElement.value = comment.content;
    this.commentField.nativeElement.parentElement.parentElement.parentElement.scrollIntoView({
      block: 'start',
    });
    window.scrollBy({
      top: -120,
      behavior: 'smooth'
    })

  }

  rateComment(comment: Comment, rateType: 'UP' | 'DOWN') {
    if (rateType === comment.ratedByUser) {
      return;
    }
    this.articlesService.rateComment({
      commentId: comment.id,
      type: rateType,
      PostId: this.postId
    }).subscribe({
      next: () => {
        if (rateType === 'UP') {
          comment.rating++;
          comment.ratedByUser = 'UP';
        } else {
          comment.ratedByUser = 'DOWN';
          comment.rating--;
        }
      },
      error: (err) => {
        this.toastr.error(err?.error || '', 'Error has been occurred!')
      }
    })

  }

  cancelUpdate(){
    this.commentMode = 'ADD';
    this.commentToUpdate = null;
    this.commentField.nativeElement.value = '';

  }
}
