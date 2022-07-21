import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROLES } from 'app/app-constants';
import { CompanyProfile, InternProfile } from 'app/core/backend/models';
import { ChatService, CompanyService, InternService } from 'app/core/backend/services';
import { SignalRService } from 'app/signalr.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ChatManageService } from './chat.service';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
})
export class ChatComponent  {
    gettingInfo = false;
    profile: CompanyProfile | InternProfile;
    sub: Subscription;
    /**
     * Constructor
     */
    constructor(
        private activeRoute: ActivatedRoute,
        private chatManage: ChatManageService,
        private chatService: ChatService,
        private companyService: CompanyService,
        private internService: InternService,
        private signalRService: SignalRService,

    ) {
         activeRoute.queryParams.pipe(first(),).subscribe(params => {
            if (params['userId'] && params['userRole']) {
             
                this.gettingInfo = true;
                if (params['userRole'] === ROLES.INTERN) {
                    internService.getInternProfile({
                        userId: params['userId']
                    }).subscribe(prof => {
                        this.gettingInfo = false;
                        this.profile = prof;
                        this.getChatByUserId(prof.interenId);
                    }, () => {
                        this.gettingInfo = false;
                    });
                } else if (params['userRole'] === ROLES.COMPANY) {
                    companyService.getCompanyProfile({
                        userId: params['userId']
                    }).subscribe(prof => {
                        this.gettingInfo = false;
                        this.profile = prof;
                        this.getChatByUserId(prof.interenId);

                    }, () => {
                        this.gettingInfo = false;
                    })
                }
            }
        });

    }

    getChatByUserId(userId) {
        this.gettingInfo = true;
        this.chatService.getChatIdByUserId({
            userId: userId,
        }).subscribe((chatId) => {
            this.chatManage.selectChat({
                chatId: chatId || null,
                userImg: this.profile.userImg,
                unReadMsgCount: 0,
                userId: this.profile.interenId,
                userRole: this.profile.userRole,
                userName: this.profile.fullName
            });
            this.gettingInfo = false;
        }, () => {
            this.gettingInfo = false;
            this.chatManage.selectChat({
                chatId: null,
                userImg: this.profile.userImg,
                unReadMsgCount: 0,
                userId: this.profile.interenId,
                userRole: this.profile.userRole,
                userName: this.profile.fullName
            });
        })
    }

  
}
