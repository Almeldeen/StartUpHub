import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dateFormat } from 'app/app-constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account, SimpleChat } from 'app/core/backend/models';
import { ChatService } from 'app/core/backend/services';
import { SignalRService } from 'app/signalr.service';
import { Subject } from 'rxjs';
import { ChatManageService } from '../chat.service';

@Component({
    selector: 'chat-chats',
    templateUrl: './chats.component.html'
})
export class ChatsComponent implements OnInit, OnDestroy {
    dateFormat = dateFormat;
    chats: SimpleChat[] = [];
    unreadCount: number = 0;
    $page = 1;
    $total = 1;
    $pageSize = 10;
    gettingChats = false;
    gettingChatsFirstTime = false;
    drawerOpened: boolean = false;
    selectedChat: SimpleChat;
    acc: Account;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('infiniteScrollDiv') infiniteScroll: ElementRef;
    /**
     * Constructor
     */
    constructor(
        private accService: AccountService,
        private chatService: ChatService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private signalRService: SignalRService,
        private chatManageService: ChatManageService,

    ) {
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
        this.getChats(1, true);
        this.chatManageService.selectedChat.subscribe(chat => {
            if (chat) {
                this.selectedChat = chat;
            } else {
                this.selectedChat = null;
            }
        });
        this.signalRService.emitNewMSG.subscribe(msg => {
            if(msg.chatId !== this.chatManageService.selectedChat.value?.chatId){
                this.getChats(1, false);
            }
        });

    }


    selectChat(chat: SimpleChat) {
        this.chatManageService.selectChat(chat);
        console.log(chat);
        chat.unReadMsgCount = 0;
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'merge',
            queryParams: {
                userId: chat?.userId,
                userRole: chat?.userRole || null
            }
        })
    }

    getChats(page: number, firstTime = false) {
        if (page > this.$total || !this.$total) {
            return;
        }
        this.$page = page;
        if (firstTime) {
            this.gettingChatsFirstTime = true;
        }
        this.gettingChats = true;

        this.chatService.getChats({
            page: page,
            pageSize: 10

        }).subscribe({
            next: (data) => {
                this.gettingChats = false;
                if (firstTime) {
                    this.gettingChatsFirstTime = false;
                }
                if (!this.chats || this.$page === 1) {
                    this.chats = [];
                }
                if (data?.data) {
                    this.chats.push(...data?.data);
                }

                this.$total = data.totalPages || 1;

            },

            error: () => {
                if (firstTime) {
                    this.gettingChatsFirstTime = false;
                }
                this.gettingChats = false;

            }
        })
    }

    onScroll() {
        this.$page++;
        this.getChats(this.$page);
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------





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

