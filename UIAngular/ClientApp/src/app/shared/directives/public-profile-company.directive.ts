import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CompanyLocalService } from 'app/modules/profile/company/company.component';
import { from, Subscription } from 'rxjs';

@Directive({
  selector: '[appPublicProfileCompany]'
})
export class PublicProfileCompanyDirective {

  private profileSub?: Subscription;

  @Input() 
  set appPublicProfileCompany(value: boolean){
    this.updateView(this.companyLocalService.$public.value, value);
    // Get notified each time authentication state changes.
    this.profileSub = from(this.companyLocalService.$public).subscribe((isPublic) => this.updateView(isPublic, value));
  };
  constructor(
    private companyLocalService: CompanyLocalService,
    private templateRef: TemplateRef<any>,
     private viewContainerRef: ViewContainerRef
  ) { 

    
   
  }

  ngOnDestroy(): void {
    if (this.profileSub) {
      this.profileSub.unsubscribe();
    }
  }


  private updateView(isPublic: boolean, inverse: boolean): void {
    this.viewContainerRef.clear();
    if(inverse){
      if (isPublic) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }else{
      if (!isPublic) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }
    
  }

}
