import { Route } from '@angular/router';
import { ChatComponent } from 'app/modules/chat/chat.component';
import { ChatsComponent } from 'app/modules/chat/chats/chats.component';
import { ConversationComponent } from 'app/modules/chat/conversation/conversation.component';

export const chatRoutes: Route[] = [
    {
        path     : '',
        component: ChatComponent,
  
        children : [
            {
                path     : '',
                component: ChatsComponent,
                children : [
                    {
                        path     : '',
                        component: ConversationComponent,
                        children : [
                            {
                                path   : ':id',
                              
                            }
                        ]
                    },
                ]
            }
        ]
    }
];
