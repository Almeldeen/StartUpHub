import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/backend/services';
import { fuseAnimations } from 'theme/animations';

@Component({
    selector     : 'auth-confirmation-required',
    templateUrl  : './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthConfirmationRequiredComponent implements OnInit
{
    email = null;
    token = null;
    activating = false;
    success = false;
    error = false;
    constructor(private activeRoute: ActivatedRoute, private auth: AuthService)
    {
    }
    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe(params =>  {
            if(params['token'] && params['email']){
                this.activating = true;
                this.auth.confirmEmail({
                    email:  params['email'],
                    token: params['token']
                }).subscribe({
                    next: (data) => {
                        this.activating = false;
                        this.success = true;
                    },
                    error: (err) => {
                        this.activating = false;
                        this.error = true;
                    }
                })
            }else{
                this.error = true
            }
        })
    }
}
