import { Pipe, PipeTransform } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account, TimelineJob } from 'app/core/backend/models';

@Pipe({
  name: 'userJob'
})
export class UserJobPipe implements PipeTransform {

  private acc : Account;
  constructor( accService:AccountService){
    accService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    })
  }
  transform(job: TimelineJob): boolean {
    return job?.userId === this.acc?.id || false;
  }

}
