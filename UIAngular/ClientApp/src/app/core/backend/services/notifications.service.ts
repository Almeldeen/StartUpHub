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

import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getNotifcations
   */
  static readonly GetNotifcationsPath = '/api/Notifcation/GetNotifications';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNotifcations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotifcations$Response(params: {
    pagenum: number;
    pagesize: number;
  }): Observable<StrictHttpResponse<{
'data'?: Array<Notification>;
'totalPages'?: number;
'currentPage'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationsService.GetNotifcationsPath, 'get');
    if (params) {
      rb.query('pagenum', params.pagenum, {});
      rb.query('pagesize', params.pagesize, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'data'?: Array<Notification>;
        'totalPages'?: number;
        'currentPage'?: number;
        }>;
      })
    );
  }

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNotifcations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotifcations(params: {
    pagenum: number;
    pagesize: number;
  }): Observable<{
'data'?: Array<Notification>;
'totalPages'?: number;
'currentPage'?: number;
}> {

    return this.getNotifcations$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<Notification>;
'totalPages'?: number;
'currentPage'?: number;
}>) => r.body as {
'data'?: Array<Notification>;
'totalPages'?: number;
'currentPage'?: number;
})
    );
  }

  /**
   * Path part for operation readNotifcation
   */
  static readonly ReadNotifcationPath = '/api/Notifcation/ReadNotification';

  /**
   * Read Notif.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readNotifcation()` instead.
   *
   * This method doesn't expect any request body.
   */
  readNotifcation$Response(params: {
    notificationId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationsService.ReadNotifcationPath, 'post');
    if (params) {
      rb.query('notificationId', params.notificationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Read Notif.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `readNotifcation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readNotifcation(params: {
    notificationId: number;
  }): Observable<void> {

    return this.readNotifcation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation unreadNotifcationsCount
   */
  static readonly UnreadNotifcationsCountPath = '/api/Notifcation/UnReadNotificationCount';

  /**
   * Read Notif.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unreadNotifcationsCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  unreadNotifcationsCount$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationsService.UnreadNotifcationsCountPath, 'get');
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
   * Read Notif.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unreadNotifcationsCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unreadNotifcationsCount(params?: {
  }): Observable<number> {

    return this.unreadNotifcationsCount$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}
