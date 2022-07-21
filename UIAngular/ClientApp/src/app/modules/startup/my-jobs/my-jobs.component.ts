import { Component, OnInit } from '@angular/core';
import { ROLES } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account, CompanySimpleStats, InternSimpleStats, Job } from 'app/core/backend/models';
import { CompanyService, TimelineService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmationService } from 'theme/services/confirmation';





@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {

  ROLES = ROLES
  acc: Account;
  stats: InternSimpleStats | CompanySimpleStats | any;
  jobs: Job[] | null= null;
    displayedColumns: string[] = ['internship', 'Job_field', 'Applicant_count','actions'];
    dataSource: Job[] = [];
  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService,
    private userService: AccountService,
    private timelineService: TimelineService,
    private confirmService: FuseConfirmationService,
  ) { }

  ngOnInit(): void {
    this.userService.getAuthenticationState().subscribe(usr => {
      this.acc = usr;
      this.getStats();
    });
    this.companyService.getJobs({
      page: 1,
      pageSize: 200,
      companyId: null
    }).subscribe({
      next: (data) => {
        this.jobs = data?.data || [];
        this.dataSource = this.jobs;
      },
      error : () => {
        this.jobs =  [];
        this.dataSource = this.jobs;

      }
    })
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
  deleteJob(e: Job, event) {


    this.confirmService.open({
        icon: {
            name: 'mat_outline:delete',
            color: 'warn',
            show: true
        },
        title: 'Delete internship',
        message: 'Sure to delete this internship?',
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
            if (event && event.target) {
                event.target.disabled = true;
            }
            this.companyService.deleteJob({
                id: e.id
            }).subscribe(() => {
                this.toastr.success('You have deleted this internship');
                this.dataSource.splice(this.dataSource.findIndex(j => j.id === e.id), 1);
                if (event && event.target) {
                    event.target.disabled = false;
                }
            }, () => {

                this.toastr.error('An error has been occurred!');
                if (event && event.target) {
                    event.target.disabled = false;
                }
            })
        }
    })


}



}
