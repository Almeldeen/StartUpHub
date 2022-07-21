import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/core/backend/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePassword = new FormGroup({
    oldPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,30}$')]),
    confirmPassword: new FormControl(null, Validators.required)
  });

  notTypical = false;
  saving = false;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  changePasswordConfirm() {
    this.notTypical = false;
    if (this.changePassword.invalid) {
      this.changePassword.markAllAsTouched();
      Object.values(this.changePassword.controls).forEach(cont => {
        if (cont.invalid) {
          cont.markAsDirty();
          cont.markAsPristine();
          cont.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    if (this.changePassword.value.newPassword != this.changePassword.value.confirmPassword) {
      this.notTypical = true;
      this.changePassword.controls.confirmPassword.setErrors({notTypical: true})
      return;
    }

    this.saving = true;
    this.authService.changePassword({
      newPassword: this.changePassword.value.newPassword,
      oldPassword: this.changePassword.value.oldPassword
    }).subscribe({
      next: () => {
        this.saving = false;
        this.toastr.success('Password has been changed');
        this.changePassword.reset();
      },
      error: () => {
        this.saving = false;
        this.toastr.error('An error has been occurred!');
      }
    })
  }

}
