import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JOBSTATES } from 'app/app-constants';
import { TimelineJob } from 'app/core/backend/models';
import { CompanyService, JobsService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'CV', 'state','actions'];
  jobStates = JOBSTATES;
    dataSource: {
      jopTitle?: string;
      fullName?: string;
      birthday?: string;
      college?: string;
      cv?: string;
      state?: string;
      profileImage?: string;
      availableToWork?: boolean;
      internId?: string;
  }[] | null = null;
  gettingJob = false;
  gettingApp = false;
  job: TimelineJob | null = null;
  constructor(
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private jobsService: JobsService,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.gettingJob = true;
        this.gettingApp = true;


        this.jobsService.getJobDetails({
          jopId: params['id']
        }).subscribe({
          next: (data) => {
            this.gettingJob = false;
            this.job = data;
            this.getApplicants();
          },
          error: (err) => {
            this.gettingJob = false;
            this.toastr.error("Error has been occurred!", err?.error);
          }
        })
      }
    });
    // ===
   
  }

  getApplicants(){
    this.companyService.getJobApplicants({
      page: 1,
      pageSize: 500,
      InternShipId: this.job.id
    }).subscribe({
      next: (data) => {
        this.gettingApp = false;
        
        this.dataSource = data.data;
      },
      error: (err) => {
        this.gettingApp = false;
        this.toastr.error("Error has been occurred!", err?.error);
        this.dataSource = []
      }
    })
  }

}
