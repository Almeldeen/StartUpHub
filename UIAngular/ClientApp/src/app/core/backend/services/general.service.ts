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

import { Follower } from '../models/follower';

@Injectable({
  providedIn: 'root',
})
export class GeneralService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getFollowers
   */
  static readonly GetFollowersPath = '/api/followers/get-followers';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFollowers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFollowers$Response(params: {
    pagenum: number;
    pagesize: number;
  }): Observable<StrictHttpResponse<{
'data'?: Array<Follower>;
'currentPage'?: number;
'totalPages'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, GeneralService.GetFollowersPath, 'get');
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
        'data'?: Array<Follower>;
        'currentPage'?: number;
        'totalPages'?: number;
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
   * To access the full response (for headers, for example), `getFollowers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFollowers(params: {
    pagenum: number;
    pagesize: number;
  }): Observable<{
'data'?: Array<Follower>;
'currentPage'?: number;
'totalPages'?: number;
}> {

    return this.getFollowers$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<Follower>;
'currentPage'?: number;
'totalPages'?: number;
}>) => r.body as {
'data'?: Array<Follower>;
'currentPage'?: number;
'totalPages'?: number;
})
    );
  }

  /**
   * Path part for operation sendFollow
   */
  static readonly SendFollowPath = '/api/followers/SendFollow';

  /**
   * Follow user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendFollow()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendFollow$Response(params?: {
    userId?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GeneralService.SendFollowPath, 'post');
    if (params) {
      rb.query('userId', params.userId, {});
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
   * Follow user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sendFollow$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendFollow(params?: {
    userId?: string;
  }): Observable<void> {

    return this.sendFollow$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation unfollow
   */
  static readonly UnfollowPath = '/api/followers/UnFollow';

  /**
   * unfollow user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unfollow()` instead.
   *
   * This method doesn't expect any request body.
   */
  unfollow$Response(params?: {
    userId?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GeneralService.UnfollowPath, 'post');
    if (params) {
      rb.query('userId', params.userId, {});
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
   * unfollow user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unfollow$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unfollow(params?: {
    userId?: string;
  }): Observable<void> {

    return this.unfollow$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getFollowing
   */
  static readonly GetFollowingPath = '/api/followers/get-following';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFollowing()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFollowing$Response(params: {
    pagenum: number;
    pagesize: number;
  }): Observable<StrictHttpResponse<{
'data'?: Array<Follower>;
'totalPages'?: number;
'currentPage'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, GeneralService.GetFollowingPath, 'get');
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
        'data'?: Array<Follower>;
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
   * To access the full response (for headers, for example), `getFollowing$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFollowing(params: {
    pagenum: number;
    pagesize: number;
  }): Observable<{
'data'?: Array<Follower>;
'totalPages'?: number;
'currentPage'?: number;
}> {

    return this.getFollowing$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<Follower>;
'totalPages'?: number;
'currentPage'?: number;
}>) => r.body as {
'data'?: Array<Follower>;
'totalPages'?: number;
'currentPage'?: number;
})
    );
  }

}
