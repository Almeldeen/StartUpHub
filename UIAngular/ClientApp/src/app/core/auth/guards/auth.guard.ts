import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PublicRoutes } from 'app/shared/routes/public-routes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../account.service';
import { StateStorageService } from '../state-storage.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  returnUrl = '';
    constructor(
        private router: Router,
        private accountService: AccountService,
        private stateStorageService: StateStorageService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const authorities = route.data.authorities;
        // We need to call the checkLogin / and so the accountService.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.checkLogin(authorities, state.url);
      }

      checkLogin(authorities: string[], url: string): Observable<boolean> {
        this.returnUrl = url;
        return this.accountService.identity().pipe(
          map(account => {
            
            if (account) {
                            const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities) ||
               authorities === undefined ||  authorities?.length === 0;
              if (hasAnyAuthority) {
                return true;
              }
              if (isDevMode()) {
                console.error('User has not any of required authorities: ', authorities);
              }
              this.router.navigate(['/403']);
              return true;
            }
            this.stateStorageService.storeUrl(url);
            this.router.navigate([PublicRoutes.login], {queryParams: {'returnUrl': this.returnUrl}});

            return false;
          })
        );
      }
}
