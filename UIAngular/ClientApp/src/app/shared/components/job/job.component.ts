import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { dateFormatDate } from 'app/app-constants';
import { TimelineJob } from 'app/core/backend/models';
import { ToastrService } from 'ngx-toastr';
import { ApplyToJobDialogComponent } from '../apply-to-job-dialog/apply-to-job-dialog.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  dateFormat = dateFormatDate;
  @Output() done = new EventEmitter<boolean>();
  @Input() showViewBtn = true;
  @Input() showUserData = true;
  @Input() job: TimelineJob;

  constructor(
    private toastr: ToastrService,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this._matDialog.open(ApplyToJobDialogComponent, {
        width: window.innerWidth < 500 ?  '100%' : '700px',
        maxWidth: window.innerWidth < 500 ?  '100%' : '700px',
        height: 'auto',
        closeOnNavigation:true,
        autoFocus: false,
        restoreFocus: true,
        data: {
          job: this.job
        },
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

  copyLink(postId: string){
    const text = location.host + '/job-details/' +postId
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    this.toastr.success('Link has been copied!')
  }

}
