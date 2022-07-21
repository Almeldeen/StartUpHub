import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelineJob } from 'app/core/backend/models';
import { JobsService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  gettingJob = false;
  job: TimelineJob | null = null;
  constructor(
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private jobsService: JobsService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.gettingJob = true;

        this.jobsService.getJobDetails({
          jopId: params['id']
        }).subscribe({
          next: (data) => {
            this.gettingJob = false;
            this.job = data;
          },
          error: (err) => {
            this.gettingJob = false;
            this.toastr.error("Error has been occurred!", err?.error);
          }
        })
      }
    })
  }

}
