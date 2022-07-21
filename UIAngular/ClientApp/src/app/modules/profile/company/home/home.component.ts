import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account, CompanyProfile, CompanySimpleStats, Follower, Job } from 'app/core/backend/models';
import { CompanyService, GeneralService, TimelineService } from 'app/core/backend/services';
import { CompanyLocalService } from '../company.component';

export interface PeriodicElement {
  internships: string,
  requests: number,
  pindingJob: number,
  openTickets: number,
  action: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    internships: "title",
    requests: 10,
    pindingJob: 10,
    openTickets: 10,
    action: ''
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['internships', 'requests', 'pindingJob', 'openTickets', 'action'];
  dataSource = ELEMENT_DATA;
  companyProfile: CompanyProfile;
  account: Account;
  followers: Follower[];
  following: Follower[];
  jobs: Job[] = [];
  stats: CompanySimpleStats;
  $page = 1;
  $pageSize = 5;
  $total = 1;
  gettingJobs = false;


  constructor(
    private companyLocalService: CompanyLocalService,
    private companyService: CompanyService,
    private userService: AccountService,
    private timelineService: TimelineService,
    private generalService: GeneralService

  ) { }

  ngOnInit(): void {
    this.getJobs(1);
    this.init();
    
  }

  init() {
    this.companyLocalService.$public.subscribe(isPublic => {
      if(!isPublic){
        this.getStats();
        this.generalService.getFollowers({
          pagenum:  1,
          pagesize: 10
        }).subscribe({
          next: (res) => {
            this.followers = res?.data || [];
          }
        })
        this.generalService.getFollowing({
          pagenum: 1,
          pagesize: 10
        }).subscribe({
          next: (res) => {
            this.following = res?.data || [];
          }
        })

      }
    })
    this.companyLocalService.$companyProfile.subscribe({
      next: (res) => {
        this.companyProfile = res;

      }
    });
    this.userService.getAuthenticationState().subscribe(usr => {
      this.account = usr;
    });
   
  }


  getStats() {
    this.timelineService.companySimpleStats().subscribe(stats => {
      this.stats = stats;
    });
  }

  onScroll(){
    this.$page++;
    this.getJobs(this.$page);
  }

  getJobs(page: number){
    this.companyLocalService.$public.subscribe(isPublic => {
      if(isPublic){
        if(page > this.$total || !this.$total){
          return;
        }
        this.$page = page;
        this.gettingJobs = true;
        if(page === 1){
          window.scroll(0,0);
        }
        this.companyLocalService.$publicUserId.subscribe(usrId => {
          this.companyService.getJobs({
            companyId: usrId,
            page: page,
            pageSize: this.$pageSize
          }).subscribe({
            next: (data) => {
              if(!this.jobs || this.$page === 1){
                this.jobs = []
              }
              this.$total = data.totalPages;
              if(data.data){
                this.jobs.push(...data.data);
              }
              this.$total = data?.totalPages;
              this.gettingJobs = false;
            },
            error: () => {
              this.gettingJobs = false;
              this.jobs = []
            }
          });
        });
        
      }else{
        if(page > this.$total || !this.$total){
          return;
        }
        this.$page = page;
        this.gettingJobs = true;
        if(page === 1){
          window.scroll(0,0);
        }
        this.companyService.getJobs({
          page: page,
          pageSize: this.$pageSize,
          companyId: null
        }).subscribe({
          next: (articles) => {
            if(!this.jobs || this.$page === 1){
              this.jobs = []
            }
            this.$total = articles.totalPages;
            if(articles.data){
              this.jobs.push(...articles.data);
            }
            this.$total = articles?.totalPages;
            this.gettingJobs = false;
          },
          error: () => {
            this.gettingJobs = false;
            this.jobs = [];
          }
        });
      }
    })

  }
}
