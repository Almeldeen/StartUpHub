import { Pipe, PipeTransform } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/backend/models';

@Pipe({
  name: 'isMine'
})
export class IsMinePipe implements PipeTransform {

  private acc: Account = null;
  constructor( private accService: AccountService,) {
    this.accService.identity().subscribe(user =>{
      this.acc = user;
  });
  }
  transform(senderId: string): boolean {
    return this.acc.id === senderId;
  }

}
