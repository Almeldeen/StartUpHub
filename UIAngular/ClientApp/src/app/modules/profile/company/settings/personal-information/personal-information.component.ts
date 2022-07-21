import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account, CompanyProfile } from 'app/core/backend/models';
import { CompanyService } from 'app/core/backend/services';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CompanyLocalService } from '../../company.component';


const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



@Component({
    selector: 'app-personal-information',
    templateUrl: './personal-information.component.html',
    providers: [
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
    
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      ],
})
export class PersonalInformationComponent implements OnInit {
    profile: CompanyProfile;
    account: Account;
    saving = false;

   
    
    informationForm = new FormGroup({
        name: new FormControl(null),
        email: new FormControl(null),
        phone: new FormControl(null),
        address: new FormControl(null),
        jobTitle: new FormControl(null),
        about: new FormControl(null),
       
    });




    /**
     * Constructor
     */
    constructor(
        private companyLocalService: CompanyLocalService,
        private companyService: CompanyService,
        private accService: AccountService,
        private toastr: ToastrService
    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.accService.getAuthenticationState().subscribe(user => {
            this.account = user;
            this.companyLocalService.$companyProfile.subscribe({
                next: (data) => {
                    this.profile = data;
                    this.setForm();
                }
            });
        })

    }


    setForm() {
        this.informationForm.patchValue({
            jobTitle: this.profile.jobTitle,
            name: this.profile.fullName,
            email: this.account.email,
            phone: this.profile.mobile,
            address: this.profile.address,
            about: this.profile.about,
            
        });
        
    }

    saveUpdates() {

        const profile: any = {
            jobTitle: this.informationForm.value?.jobTitle || '',
            about: this.informationForm.value.about || '',
            address: this.informationForm.value.address || '',
            fullName: this.informationForm.value.name || '',
            mobile: this.informationForm.value.phone || '',
        };

        
        this.saving = true;
        this.companyService.updateCompanyProfile({ body: { ...profile } }).subscribe({
            next: () => {
                this.saving = false;
                this.toastr.success('', 'Profile has been updated');
                this.companyLocalService.getProfile(this.account.id);
            },
            error: (err) => {
                this.saving = false;
                this.toastr.error(err?.error || '', 'Error has been occurred!')
            },
        })

    }

    myFilter = (d: Date | null): boolean => {
        const date = (d || new Date());
        return date.valueOf() < new Date().valueOf();
      };

    birthDate 
    birthdateChange(e: any) {
        this.informationForm.controls.birthdate.setValue(new Date(e.value._d).toISOString());
    }


}


