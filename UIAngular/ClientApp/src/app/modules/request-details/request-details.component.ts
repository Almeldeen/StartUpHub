import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { dateFormatDate, JOBSTATES, ROLES } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/backend/models';
import { JobDetails } from 'app/core/backend/models/job-details';
import { CompanyService } from 'app/core/backend/services/company.service';
import { InternService } from 'app/core/backend/services/intern.service';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmationService } from 'theme/services/confirmation';






@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  acc: Account;
  dateFormat = dateFormatDate;
  jobStates = JOBSTATES;
  job: JobDetails;
  gettingJob = false;
  changingState = false
  roles = ROLES;

  constructor(
    private accService: AccountService,
    private internService: InternService,
    private companyService: CompanyService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private confirmService: FuseConfirmationService,
  ) { }

  ngOnInit(): void {
    this.accService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    });


    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.gettingJob = true;
        if (this.acc.role === ROLES.INTERN) {
          this.internService.getDetailedApplicationById({
            InternShipId: params['id'],
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


        } else {
          this.activeRoute.queryParams.subscribe(qParams => {
            this.companyService.getDetailedRequestForCompany({
              InternShipId: params['id'],
              internId: qParams['internId']
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

          })
        }
      }
    });


  }



  changeState(state: "PENDING" | "ACCEPTED" | "REJECTED" | "IN_PROGRESS") {
    this.changingState = true;
    this.companyService.changeRequestState({
      internId: this.job?.internId,
      internShipId: this.job?.internShipId,
      state: state,
    }).subscribe({
      next: (data) => {
        this.changingState = false;
        this.job.state = state;
        this.toastr.success("Request state has been changed!");
      },
      error: (err) => {
        this.changingState = false;
        this.toastr.error("Error has been occurred!", err?.error);
      }
    })
  }


  cancelRequest() {
    this.confirmService.open({
      icon: {
        name: 'mat_outline:delete',
        color: 'warn',
        show: true
      },
      title: 'Cancel request',
      message: 'Sure to cancel your request?',
      dismissible: true,
      actions: {
        confirm: {
          color: 'warn',
          label: 'Sure, cancel it',
          show: true
        },
        cancel: {
          label: 'Cancel',
          show: true
        }
      }
    }).afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.changingState = true;
        this.internService.cancelRequest({
          internShipId: this.job?.internShipId
        }).subscribe({
          next: (data) => {
            this.changingState = false;
            this.toastr.success("Request has been canceled!");
            this.router.navigate(['/job-details', this.job?.internShipId]);
          },
          error: (err) => {
            this.changingState = false;
            this.toastr.error("Error has been occurred!", err?.error);
          }
        });
      }
    });
  }








}
