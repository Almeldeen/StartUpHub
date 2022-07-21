import { Component, OnInit } from '@angular/core';
import { dateFormat } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account, Follower, InternProfile, TimelineArticle } from 'app/core/backend/models';
import { ArticlesService, GeneralService } from 'app/core/backend/services';
import { InternLocalService } from '../intern.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentDate = new Date();
  dateFormat = dateFormat;
  followers: Follower[] | null = null;
  profile: InternProfile | null = null;
  gettingArticles = false;
  articles: {
    data?: TimelineArticle[];
    totalPages?: number;
    currentPage?: number;
  };
  $page = 1;
  $pageSize = 5;
  $total = 1;
  acc: Account | null = null;
  constructor(
    private internLocalService: InternLocalService,
    private generalService: GeneralService,
    private articlesService: ArticlesService,
    private accService: AccountService,
  ) { }

  ngOnInit(): void {
    this.accService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    })
    this.internLocalService.$internProfile.subscribe((res) => {
      this.profile = res;
    });
    this.getArticles(this.$page);
    this.getFollowers();
  }

  onScroll(){
    this.$page++;
    this.getArticles(this.$page);
  }

  getArticles(page: number){
    this.internLocalService.$public.subscribe(isPublic => {
      if(isPublic){
        if(page > this.$total || !this.$total){
          return;
        }
        this.$page = page;
        this.gettingArticles = true;
        if(page === 1){
          window.scroll(0,0);
        }
        this.internLocalService.$publicUserId.subscribe(usrId => {
          this.articlesService.getUserArticles({
            userId: usrId,
            page: page,
            pageSize: this.$pageSize
          }).subscribe({
            next: (articles) => {
              if(!this.articles || this.$page === 1){
                this.articles = {
                  data: []
                };
              }
              this.articles.currentPage = articles.currentPage;
              this.articles.totalPages = articles.totalPages;
              if(articles.data){
                this.articles.data.push(...articles.data);
              }
              this.$total = articles?.totalPages;
              this.gettingArticles = false;
            },
            error: () => {
              this.gettingArticles = false;
              this.articles = {
                currentPage: 1,
                data: []
              }
            }
          });
        });
        
      }else{
        if(page > this.$total || !this.$total){
          return;
        }
        this.$page = page;
        this.gettingArticles = true;
        if(page === 1){
          window.scroll(0,0);
        }
        this.articlesService.getUserArticles({
          page: page,
          pageSize: this.$pageSize
        }).subscribe({
          next: (articles) => {
            if(!this.articles || this.$page === 1){
              this.articles = {
                data: []
              };
            }
            this.articles.currentPage = articles.currentPage;
            this.articles.totalPages = articles.totalPages;
            if(articles.data){
              this.articles.data.push(...articles.data);
            }
            this.$total = articles?.totalPages;
            this.gettingArticles = false;
          },
          error: () => {
            this.gettingArticles = false;
            this.articles = {
              currentPage: 1,
              data: []
            }
          }
        });
      }
    })

  }

  getFollowers() {
    this.generalService.getFollowers({
      pagenum: 1,
      pagesize: 12
    }).subscribe({
      next: (followers) => {
        this.followers = followers?.data || [];
      },
      error: () => {
        this.followers = [];
      }
    })
  }


 

}
