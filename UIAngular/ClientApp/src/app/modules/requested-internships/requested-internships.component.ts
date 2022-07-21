import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account, InternSimpleStats } from 'app/core/backend/models';
import { InternService, TimelineService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmationService } from 'theme/services/confirmation';






@Component({
    selector: 'app-requested-internships',
    templateUrl: './requested-internships.component.html',
    styleUrls: ['./requested-internships.component.scss'],
})
export class RequestedInternshipsComponent implements OnInit {
    displayedColumns: string[] = ['title', 'companyName', 'state', 'symbol'];
    dataSource = [];
    ROLES = ROLES;
    acc: Account;
    stats: InternSimpleStats;
    appliedJobs: {
        internShipId?: number;
        internId?: number;
        state?: "PENDING" | "ACCEPTED" | "REJECTED" | "IN_PROGRESS";
        title?: string;
        companyName?: string;
        userId?: string;
    }[];
    getting = false;




    constructor(
        private internService: InternService,
        private router: Router,
        private toastr: ToastrService,
        private confirmService: FuseConfirmationService,
        private timelineService: TimelineService,
        private userService: AccountService,

    ) {



    }


    goDetails(e: {
        internShipId?: number;
        internId?: number;
        state?: "PENDING" | "ACCEPTED" | "REJECTED" | "IN_PROGRESS";
        title?: string;
        companyName?: string;
        userId?: string;
    }) {
        this.router.navigate(['/job-request', e.internShipId])
    }
    cancelRequest(e: {
        internShipId?: number;
        internId?: number;
        state?: "PENDING" | "ACCEPTED" | "REJECTED" | "IN_PROGRESS";
        title?: string;
        companyName?: string;
        userId?: string;
    }, event) {


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
                if (event && event.target) {
                    event.target.disabled = true;
                }
                this.internService.cancelRequest({
                    internShipId: e.internShipId
                }).subscribe(() => {
                    this.toastr.success('You have cancelled this request');
                    this.dataSource.splice(this.dataSource.findIndex(j => j.internShipId === e.internShipId), 1);
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
    ngOnInit(): void {
        this.getting = true;
        this.userService.getAuthenticationState().subscribe(usr => {
            this.acc = usr;
        });
        this.getStats();

        this.internService.getAppliedJobs().subscribe(data => {
            this.getting = false;
            this.appliedJobs = data;
            this.dataSource = this.appliedJobs || [];
        }, () => {
            this.getting = false;
            this.toastr.error('An error has been occurred!');

        })

    }



    getStats() {
        this.timelineService.internSimpleStats().subscribe(stats => {
            this.stats = stats;
        })
    }

}
