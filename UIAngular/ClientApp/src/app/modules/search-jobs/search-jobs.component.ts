import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ROLES } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account, Field, InternSimpleStats, TimelineJob, User } from 'app/core/backend/models';
import { FieldsService, GeneralService, InternService, TimelineService } from 'app/core/backend/services';
import { FollowersService } from 'app/core/backend/services/followers.service';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent implements OnInit {

 

  ROLES = ROLES
  acc: Account;
  stats: InternSimpleStats;
  jobs: TimelineJob[] = []
  $pageSize = 5;
  $page = 1;
  $total = 1;
  gettingJobs = false;
  peopleToFollow: User[] = [];
  // field
  selectedField: Field | null = null;
  filteredOptions: Field[];
  fields: Field[] = [

  ];

  constructor(private userService: AccountService,
    private _matDialog: MatDialog,
    private internService: InternService,
    private timelineService: TimelineService,
    private followersService: FollowersService,
    private generalService: GeneralService,
    private fieldsService: FieldsService,
  ) { }


  ngOnInit(): void {
    this.userService.getAuthenticationState().subscribe(usr => {
      this.acc = usr;
    });
    this.fieldsService.getFields().subscribe((fields) => {
      this.fields = fields;
      this.filteredOptions = this.fields;
    })
    this.getJobs(1);
    this.getStats();
    this.getPeopleToFollow();
  }



  filter(e: any) {
    this.filteredOptions = this._filter(e.target.value)
  }


  private _filter(value: string): Field[] {
    const filterValue = value.toLowerCase();
    return this.fields.filter(option => option.fieldName.toLowerCase().includes(filterValue));
  }

  selectField(e:MatAutocompleteSelectedEvent){
    this.selectedField = (e.option.value as Field);
    this.getJobs(1);
  }
  getJobs(page: number) {

    this.$page = page;
    if (page > this.$total || !this.$total) {
      return;
    }
    this.gettingJobs = true;
    if (page === 1) {
      window.scroll(0, 0);
    }
    this.internService.searchJobs({
      page: page,
      pageSize: this.$pageSize,
      fieldId: this.selectedField?.fieldId || null
    }).subscribe({
      next: (data) => {
        if (!this.jobs || this.$page === 1) {
          this.jobs = [];
        }
        if (data.data) {
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

  }

  getStats() {
    this.timelineService.internSimpleStats().subscribe(stats => {
      this.stats = stats;
    })
  }
  onScroll() {
    this.$page++;
    this.getJobs(this.$page);
  }


  displayFn(field: Field): string {
    return field && field.fieldName ? field.fieldName : 'All';
  }


  getPeopleToFollow() {
    this.followersService.getPeopleToFollow({
      pagenum: 1,
      pagesize: 10
    }).subscribe({
      next: (data) => {
        this.peopleToFollow = data.data || [];
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
