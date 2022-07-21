import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'app/core/auth/account.service';
import { Account, TimelineJob } from 'app/core/backend/models';
import { InternService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apply-to-job-dialog',
  templateUrl: './apply-to-job-dialog.component.html',
  styleUrls: ['./apply-to-job-dialog.component.scss']
})
export class ApplyToJobDialogComponent implements OnInit {

  acc: Account;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private internService: InternService,
    @Inject(MAT_DIALOG_DATA) private _data: { job: TimelineJob },
    public _matDialogRef: MatDialogRef<ApplyToJobDialogComponent>
  ) { }
  job: TimelineJob

  saving = false;
  jobForm = new FormGroup({
    questions: new FormArray([]),
  });

  get questionControls(): FormArray{
    return this.jobForm.controls.questions as FormArray
  }


  setForm() {
    this.job = this._data.job;
    if(this._data?.job && this._data?.job.questions && this._data.job.questions.length){
     this.jobForm.disable();

    this._data.job.questions.forEach(q => {
      const fg = new FormGroup({
        question: new FormControl(q),
        answer: new FormControl(null, Validators.required)
      });
      this.questionControls.push(fg);

    });
    this.jobForm.enable();
   }
  }


  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    })
    this.setForm();
  }



  applyToJob() {
    if (this.jobForm.valid) {
      this.saving = true;
      this.internService.applyToJob({
        body: {
          InternShipId: this._data?.job?.id,
          answers: this.questionControls?.value?.map(controller => ({
            qId: controller?.question?.qId,
            answer: controller?.answer
          }))
        }
      }).subscribe({
        next: () => {
          this.saving = false;
          this.job.appliedByUser = true;
          this.toastr.success('', 'You request has been sent');
          this._matDialogRef.close(true);
        },
        error: (err) => {
          this.saving = false;
          this.toastr.error(err?.error || '', 'Error has been occurred!')
        },
      })
    }else{
      this.jobForm.markAllAsTouched();
    }
  }
  onNoClick(): void {
    this._matDialogRef.close();
  }

}
