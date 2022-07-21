

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr";
import { environment } from "environments/environment";
import { Subject } from "rxjs";
import { AccountService } from "./core/auth/account.service";
import { AuthServerProvider } from "./core/auth/auth-jwt.service";
import { Message, Notification } from "./core/backend/models";
import { ChatService } from "./core/backend/services";
import { ChatManageService } from "./modules/chat/chat.service";
const audio = new Audio('assets/audio/notif.mp3');

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection;
  emitNotificationCount: Subject<number> = new Subject();
  emitNotification: Subject<Notification> = new Subject();
  unReadMsgsCount: Subject<number> = new Subject();
  emitNewMSG: Subject<Message> = new Subject();

  constructor(private http: HttpClient,
    private msgService: ChatService,
    private _authService: AuthServerProvider,
    private accService: AccountService,
    private chatMngr: ChatManageService,
  ) {
    accService.getAuthenticationState().subscribe(user => {
      if (user) {
        this.init();
        
        this.getMessagesCount();
      }
    })
  }

  getMessagesCount() {
    this.msgService.getUnreadMsgsCount().subscribe(count => {
      setTimeout(() => {
        this.unReadMsgsCount.next(count)
      }, 100);
    });
  }


  init() {
    let myToken = '';
    if (this._authService.getToken().includes('Bearer')) {
      myToken = this._authService.getToken()
    } else {
      myToken = 'Bearer ' + this._authService.getToken()
    }
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.api + '/realtimeHub', {
        accessTokenFactory: () => new Promise<string>((res) => {
          res(myToken.replace('Bearer ', ''))
        }),

      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Trace)
      .build();
    this.hubConnection.keepAliveIntervalInMilliseconds = 300000;
    this.hubConnection.serverTimeoutInMilliseconds = 300000;

    const newLocal = 'Not connected';
    this.hubConnection.start().then(() => {
      this.msgService.getUnreadMsgsCount().subscribe(count => {
        setTimeout(() => {
          this.unReadMsgsCount.next(count)
        }, 100);
      });
      console.log('Connected!!');
    }).catch((err) => console.error(
      newLocal, err.toString()
    ));

    this.hubConnection.onreconnected(() => {
      this.connectRecievMSG();
      this.hubConnection.on("getNotifcation", (data: any) => {
        this.emitNotification.next(data);

      });
    });
    this.connectRecievMSG();
    this.hubConnection.on("getNotifcation", (data: any) => {
      this.emitNotification.next(data);
    });




  }

  connectRecievMSG() {
    this.hubConnection.on("reciveMsg", (data: Message) => {
      this.emitNewMSG.next(data);
      audio.play();
      this.chatMngr.selectedChat.subscribe(selected => {
        if (!selected || selected.chatId !== data.chatId) {
          this.getMessagesCount();
        }
      });
    });


 
  }

}