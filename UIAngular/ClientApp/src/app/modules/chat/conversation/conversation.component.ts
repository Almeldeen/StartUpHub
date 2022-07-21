import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account, Message, SimpleChat } from 'app/core/backend/models';
import { ChatService } from 'app/core/backend/services';
import { SignalRService } from 'app/signalr.service';
import { Subject } from 'rxjs';
import { ChatManageService } from '../chat.service';

@Component({
    selector: 'chat-conversation',
    templateUrl: './conversation.component.html'
})
export class ConversationComponent implements OnInit, OnDestroy {
    messages: Message[];
    $pageMsg = 1;
    $totalMsg = 1;
    $Msg = 10;
    gettingChatsMsg = true;
    acc: Account;
    @ViewChild('messageInput') messageInput: ElementRef;
    chat: SimpleChat | null;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private chatService: ChatService,
        private signalRService: SignalRService,
        public chatMnage: ChatManageService,
        private _ngZone: NgZone,
        private accService: AccountService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Decorated methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resize on 'input' and 'ngModelChange' events
     *
     * @private
     */
    @HostListener('input')
    @HostListener('ngModelChange')
    private _resizeMessageInput(): void {
        // This doesn't need to trigger Angular's change detection by itself
        this._ngZone.runOutsideAngular(() => {

            setTimeout(() => {

                // Set the height to 'auto' so we can correctly read the scrollHeight
                this.messageInput.nativeElement.style.height = 'auto';

                // Detect the changes so the height is applied
                this._changeDetectorRef.detectChanges();

                // Get the scrollHeight and subtract the vertical padding
                this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;

                // Detect the changes one more time to apply the final height
                this._changeDetectorRef.detectChanges();
            });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.accService.identity().subscribe(user => {
            this.acc = user;
        });

        this.chatMnage.selectedChat.subscribe(chat => {
            if (chat) {
                this.chat = chat;
                this.getMessagesForChat(1, this.chat.chatId);

            } else {
                this.chat = null;
            }
        });

        this.signalRService.emitNewMSG.subscribe(msg => {
            if (msg.chatId === this.chat?.chatId) {
                this.messages.push(msg);
            }

        });
    }

    sendMessageEnter(content: string, event) {


        if (event.keyCode === 13 && content) {
            this.sendMsg(content, event)
        }

    }
    sendMessageBtn(content: string, event) {
        if (event && event.target) {
            event.target.disabled = true;
        }
        this.sendMsg(content, event)
    }

    sendMsg(content: string, event: any) {
        this.chatService.sendMessage({
            body: {
                chatId: this.chat.chatId,
                reciverId: this.chat.userId,
                content: content
            }
        }).subscribe({
            next: (resMsg) => {
                if (event && event.target) {
                    event.target.disabled = false;
                }
                const msg: Message = {
                    content: content,
                    createdate: new Date().toISOString(),
                    read: false,
                    chatId: resMsg?.chatId,
                    reciverId: resMsg?.reciverId,
                    senderId: this.acc.id,
                }
                this.messages.push(msg);
            
                this.chatMnage.selectChat(
                    {
                        ... this.chatMnage.selectedChat.value,
                        lastMsg: resMsg.content,
                        chatId: resMsg?.chatId,

                        unReadMsgCount: 0
                    }
                )
            },
            error: () => {

            }
        })
    }

    getMessagesForChat(page: number, chatId: number) {
        this.$pageMsg = page;
        if (page > this.$totalMsg || !this.$totalMsg) {
            this.$pageMsg--;
            return;
        }
        this.gettingChatsMsg = true;

        this.chatService.getChatMessages({
            page: page,
            pageSize: 10,
            chatId: chatId

        }).subscribe({
            next: (data) => {
                this.gettingChatsMsg = false;
                if (!this.messages || this.$pageMsg === 1) {
                    this.messages = [];
                }
                if (data?.data) {
                    this.messages.push(...data?.data);
                    this.messages.sort((a, b) => new Date(a.createdate).valueOf() - new Date(b.createdate).valueOf())
                }
                this.$totalMsg = data.totalPages || 1;
                this.chatService.readChat({
                    chatId
                }).subscribe(() => {
                    this.signalRService.getMessagesCount();
                    this.chatMnage.selectChat({ ...this.chatMnage.selectedChat.value, unReadMsgCount: 0 })
                })

            },

            error: () => {
                this.gettingChatsMsg = false;
            }
        })
    }

    onScrollForChat() {
        this.$pageMsg++;
        this.getMessagesForChat(this.$pageMsg, this.chat.chatId);
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.chatMnage.selectChat(null);
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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
}
