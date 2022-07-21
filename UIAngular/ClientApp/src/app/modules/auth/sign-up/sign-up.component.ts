import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ROLES, usernameRegex } from 'app/app-constants';
import { Account } from 'app/core/backend/models';
import { AuthService } from 'app/core/backend/services';
import { PublicRoutes } from 'app/shared/routes/public-routes';
import { fuseAnimations } from 'theme/animations';
import { FuseAlertType } from 'theme/components/alert';
@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    styles: [`
    :host::ng-deep .mat-vertical-stepper-header{
    pointer-events: none !important;
}
    `],
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    publicRoutes = PublicRoutes;
    @ViewChild('verticalStepper') verticalStepper: MatStepper;
    @ViewChild('verticalStepperStep2') verticalStepForm: MatStep;

    ROLES = ROLES;
    createdAccount: {
        id: Account['id'],
        role: Account['role']
    };
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    mode: 'INTERN' | 'COMPANY' | null = null;

    internForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        fullName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
        address: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
        username: new FormControl(null, [Validators.required, Validators.pattern(usernameRegex)]),
        phone: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
        password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,30}$')]),
        confirmPassword: new FormControl(null, [Validators.required]),
    });
    companyForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        fullName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
        address: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
        username: new FormControl(null, [Validators.required, Validators.pattern(usernameRegex)]),
        phone: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
        password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,30}$')]),
        confirmPassword: new FormControl(null, [Validators.required]),
    });
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {
    }



    ngOnInit(): void {

    }

    goToLogin() {
        this._router.navigate([PublicRoutes.login], { queryParams: { redirectURL: 'about' } })
    }


    nextStep(mode: 'INTERN' | 'COMPANY') {
        this.mode = mode;
        this.verticalStepper.next();
    }
    /**
     * Sign up
     */
    signUpInternee(): void {

        // Do nothing if the form is invalid

        if (this.internForm.invalid) {
            this.verticalStepForm._markAsInteracted();
            return;
        }
        if (this.internForm.value.password !== this.internForm.value.confirmPassword) {
            this.alert.message = 'Passwords are not the same';
            this.alert.type = 'error';
            this.showAlert = true;
            return;
        }

        // Hide the alert
        this.showAlert = false;
        // Re-enable the form
        this.internForm.disable();

        const acc: Account = {
            fullName: this.internForm.value.fullName,
            email: this.internForm.value.email,
            password: this.internForm.value.password,
            username: this.internForm.value.username,
            mobile: this.internForm.value.phone,
            address: this.internForm.value.address,
            role: ROLES.INTERN
        }
        // Sign up
        this._authService.register({ body: acc })
            .subscribe(
                (res) => {
                    this.createdAccount = {
                        id: res.id || '',
                        role: res.role || '',
                    };
                    this.verticalStepper.next();

                },
                (err) => {
                    // Re-enable the form
                    this.internForm.enable();
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: err?.error || 'Something went wrong'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }


    signUpCompany(): void {

        // Do nothing if the form is invalid

        if (this.companyForm.invalid) {
            this.verticalStepForm._markAsInteracted();
            return;
        }
        if (this.companyForm.value.password !== this.companyForm.value.confirmPassword) {
            this.alert.message = 'Passwords are not the same';
            this.alert.type = 'error';
            this.showAlert = true;
            return;
        }

        // Hide the alert
        this.showAlert = false;
        // Re-enable the form
        this.companyForm.disable();

        const acc: Account = {
            fullName: this.companyForm.value.fullName,
            email: this.companyForm.value.email,
            password: this.companyForm.value.password,
            username: this.companyForm.value.username,
            mobile: this.companyForm.value.phone,
            address: this.companyForm.value.address,
            role: ROLES.COMPANY
        }
        // Sign up
        this._authService.register({ body: acc })
            .subscribe(
                (res) => {
                    this.createdAccount = {
                        id: res.id || '',
                        role: res.role || '',
                    };
                    this.verticalStepper.next();

                },
                (err) => {
                    // Re-enable the form
                    this.companyForm.enable();
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: err?.error || 'Something went wrong'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
