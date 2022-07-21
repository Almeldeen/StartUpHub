import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { PublicRoutes } from 'app/shared/routes/public-routes';
import { fuseAnimations } from 'theme/animations';
import { FuseAlertType } from 'theme/components/alert';
/**
 * Class representing a login logic.
 */
@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        rememberMe: new FormControl(false)
    });
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthServerProvider,

        private accountService: AccountService,
        private _router: Router
    ) {
    }

  
    /**
     * On init
     */
    ngOnInit(): void {
       this.accountService.identity(true).subscribe((user) => {
           if(user){
               this._router.navigate(['/timeline'])
           }
       })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.login(this.signInForm.value)
            .subscribe(
                () => {

                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigate([PublicRoutes.redirect], {queryParams: {'redirectURL': redirectURL} });

                },
                (err) => {

                    // Re-enable the form
                    this.signInForm.enable();
                    

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: err?.error || 'Something went error'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
