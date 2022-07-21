import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ROLES } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account, CompanySimpleStats, InternSimpleStats, TimelineArticle, TimelineJob, User } from 'app/core/backend/models';
import { ArticlesService, GeneralService, TimelineService } from 'app/core/backend/services';
import { FollowersService } from 'app/core/backend/services/followers.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {


  ROLES = ROLES
  acc: Account;
  stats: InternSimpleStats | CompanySimpleStats | any;
  articles: Array<TimelineArticle | TimelineJob> = []
  $pageSize = 5;
  $page = 1;
  $total = 1;
  gettingArticles = false;
  peopleToFollow: User[]| null = null

  constructor(
    private userService: AccountService,
    private _matDialog: MatDialog,
    private articlesService: ArticlesService,
    private timelineService: TimelineService,
    private followersService: FollowersService,
    private generalService: GeneralService,
  ) { }


  ngOnInit(): void {
    this.userService.getAuthenticationState().subscribe(usr => {
      this.acc = usr;
      this.getStats();
    });
    this.getArticles(1);
    this.getPeopleToFollow();
  }

  getArticles(page: number) {

    if (page > this.$total || !this.$total) {
      return;
    }
    this.$page = page;
    this.gettingArticles = true;
    if (page === 1) {
      window.scroll(0, 0);
    }
    this.articlesService.getTimelineArticles({
      page: page,
      pageSize: this.$pageSize
    }).subscribe({
      next: (data) => {
        if (!this.articles || this.$page === 1) {
          this.articles = [];
        }

        if (data.posts) {
          this.articles.push(...data.posts);
        }
        if (data.jops) {
          this.articles.push(...data.jops);
        }
        this.$total = data?.totalPages || 1;
        this.gettingArticles = false;
      },
      error: () => {
        this.gettingArticles = false;
      }


    });

  }

  getStats() {
    if(this.acc.role === ROLES.INTERN){
      this.timelineService.internSimpleStats().subscribe(stats => {
        this.stats = stats;
      });
    }else{
      this.timelineService.companySimpleStats().subscribe(stats => {
        this.stats = stats;
      });
    }
  }
  onScroll() {
    this.$page++;
    this.getArticles(this.$page);
  }

  getPeopleToFollow() {
    this.followersService.getPeopleToFollow({
      pagenum: 1,
      pagesize: 10
    }).subscribe({
      next: (data) => {
        this.peopleToFollow = data.data || [];
      },
      error: () => {
        this.peopleToFollow =  [];
      }
    })
  }



  follow(event, user:User){
    event.target.disabled = true;
    this.generalService.sendFollow({
      userId: user.id
    }).subscribe(() => {
      if(event && event.target){
        event.target.disabled = false;
      }
      user.followedHim = true
    }, () => {
      if(event && event.target){
        event.target.disabled = false;
      }
    })

  }


}


