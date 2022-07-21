import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account, InternSimpleStats, User } from 'app/core/backend/models';
import { GeneralService, TimelineService } from 'app/core/backend/services';
import { FollowersService } from 'app/core/backend/services/followers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {
  ROLES = ROLES
  acc: Account;
  stats: InternSimpleStats;
  getting = false;
  $pageSize = 10;
  $page = 1;
  $total = 1;
  peopleToFollow: User[] = []

  constructor(
    private followersService: FollowersService,
    private router: Router,
    private toastr: ToastrService,
    private generalService: GeneralService,
    private timelineService: TimelineService,
    private userService: AccountService,
  ) { }

  ngOnInit(): void {
    this.userService.getAuthenticationState().subscribe(usr => {
      this.acc = usr;
    });
    this.getStats();
    this.getPeopleToFollow(1);
  }

  getStats() {
    this.timelineService.internSimpleStats().subscribe(stats => {
      this.stats = stats;
    })
  }

  onScroll() {
    this.$page++;
    this.getPeopleToFollow(this.$page);
  }

  getPeopleToFollow(page: number) {
    if (page > this.$total || !this.$total) {
      return;
    }
    this.$page = page;
    this.getting = true;
    this.followersService.getPeopleToFollow({
      pagenum: page,
      pagesize: this.$pageSize
    }).subscribe({
      next: (data) => {
        if(data.data){
          this.peopleToFollow.push(...data.data) ;
        }
        this.getting = false;
        this.$total = data.totalPages;
      },
      error: () => {
        
        this.getting = false;
      }
    })
  }



  follow(event, user: User) {
    event.target.disabled = true;
    this.generalService.sendFollow({
      userId: user.id
    }).subscribe(() => {
      if (event && event.target) {
        event.target.disabled = false;
      }
      user.followedHim = true
    }, () => {
      if (event && event.target) {
        event.target.disabled = false;
      }
    })

  }

  unFollow(event, user: User) {
    if (event && event.target) {
      event.target.disabled = true;
    }
    this.generalService.unfollow({
      userId: user.id
    }).subscribe(() => {
      if (event && event.target) {
        event.target.disabled = false;
      }
      user.followedHim = false;

    }, () => {
      if (event && event.target) {
        event.target.disabled = false;
      }
    })
  }

}
