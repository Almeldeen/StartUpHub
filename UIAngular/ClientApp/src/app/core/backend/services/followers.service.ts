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

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class FollowersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPeopleToFollow
   */
  static readonly GetPeopleToFollowPath = '/api/followers/get-people-to-follow';

  /**
   * Get people to follow.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPeopleToFollow()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPeopleToFollow$Response(params: {
    pagenum: number;
    pagesize: number;
  }): Observable<StrictHttpResponse<{
'data'?: Array<User>;
'totalPages'?: number;
'currentPage'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, FollowersService.GetPeopleToFollowPath, 'get');
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
        'data'?: Array<User>;
        'totalPages'?: number;
        'currentPage'?: number;
        }>;
      })
    );
  }

  /**
   * Get people to follow.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPeopleToFollow$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPeopleToFollow(params: {
    pagenum: number;
    pagesize: number;
  }): Observable<{
'data'?: Array<User>;
'totalPages'?: number;
'currentPage'?: number;
}> {

    return this.getPeopleToFollow$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<User>;
'totalPages'?: number;
'currentPage'?: number;
}>) => r.body as {
'data'?: Array<User>;
'totalPages'?: number;
'currentPage'?: number;
})
    );
  }

}
