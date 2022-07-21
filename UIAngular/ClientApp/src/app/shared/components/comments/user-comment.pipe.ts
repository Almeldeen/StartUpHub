import { Pipe, PipeTransform } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account, Comment } from 'app/core/backend/models';

@Pipe({
  name: 'userComment'
})
export class UserCommentPipe implements PipeTransform {

  private acc : Account;
  constructor( accService:AccountService){
    accService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    })
  }
  transform(comment: Comment): boolean {
    return comment?.userId === this.acc?.id || false;
  }

}
