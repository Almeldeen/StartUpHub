import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account, InternProfile, InternUpdateProfile } from 'app/core/backend/models';
import { InternService } from 'app/core/backend/services';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { InternLocalService } from '../../../intern/intern.component';


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
    profile: InternProfile;
    account: Account;
    saving = false;

   
    
    informationForm = new FormGroup({
        name: new FormControl(null),
        email: new FormControl(null),
        phone: new FormControl(null),
        address: new FormControl(null),
        birthdate: new FormControl(null),
        availableToWork: new FormControl(false),
        about: new FormControl(null),
        education : new FormGroup({
            school: new FormControl(null, Validators.required),
            degree: new FormControl(null, Validators.required),
            fieldOfStudy: new FormControl(null, Validators.required),
            startDate: new FormControl(null, Validators.required),
            endDate: new FormControl(null),
            studentActivities: new FormControl(null),
        })
    });




    /**
     * Constructor
     */
    constructor(
        private internLocalService: InternLocalService,
        private internService: InternService,
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
            this.internLocalService.$internProfile.subscribe({
                next: (data) => {
                    this.profile = data;
                    this.setForm();
                }
            });
        })

    }


    setForm() {
        this.informationForm.patchValue({
            name: this.account.fullName,
            email: this.account.email,
            phone: this.account.mobile,
            address: this.profile.address,
            birthdate: this.profile.birthdate ,
            about: this.profile.about,
            availableToWork: this.profile.availableToWork
            
        });
        if( this.profile?.education&& typeof this.profile?.education[0] === 'object'){
            this.informationForm.get('education').patchValue ({
                school:this.profile?.education[0]?.school || null,
                degree:this.profile?.education[0]?.degree || null,
                fieldOfStudy:this.profile?.education[0]?.fieldOfStudy || null,
                startDate:this.profile?.education[0]?.startDate || null,
                endDate:this.profile?.education[0]?.endDate || null,
                studentActivities:this.profile?.education[0]?.studentActivities || null,
                
            });
        }
    }

    saveUpdates() {
 
        const profile: InternUpdateProfile = {
            skills: this.profile?.skills && this.profile?.skills.length?this.profile?.skills.map(s => s.skillsId) : '' ,
            fieldId: this.profile?.field.fieldId ? this.profile?.field.fieldId : null,
            jobTitle: this.profile?.jobTitle || '',
            about: this.informationForm.value.about || '',
            address: this.informationForm.value.address || '',
            birthdate: this.informationForm.value.birthdate || null,
            fullName: this.informationForm.value.name || '',
            mobile: this.informationForm.value.phone || null,
            availableToWork: this.informationForm.value.availableToWork || null,
        };
 
        if(this.informationForm.get('education').valid){
            profile.education = [
                this.informationForm.value.education as  {
                school?: string;
                degree?: string;
                fieldOfStudy?: string;
                startDate?: string;
                endDate?: string;
                studentActivities?: string;
                educationId?: string;
            } ];
        }else{
            profile.education = ''
        }
        this.saving = true;

        this.internService.updateInternProfile({ body: { ...profile } }).subscribe({
            next: () => {
                this.saving = false;
                this.toastr.success('', 'Profile has been updated');
                this.internLocalService.getProfile(this.account.id);
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


