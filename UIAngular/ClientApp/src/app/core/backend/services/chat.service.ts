/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Message } from '../models/message';
import { SimpleChat } from '../models/simple-chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getChats
   */
  static readonly GetChatsPath = '/api/chat/getchats';

  /**
   * get chats.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChats()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChats$Response(params: {
    page: number;
    pageSize: number;
  }): Observable<StrictHttpResponse<{
'totalPages'?: number;
'currentPage'?: number;
'data'?: Array<SimpleChat>;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.GetChatsPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('pageSize', params.pageSize, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'totalPages'?: number;
        'currentPage'?: number;
        'data'?: Array<SimpleChat>;
        }>;
      })
    );
  }

  /**
   * get chats.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getChats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChats(params: {
    page: number;
    pageSize: number;
  }): Observable<{
'totalPages'?: number;
'currentPage'?: number;
'data'?: Array<SimpleChat>;
}> {

    return this.getChats$Response(params).pipe(
      map((r: StrictHttpResponse<{
'totalPages'?: number;
'currentPage'?: number;
'data'?: Array<SimpleChat>;
}>) => r.body as {
'totalPages'?: number;
'currentPage'?: number;
'data'?: Array<SimpleChat>;
})
    );
  }

  /**
   * Path part for operation readChat
   */
  static readonly ReadChatPath = '/api/chat/readmsg';

  /**
   * get chats.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readChat()` instead.
   *
   * This method doesn't expect any request body.
   */
  readChat$Response(params: {
    chatId: number;
  }): Observable<StrictHttpResponse<{
'totalPages'?: number;
'currentPage'?: number;
'data'?: Array<SimpleChat>;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.ReadChatPath, 'post');
    if (params) {
      rb.query('chatId', params.chatId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'totalPages'?: number;
        'currentPage'?: number;
        'data'?: Array<SimpleChat>;
        }>;
      })
    );
  }

  /**
   * get chats.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `readChat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readChat(params: {
    chatId: number;
  }): Observable<{
'totalPages'?: number;
'currentPage'?: number;
'data'?: Array<SimpleChat>;
}> {

    return this.readChat$Response(params).pipe(
      map((r: StrictHttpResponse<{
'totalPages'?: number;
'currentPage'?: number;
'data'?: Array<SimpleChat>;
}>) => r.body as {
'totalPages'?: number;
'currentPage'?: number;
'data'?: Array<SimpleChat>;
})
    );
  }

  /**
   * Path part for operation getChatMessages
   */
  static readonly GetChatMessagesPath = '/api/chat/getmsgschat';

  /**
   * get chat msgs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChatMessages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatMessages$Response(params: {
    page: number;
    pageSize: number;
    chatId: number;
  }): Observable<StrictHttpResponse<{
'data'?: Array<Message>;
'totalPages'?: number;
'currentPages'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.GetChatMessagesPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('pageSize', params.pageSize, {});
      rb.query('chatId', params.chatId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'data'?: Array<Message>;
        'totalPages'?: number;
        'currentPages'?: number;
        }>;
      })
    );
  }

  /**
   * get chat msgs.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getChatMessages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatMessages(params: {
    page: number;
    pageSize: number;
    chatId: number;
  }): Observable<{
'data'?: Array<Message>;
'totalPages'?: number;
'currentPages'?: number;
}> {

    return this.getChatMessages$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<Message>;
'totalPages'?: number;
'currentPages'?: number;
}>) => r.body as {
'data'?: Array<Message>;
'totalPages'?: number;
'currentPages'?: number;
})
    );
  }

  /**
   * Path part for operation getChatIdByUserId
   */
  static readonly GetChatIdByUserIdPath = '/api/chat/getmsgschatbyuserid';

  /**
   * get chat msgs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChatIdByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatIdByUserId$Response(params: {
    userId: number;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.GetChatIdByUserIdPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * get chat msgs.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getChatIdByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatIdByUserId(params: {
    userId: number;
  }): Observable<number> {

    return this.getChatIdByUserId$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation sendMessage
   */
  static readonly SendMessagePath = '/api/chat/sendmsg';

  /**
   * get chat msgs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendMessage$Response(params?: {
    body?: {
'reciverId': string;
'chatId'?: number;
'content': string;
}
  }): Observable<StrictHttpResponse<Message>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.SendMessagePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Message>;
      })
    );
  }

  /**
   * get chat msgs.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sendMessage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendMessage(params?: {
    body?: {
'reciverId': string;
'chatId'?: number;
'content': string;
}
  }): Observable<Message> {

    return this.sendMessage$Response(params).pipe(
      map((r: StrictHttpResponse<Message>) => r.body as Message)
    );
  }

  /**
   * Path part for operation getUnreadMsgsCount
   */
  static readonly GetUnreadMsgsCountPath = '/api/chat/UnReadMsgCount';

  /**
   * get chat msgs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUnreadMsgsCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUnreadMsgsCount$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.GetUnreadMsgsCountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * get chat msgs.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUnreadMsgsCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUnreadMsgsCount(params?: {
  }): Observable<number> {

    return this.getUnreadMsgsCount$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}
