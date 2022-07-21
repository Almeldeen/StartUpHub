import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account, InternProfile, InternUpdateProfile } from 'app/core/backend/models';
import { InternService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';
import { InternLocalService } from '../intern.component';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CVComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  saving = false;
  profile: InternProfile;
  acc: Account;



  /**
   * Constructor
   */
  constructor(
    public internLocalService: InternLocalService,
    private internService: InternService,
    private accService: AccountService,
    private toastr: ToastrService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------


  ngOnInit(): void {
    this.accService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    })
   
    this.internLocalService.$internProfile.subscribe({
      next: (profile) => {

        this.profile = profile;
        if (profile.cv) {
          this.fileURL= ('https://' + profile.cv);
        }
      }
    });
  }


  // files - CV
  file: File | null = null;
  fileURL : string | ArrayBuffer;

  onSelect(event) {
    this.file = event.addedFiles[0];
    var reader = new FileReader();
    // listen for 'load' events on the FileReader
    reader.onload = (e) => {
      this.fileURL = (e.target.result);
    };

    if (this.file) {
      reader.readAsArrayBuffer(this.file);
    }
  }

  onRemove() {
    this.file = null;
    this.fileURL = '';;
  }



  saveInternProfile() {
      const profile: InternUpdateProfile = {
        skills: this.profile?.skills && this.profile?.skills.length? this.profile?.skills?.map(s => s.skillsId) : null ,
        fieldId: this.profile?.field.fieldId || null ,
        jobTitle: this.profile?.jobTitle,
        about:  this.profile?.about || '',
        address:  this.profile?.address || '',
        birthdate:  this.profile?.birthdate || null,
        fullName:  this.profile?.fullName || '',
        mobile:  this.profile?.mobile || null,
        availableToWork:  this.profile?.availableToWork || null,
        education:  this.profile?.education? this.profile?.education: '',
        cv: this.file,
      }
      this.saving = true;

      this.internService.updateInternProfile({ body: { ...profile } }).subscribe({
        next: () => {
          this.saving = false;
          this.toastr.success('', 'Profile has been updated');
          this.internLocalService.getProfile(this.acc.id);
        },
        error: (err) => {
          this.saving = false;
          this.toastr.error(err?.error || '', 'Error has been occurred!')
        },
      })
  }

}
