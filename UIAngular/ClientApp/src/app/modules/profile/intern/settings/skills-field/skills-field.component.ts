import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AccountService } from 'app/core/auth/account.service';
import { Account, Field, InternProfile, InternUpdateProfile, Skill } from 'app/core/backend/models';
import { FieldsService, InternService, SkillsService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';
import { InternLocalService } from '../../../intern/intern.component';
@Component({
  selector: 'app-skills-and-field',
  templateUrl: './skills-field.component.html',
  styleUrls: ['./skills-field.component.scss']
})
export class SkillsAndFieldComponent implements OnInit {

  selectedSkills: Skill[] = []
  allSkills: Skill[] = []
  filteredSkills: Skill[] = []
  separatorKeysCodes: number[] = [ENTER, COMMA];
  saving = false;
  filteredOptions: Field[];
  fields: Field[] = [
    
  ];
  profile: InternProfile;
  acc: Account;

  profileForm = new FormGroup({
    availableToWork: new FormControl(null),
    field: new FormControl(null),
    jobTitle: new FormControl(null),
    skills: new FormControl([]),
  })
  /**
   * Constructor
   */
  constructor(
    private internLocalService: InternLocalService,
    private internService: InternService,
    private fieldsService: FieldsService,
    private skillsService: SkillsService,
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
  ngOnInit(): void {
    this.accService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    })
    this.profileForm.disable();
    this.fieldsService.getFields().subscribe((fields) => {
      this.fields = fields || [];
      this.filteredOptions = this.fields;
    });
    
    this.internLocalService.$internProfile.subscribe({
      next: (profile) => {
        this.profileForm.enable();
        this.profile = profile;
       
        this.setForm(profile);
      }
    })
  }

  selectField(e:MatAutocompleteSelectedEvent){
    this.selectedSkills = [];
    this.getSkills((e.option.value as Field).fieldId);
  }

  gettingSkills = false;
  
  getSkills(fieldId: any){
    
    this.gettingSkills = true;
    this.profileForm.controls.skills.disable();
    this.skillsService.getAllSkills({
      page: 1,
      pageSize: 1000,
      fieldId: fieldId
    }).subscribe((data) => {
      this.gettingSkills = false;
      this.profileForm.controls.skills.enable();
      this.allSkills = data?.data || [];
      this.filteredSkills = this.allSkills;
    }, () => {
      this.gettingSkills = false;
      this.profileForm.controls.skills.enable();
    });
}
  setForm(profile: InternProfile) {
    if(profile){

      this.profileForm.patchValue({
        availableToWork: profile.availableToWork,
        field: profile.field,
        jobTitle: profile.jobTitle,
        skills: profile.skills,
      });

      this.selectedSkills = profile.skills || [];
    }
  }




  saveInternProfile() {
      const profile: InternUpdateProfile = {
        about: this.profile.about,
        address: this.profile.address,
        availableToWork: this.profileForm.value.availableToWork || false,
        fieldId: this.profileForm.value.field?.fieldId || null,
        jobTitle: this.profileForm.value.jobTitle,
        skills: this.profileForm.value.skills && this.profileForm.value.skills.length ? this.profileForm.value.skills.map(s => s.skillsId) : '',
        birthdate: this.profile.birthdate,
        education: this.profile.education ?  this.profile.education : '',
        fullName: this.acc.fullName, 
        mobile: this.acc.mobile,
      }
      this.saving = true;

      this.internService.updateInternProfile({ body: { ...profile } }).subscribe({
        next: () => {
          this.saving = false;
          this.toastr.success('', 'Profile has been updated');
          this.internLocalService.getProfile(this.acc.id)
        },
        error: (err) => {
          this.saving = false;
          this.toastr.error(err?.error || '', 'Error has been occurred!')
        },
      })
  }

  // ---- skills --- //


  selectSkill(skill: MatAutocompleteSelectedEvent){
    if(!this.selectedSkills.find(e => e.skillsId === skill.option.value?.skillsId)){
      this.selectedSkills.push(skill.option.value);
      this.profileForm.get('skills').setValue(this.selectedSkills);
    }
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
      this.profileForm.get('skills').setValue(this.selectedSkills.map(e => e.skillsId));
    }
  }
}
