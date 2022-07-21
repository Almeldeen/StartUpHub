import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { InternLocalService } from '../../modules/profile/intern/intern.component';

@Directive({
  selector: '[appPublicProfile]'
})
export class PublicProfileDirective {

  private profileSub?: Subscription;

  @Input() 
  set appPublicProfile(value: boolean){
    this.updateView(this.internLocalService.$public.value, value);
    // Get notified each time authentication state changes.
    this.profileSub = from(this.internLocalService.$public).subscribe((isPublic) => this.updateView(isPublic, value));
  };
  constructor(
    private internLocalService: InternLocalService,
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
