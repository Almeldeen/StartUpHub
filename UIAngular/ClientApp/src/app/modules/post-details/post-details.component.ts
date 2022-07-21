import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelineArticle } from 'app/core/backend/models';
import { ArticlesService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  gettingArticle = false;
  article: TimelineArticle | null = null;
  constructor(
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private articleService: ArticlesService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['postId']) {
        this.gettingArticle = true;

        this.articleService.getArticleDetails({
          postId: params['postId']
        }).subscribe({
          next: (data) => {
            this.gettingArticle = false;
            this.article = data;
          },
          error: (err) => {
            this.gettingArticle = false;
            this.toastr.error("Error has been occurred!", err?.error);
          }
        })
      }
    })
  }



  deleteComment(){
    this.article.commentsCount--;
  }
  addComment(){
    this.article.commentsCount++;
  }


}
