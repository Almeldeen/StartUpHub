import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SimpleChat } from 'app/core/backend/models';

@Component({
    selector       : 'chat-contact-info',
    templateUrl    : './contact-info.component.html',

})
export class ContactInfoComponent
{
    @Input() chat: SimpleChat;
    @Input() drawer: MatDrawer;

    /**
     * Constructor
     */
    constructor()
    {
    }
}
