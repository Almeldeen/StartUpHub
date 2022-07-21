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

import { CompanySimpleStats } from '../models/company-simple-stats';
import { InternSimpleStats } from '../models/intern-simple-stats';
import { TimelineJob } from '../models/timeline-job';

@Injectable({
  providedIn: 'root',
})
export class TimelineService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation companySimpleStats
   */
  static readonly CompanySimpleStatsPath = '/api/company/simple-stats';

  /**
   * get-simple-stats.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companySimpleStats()` instead.
   *
   * This method doesn't expect any request body.
   */
  companySimpleStats$Response(params?: {
  }): Observable<StrictHttpResponse<CompanySimpleStats>> {

    const rb = new RequestBuilder(this.rootUrl, TimelineService.CompanySimpleStatsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanySimpleStats>;
      })
    );
  }

  /**
   * get-simple-stats.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `companySimpleStats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  companySimpleStats(params?: {
  }): Observable<CompanySimpleStats> {

    return this.companySimpleStats$Response(params).pipe(
      map((r: StrictHttpResponse<CompanySimpleStats>) => r.body as CompanySimpleStats)
    );
  }

  /**
   * Path part for operation getTimelineJobs
   */
  static readonly GetTimelineJobsPath = '/api/timeline/get-jobs';

  /**
   * Get all jobs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTimelineJobs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTimelineJobs$Response(params?: {
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<TimelineJob>>> {

    const rb = new RequestBuilder(this.rootUrl, TimelineService.GetTimelineJobsPath, 'get');
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
        return r as StrictHttpResponse<Array<TimelineJob>>;
      })
    );
  }

  /**
   * Get all jobs.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTimelineJobs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTimelineJobs(params?: {
    page?: number;
    pageSize?: number;
  }): Observable<Array<TimelineJob>> {

    return this.getTimelineJobs$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TimelineJob>>) => r.body as Array<TimelineJob>)
    );
  }

  /**
   * Path part for operation internSimpleStats
   */
  static readonly InternSimpleStatsPath = '/api/intern/simple-stats';

  /**
   * get-simple-stats.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `internSimpleStats()` instead.
   *
   * This method doesn't expect any request body.
   */
  internSimpleStats$Response(params?: {
  }): Observable<StrictHttpResponse<InternSimpleStats>> {

    const rb = new RequestBuilder(this.rootUrl, TimelineService.InternSimpleStatsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InternSimpleStats>;
      })
    );
  }

  /**
   * get-simple-stats.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `internSimpleStats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  internSimpleStats(params?: {
  }): Observable<InternSimpleStats> {

    return this.internSimpleStats$Response(params).pipe(
      map((r: StrictHttpResponse<InternSimpleStats>) => r.body as InternSimpleStats)
    );
  }

}
