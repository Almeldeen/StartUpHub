import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { ROLES } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account, Notification } from 'app/core/backend/models';
import { NotificationsService } from 'app/core/backend/services/notifications.service';
import { SignalRService } from 'app/signalr.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    exportAs: 'notifications'
})
export class NotificationsComponent implements OnInit, OnDestroy {
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

    notifications: Notification[] = [

    ];
    unreadCount: number = 0;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    $page = 1;
    $total = 1;
    $pageSize = 10;
    gettingNotifs = true;
    acc: Account;




    /**
     * Constructor
     */
    Roles = ROLES;
    constructor(
        private notifsService: NotificationsService,
        private _overlay: Overlay,
        private signaltSer: SignalRService,
        private _viewContainerRef: ViewContainerRef,
        private accService: AccountService,
        private toastr: ToastrService,
        private router: Router,

        
    ) {
        accService.getAuthenticationState().subscribe(user => {
            this.acc = user;
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        
        this.getNotifs(1);
        this.signaltSer.emitNotification.subscribe((data) => {
            if(data.reciverId === this.acc.id){
                this.notifications.unshift(data);
                this.showMsg(data);
                this.unreadCount++;
            }
        });
    }

    getNotifs(page: number, _online = false) {
        this.$page = page;
        if (page > this.$total || !this.$total) {
            this.$page--;
            return;
        }
        this.gettingNotifs = true;

        this.notifsService.getNotifcations({
            pagenum: page,
            pagesize: 10
        }).subscribe({
            next: (data) => {
                this.gettingNotifs = false;
                if (!this.notifications || this.$page === 1) {
                    this.notifications = [];
                }
                if (data?.data) {
                    this.notifications.push(...data?.data)
                }
                this.$total = data.totalPages || 1;
                this._calculateUnreadCount();
            },

            error: () => {
                this.gettingNotifs = false;
            }
        })
    }

    onScroll() {
        this.$page++;
        this.getNotifs(this.$page);
    }



    showMsg(n: Notification) {
            let content = '';
            let link = [];
            let queries = {};
            switch (n.type) {
                case 'NEWMSG':
                    content = `${n?.userName} sent you a message!.`;
                    link = ['/chat'];
                    if(n?.senderRole){
                        queries = {
                            userId: n?.senderId,
                            userRole: n?.senderRole
                        }
                    }
                    break;
                case 'NEWJOB':
                    content = `${n?.userName} added new job, you can apply now.`;
                    link = ['/job-details', n?.jopId];
                    break;
                case 'FOLLOW':
                    content = `${n?.userName} followed you.`;
                    link = n?.senderRole? ['/profile', n?.senderRole === 'INTERN' ? 'intern' : 'company', n?.senderId]:['/profile', this.acc?.role === this.Roles?.INTERN ? 'intern' : 'company', n?.reciverId, 'followers'];
                    break;
                case 'APPLAYJOB':
                    content = `${n?.userName} applied to your internship.`;
                    link = ['/company', 'my-jobs', n?.jopId];
                    break;
                case 'LIKE':
                    content = `${n?.userName} liked your article.`;
                    link = ['/post', n?.postId];
                    break;
                case 'COMMENT':
                    content = `${n?.userName} commented on your article.`;
                    link = ['/post', n?.postId];
                    break;
                case 'RATECOMMENT':
                    content = `${n?.userName} rated your comment.`;
                    link = ['/post', n?.postId];
                    break;
                case 'CHANGSTATE':
                    content = `One of your requests state has been changed, click for more details.`;
                    link = ['/job-request', n?.jopId];
                    break;
                default:
                    content = null;
            }


            
            if(this.router.url.includes('/chat')){
                return;
            }
            if (content) {
                if(this.toastr.findDuplicate('From ' + n.userName,content, true, false)){
                    return;
                }
                this.toastr.info(content,'From ' + n.userName,  {
                    closeButton: true,
                
                    progressBar: true,
                    newestOnTop: true,
                    positionClass: 'toast-bottom-right'
                }).onTap.subscribe((action) => {
                    this.notifications.find(e => e.id === n.id).read = true;
                    this.unreadCount--;
                    this.markAsRead(n);
                    this.router.navigate(link, {
                        queryParams: queries || {}
                    });
                })
            }
    }

    /** 
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the notifications panel
     */
    openPanel(): void {
        // Return if the notifications panel or its origin is not defined
        if (!this._notificationsPanel || !this._notificationsOrigin) {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

    /**
     * Close the messages panel
     */
    closePanel(): void {
        this._overlayRef.detach();
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): void {

    }

    markAsRead(notif: Notification) {
        this.notifsService.readNotifcation({
            notificationId: notif.id
        }).subscribe(() => {
            notif.read = true;
            this._calculateUnreadCount();
        }, () => {
            this.getNotifs(1);
        })
    }




    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom'
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top'
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom'
                    }
                ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void {

        this.notifsService.unreadNotifcationsCount().subscribe(count => {
            this.unreadCount = count;
        }, () => {
            this.unreadCount = 0;
        })
    }
}
