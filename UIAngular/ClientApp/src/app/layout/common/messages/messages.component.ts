import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AccountService } from 'app/core/auth/account.service';
import { Account, Message, SimpleChat } from 'app/core/backend/models';
import { ChatService } from 'app/core/backend/services';
import { Subject } from 'rxjs';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    exportAs: 'messages'
})
export class MessagesComponent implements OnInit, OnDestroy {
    @ViewChild('messagesOrigin') private _messagesOrigin: MatButton;
    @ViewChild('messagesPanel') private _messagesPanel: TemplateRef<any>;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    chats: SimpleChat[];
    messages: Message[];
    unreadCount: number = 0;

    $page = 1;
    $total = 1;
    $pageSize = 10;
    gettingChats = true;
    $pageMsg = 1;
    $totalMsg = 1;
    $Msg = 10;
    gettingChatsMsg = true;
    acc: Account;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _overlay: Overlay,
        private accService: AccountService,
        private _viewContainerRef: ViewContainerRef,
        private chatService: ChatService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.accService.getAuthenticationState().subscribe(user => {
            this.acc = user;
        })
    }

    
   

    


    getChats(page: number) {
        if (page > this.$total || !this.$total) {
            return;
        }
        this.$page = page;
        this.gettingChats = true;

        this.chatService.getChats({
            page: 1,
            pageSize: 10

        }).subscribe({
            next: (data) => {
                this.gettingChats = false;
                if (!this.chats || this.$page === 1) {
                    this.chats = [];
                }
                if (data?.data) {
                    this.chats = data?.data || []
                }
                this.$total = data.totalPages || 1;
                
            },

            error: () => {
                this.gettingChats = false;
            }
        })
    }

    onScroll() {
        this.$page++;
        this.getChats(this.$page);
    }
    getMessagesForChat(page: number, chatId: number) {
        if (page > this.$totalMsg || !this.$totalMsg) {
            return;
        }
        this.$pageMsg = page;
        this.gettingChatsMsg = true;

        this.chatService.getChatMessages({
            page: 1,
            pageSize: 10,
            chatId: chatId

        }).subscribe({
            next: (data) => {
                this.gettingChatsMsg = false;
                if (!this.messages || this.$pageMsg === 1) {
                    this.messages = [];
                }
                if (data?.data) {
                    this.messages = data?.data || []
                }
                this.$totalMsg = data.totalPages || 1;
                
            },

            error: () => {
                this.gettingChatsMsg = false;
            }
        })
    }

    onScrollForChat() {
        this.$pageMsg++;
        this.getChats(this.$pageMsg);
    }





     // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the messages panel
     */
     openPanel(): void {
        // Return if the messages panel or its origin is not defined
        if (!this._messagesPanel || !this._messagesOrigin) {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._messagesPanel, this._viewContainerRef));
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

    /**
     * Close the messages panel
     */
    closePanel(): void {
        this._overlayRef.detach();
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
                .flexibleConnectedTo(this._messagesOrigin._elementRef.nativeElement)
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

    
}
