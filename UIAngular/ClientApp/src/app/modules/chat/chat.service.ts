import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleChat } from 'app/core/backend/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatManageService
{
     selectedChat: BehaviorSubject<SimpleChat> = new BehaviorSubject(null);

    private _profile: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    selectChat(chat: SimpleChat | null){
        this.selectedChat.next(chat || null);
    }




   

}
