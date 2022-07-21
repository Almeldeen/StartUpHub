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

import { TimelineJob } from '../models/timeline-job';

@Injectable({
  providedIn: 'root',
})
export class JobsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getJobDetails
   */
  static readonly GetJobDetailsPath = '/api/company/GetJopDetails';

  /**
   * Job details.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJobDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobDetails$Response(params: {
    jopId: number;
  }): Observable<StrictHttpResponse<TimelineJob>> {

    const rb = new RequestBuilder(this.rootUrl, JobsService.GetJobDetailsPath, 'get');
    if (params) {
      rb.query('jopId', params.jopId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TimelineJob>;
      })
    );
  }

  /**
   * Job details.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getJobDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobDetails(params: {
    jopId: number;
  }): Observable<TimelineJob> {

    return this.getJobDetails$Response(params).pipe(
      map((r: StrictHttpResponse<TimelineJob>) => r.body as TimelineJob)
    );
  }

}
