import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { from, Subscription } from 'rxjs';



@Directive({
  selector: '[appHasAnyAuthority]',
})
export class HasAnyAuthorityDirective implements OnDestroy {
  private authorities: string[] = [];
  private authenticationSubscription?: Subscription;

  constructor(
    private accountService: AccountService,
     private templateRef: TemplateRef<any>,
      private viewContainerRef: ViewContainerRef) {}

  @Input()
  set appHasAnyAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;
  
    this.updateView();
    // Get notified each time authentication state changes.
    this.authenticationSubscription = from(this.accountService.getAuthenticationState()).subscribe(() => this.updateView());
  }

  ngOnDestroy(): void {
    if (this.authenticationSubscription) {
      this.authenticationSubscription.unsubscribe();
    }
  }

  private updateView(): void {
    let hasAnyAuthority = false;
    this.accountService.getAuthenticationState().subscribe(usr => {
      if(usr){
        if(this.authorities && (this.authorities).includes(usr.role)){
          hasAnyAuthority =  true;
        }
        this.viewContainerRef.clear();
        if (hasAnyAuthority || !(this.authorities && this.authorities.length)) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      }

    })
    
  }
}
