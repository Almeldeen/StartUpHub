import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { quillModules } from 'app/app-constants';
import { Field, Skill } from 'app/core/backend/models';
import { AddJob } from 'app/core/backend/models/add-job';
import { CompanyService, FieldsService, SkillsService } from 'app/core/backend/services';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { ToastrService } from 'ngx-toastr';


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
    selector: 'app-add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.scss'],
    providers: [
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class AddJobComponent implements OnInit {
    horizontalStepperForm: FormGroup;
    selectedSkills: Skill[] = []
    allSkills: Skill[] = []
    filteredSkills: Skill[] = []
    separatorKeysCodes: number[] = [ENTER, COMMA];
    saving = false;
    selectedField: Field;
    filteredOptions: Field[];
    fields: Field[] = [

    ];
    quillModules = quillModules;
    constructor(
        private _formBuilder: FormBuilder,
        private fieldsService: FieldsService,
        private skillsService: SkillsService,
        private router: Router,
        private companyService: CompanyService,
        private toastr: ToastrService) { }

    ngOnInit(): void {
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                title: [null, Validators.required],
                field: [null, Validators.required],
                skills: [null, Validators.required],
                startDate: [null, Validators.required],
                endDate: [null, Validators.required],
                description: [null, Validators.required],
            }),

            step2: this._formBuilder.group({
                questions: this._formBuilder.array([]),
            }),
        });
        this.getFields();
    }
    get questions() {
        return (this.horizontalStepperForm.get('step2') as FormGroup).controls['questions'] as FormArray;
    }

    addQuestion() {
        const question = this._formBuilder.group({
            question: ['', Validators.required],
        });
        this.questions.push(question);
    }

    deleteQuestion(quesIndex: number) {
        this.questions.removeAt(quesIndex);
    }

    myFilter = (d: Date | null): boolean => {
        const date = (d || new Date());
        return date.valueOf() > new Date().valueOf();
    };

    birthdateChange(e: any) {
    }

    filter(e: any) {
        this.filteredOptions = this._filter(e.target.value)
    }
    private _filter(value: string): Field[] {
        const filterValue = value.toLowerCase();
        return this.fields.filter(option => option.fieldName.toLowerCase().includes(filterValue));
    }
    displayFn(field: Field): string {
        return field && field.fieldName ? field.fieldName : '';
    }


    // === save ====== 

    publishing = false;
    publishJob() {
        if (this.horizontalStepperForm.valid) {
            const ob: AddJob = {
                content: this.horizontalStepperForm.value?.step1?.description,
                endDate: (<Date>this.horizontalStepperForm.value?.step1?.endDate?._d)?.toISOString() || null,
                startDate: (<Date>this.horizontalStepperForm.value?.step1?.startDate?._d)?.toISOString() || null,
                fieldId: this.horizontalStepperForm.value?.step1?.field?.fieldId,
                skillls: this.horizontalStepperForm.value?.step1?.skills?.map(s => ({ skillsId: s })) || [],
                title: this.horizontalStepperForm.value?.step1?.title,
                questions: this.horizontalStepperForm.value?.step2?.questions?.map(q => ({ qContent: q?.question })),
            };
            this.publishing = true;
            this.companyService.addJob({
                body: ob
            }).subscribe({
                next: (data) => {
                    this.publishing = false;
                    this.toastr.success('', 'Internship has been published');
                    this.router.navigate(['/company', 'my-jobs'])
                },
                error: (err) => {
                    this.publishing = false;
                    this.toastr.error(err?.error || '', 'Error has been occurred!')
                },
            })

        }

    }


    // ====== fields ==========

    getFields() {
        this.fieldsService.getFields().subscribe((fields) => {
            this.fields = fields || [];
            this.filteredOptions = this.fields;
        });
    }

    selectField(e: MatAutocompleteSelectedEvent) {

        this.selectedField = (e.option.value as Field);
        this.selectedSkills = [];
        this.getSkills(this.selectedField.fieldId);
    }

    // ---- skills --- //

    gettingSkills = false;

    getSkills(fieldId: any) {

        this.skillsService.getAllSkills({
            page: 1,
            pageSize: 1000,
            fieldId: fieldId
        }).subscribe((data) => {
            this.allSkills = data?.data || [];
            this.filteredSkills = this.allSkills;
            this.gettingSkills = false;

        }, () => {
            this.gettingSkills = false;

        });
    }

    selectSkill(skill: MatAutocompleteSelectedEvent) {
        this.selectedSkills.push(skill.option.value);
        (this.horizontalStepperForm.get('step1') as FormGroup).controls.skills.setValue(this.selectedSkills.map(e => e.skillsId));
    }

    displayFnSkills(skill: Skill): string {
        return skill && skill.name ? skill.name : '';
    }

    filterSkills(e: any) {

        this.filteredSkills = this._filterSkills(e.target.value)
    }
    private _filterSkills(value: string): Skill[] {
        const filterValue = value.toLowerCase();
        return this.allSkills.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    remove(id: number): void {
        const index = this.selectedSkills.findIndex(e => e.skillsId === id);

        if (index >= 0) {
            this.selectedSkills.splice(index, 1);
            (this.horizontalStepperForm.get('step1') as FormGroup).controls.skills.setValue(this.selectedSkills.map(e => e.skillsId));
        }
    }


}
