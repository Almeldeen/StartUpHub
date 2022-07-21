import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/backend/models';
import { CreateArticleDialogComponent } from '../create-article-dialog/create-article-dialog.component';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  @Output() done = new EventEmitter<boolean>();
  @Input() withImage = true;
  acc: Account;
  constructor(
    private _matDialog: MatDialog,
    private accService: AccountService,

  ) { }

  ngOnInit(): void {
    this.accService.getAuthenticationState().subscribe(user => {
      this.acc = user;
    });
  }

  openDialog(): void {
    const dialogRef = this._matDialog.open(CreateArticleDialogComponent, {
        width: window.innerWidth < 500 ?  '100%' : '700px',
        maxWidth: window.innerWidth < 500 ?  '100%' : '700px',
        height: 'auto',
        closeOnNavigation:true,
        autoFocus: false,
        restoreFocus: true
    });

    dialogRef.afterClosed().subscribe({
      next: (data) =>{
        this.done.emit(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
}
}
