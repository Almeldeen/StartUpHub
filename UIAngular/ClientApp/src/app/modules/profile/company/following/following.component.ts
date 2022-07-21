import { Component, OnInit } from '@angular/core';
import { Follower } from 'app/core/backend/models';
import { GeneralService } from 'app/core/backend/services';
import { first } from 'rxjs/operators';
import { InternLocalService } from '../../intern/intern.component';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
    $page = 1;
    $pageSize = 10;
    $total = 1;
    gettingFollowers = false;
    followers: Follower[] = [];

  constructor(
    private generalService: GeneralService,
    private internService: InternLocalService,
  ) { }

  ngOnInit(): void {
    this.getFollowers(1)
  }

  getFollowers(page: number) {
    if(page > this.$total || !this.$total){
      return;
    }
    this.gettingFollowers = true;
    
    this.$page = page;
    this.generalService.getFollowing({
      pagenum: this.$page,
      pagesize: this.$pageSize
    }).subscribe({
      next: (followers) => {
        this.gettingFollowers = false;
        if(followers?.data){
          this.followers.push(...followers?.data);
        }        this.$total = followers?.totalPages
        
      },
      error: () => {
        this.gettingFollowers = false;
        this.followers = [];
      }
    })
  }


  follow(event, user: Follower) {
    event.target.disabled = true;
    this.internService.$publicUserId.pipe(first(),).subscribe(id => {
      this.generalService.sendFollow({
        userId: user.id
      }).subscribe(() => {
        if (event && event.target) {
          event.target.disabled = false;
        }
        user.followedHim = true;
        this.internService.getProfile(id);
      }, () => {
        if (event && event.target) {
          event.target.disabled = false;
        }
      })
    });
  }

  unFollow(event, user: Follower) {
    if (event && event.target) {
      event.target.disabled = true;
    }
    this.internService.$publicUserId.pipe(first(),).subscribe(id => {
      this.generalService.unfollow({
        userId: user.id
      }).subscribe(() => {
        if (event && event.target) {
          event.target.disabled = false;
        }
        user.followedHim = false;
        this.internService.getProfile(id);

      }, () => {
        if (event && event.target) {
          event.target.disabled = false;
        }
      })

    })
  }

  onScroll(){
    this.$page++;
    this.getFollowers(this.$page);
  }

}
