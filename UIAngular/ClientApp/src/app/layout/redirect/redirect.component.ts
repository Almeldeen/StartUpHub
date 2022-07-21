import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLES } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { FuseSplashScreenService } from 'theme/services/splash-screen';

@Component({
  selector: 'app-redirect',
  template: '',
  styles: []
})
export class RedirectComponent implements OnInit,  OnDestroy {

  constructor(
    private splash: FuseSplashScreenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accService: AccountService,

  ) { 
  }
  
  ngOnInit(): void {
    
    this.splash.show();
    this.activatedRoute.queryParams.subscribe(params => {

      const redirectURL = params['redirectURL'];
      if(redirectURL){
        if(redirectURL === 'about'){
          this.accService.identity(true).subscribe((usr) => {
            if(usr && usr.role.includes(ROLES.INTERN)){
              this.router.navigate(['/profile', 'intern', usr.id, 'about']);
            }else if(usr.role.includes(ROLES.COMPANY)){
              this.router.navigate(['/profile', 'company', usr.id, 'about']);
            }
          });
        }else{
          this.router.navigateByUrl(redirectURL);
        }
      }else{
        this.router.navigate(['/timeline']);  
      }

    })
   
  }

  ngOnDestroy(): void {
    this.splash.hide();
  }

}
