import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../backend/models';
import { AuthService } from '../backend/services';
import { AccountService } from './account.service';


@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(    
    private authService: AuthService,
    private $localStorage: LocalStorageService,
    private accService: AccountService,
     private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: {email: string;password: string;}): Observable<void> {
    return this.authService.login({body: credentials})
    .pipe(map(response => this.authenticateSuccess(response)));
    
      
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      this.accService.identity(true).subscribe();
      observer.complete();
    })
  }

  private authenticateSuccess(response: {
    'token'?: string;
    'account'?: Account;
    }, rememberMe = false): void {
    const jwt = response.token;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
    this.accService.identity(true).subscribe();
  }
}
