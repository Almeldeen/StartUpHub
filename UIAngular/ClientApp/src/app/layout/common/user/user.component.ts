import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { Account } from 'app/core/backend/models';
import { AppConfig, Scheme } from 'app/core/config/app.config';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from 'theme/services/config';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styles: [`.active{
        background: rgba(148, 163, 184, 0.12);
    }`],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: Account;
    config: AppConfig;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: AccountService,
        private auth: AuthServerProvider,
        private localhost: LocalStorageService,
        private _fuseConfigService: FuseConfigService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Subscribe to config changes const theme = this.localhost.retrieve('theme', scheme);
        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AppConfig) => {

                // Store the config
                this.config = config;
            });

        // Subscribe to user changes
        this._userService.identity()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: Account) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }


    setScheme(scheme: Scheme): void {
        this._fuseConfigService.config = { scheme };
        this.localhost.store('theme', scheme);
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this.auth.logout().subscribe({
            complete: () => {
                this._router.navigate(['/home']);
            }
        });
    }
    goSetting(){
        this._userService.getAuthenticationState().subscribe((user) => {
            if(user.role.includes(ROLES.COMPANY)){
                this._router.navigate(['/profile', 'company', user.id,'about']);
            }
            if(user.role.includes(ROLES.INTERN)){
                this._router.navigate(['/profile', 'intern', user.id,'about']);
            }
        })
    }

    goProfile(){
        this._userService.getAuthenticationState().subscribe((user) => {
            if(user.role.includes(ROLES.COMPANY)){
                this._router.navigate(['/profile', 'company', user.id]);
            }
            if(user.role.includes(ROLES.INTERN)){
                this._router.navigate(['/profile', 'intern', user.id]);
            }
        })
    }
}
