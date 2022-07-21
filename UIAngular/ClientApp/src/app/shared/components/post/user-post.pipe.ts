import { Pipe, PipeTransform } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account, TimelineArticle } from 'app/core/backend/models';

@Pipe({
  name: 'userPost'
})
export class UserPostPipe implements PipeTransform {

  private acc : Account;
  constructor( accService:AccountService){
    accService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    })
  }
  transform(article: TimelineArticle): boolean {
    return article?.userId === this.acc?.id || false;
  }

}
