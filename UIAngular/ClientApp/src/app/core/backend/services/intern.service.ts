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

import { InternProfile } from '../models/intern-profile';
import { InternUpdateProfile } from '../models/intern-update-profile';
import { JobDetails } from '../models/job-details';
import { TimelineJob } from '../models/timeline-job';

@Injectable({
  providedIn: 'root',
})
export class InternService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateInternProfile
   */
  static readonly UpdateInternProfilePath = '/api/intern/update-profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateInternProfile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateInternProfile$Response(params?: {
    body?: InternUpdateProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, InternService.UpdateInternProfilePath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateInternProfile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateInternProfile(params?: {
    body?: InternUpdateProfile
  }): Observable<void> {

    return this.updateInternProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getInternProfile
   */
  static readonly GetInternProfilePath = '/api/intern/get-profile';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInternProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInternProfile$Response(params?: {
    userId?: string;
  }): Observable<StrictHttpResponse<InternProfile>> {

    const rb = new RequestBuilder(this.rootUrl, InternService.GetInternProfilePath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InternProfile>;
      })
    );
  }

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInternProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInternProfile(params?: {
    userId?: string;
  }): Observable<InternProfile> {

    return this.getInternProfile$Response(params).pipe(
      map((r: StrictHttpResponse<InternProfile>) => r.body as InternProfile)
    );
  }

  /**
   * Path part for operation applyToJob
   */
  static readonly ApplyToJobPath = '/api/intern/applyjop';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `applyToJob()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  applyToJob$Response(params?: {
    body?: {
'InternShipId'?: number;
'answers'?: Array<{
'qId'?: number;
'answer'?: string;
}>;
}
  }): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, InternService.ApplyToJobPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/xml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
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
   * To access the full response (for headers, for example), `applyToJob$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  applyToJob(params?: {
    body?: {
'InternShipId'?: number;
'answers'?: Array<{
'qId'?: number;
'answer'?: string;
}>;
}
  }): Observable<{
}> {

    return this.applyToJob$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation getDetailedApplicationById
   */
  static readonly GetDetailedApplicationByIdPath = '/api/intern/getapllaiedjopbyid';

  /**
   * get job details.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDetailedApplicationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailedApplicationById$Response(params: {
    InternShipId: number;
  }): Observable<StrictHttpResponse<JobDetails>> {

    const rb = new RequestBuilder(this.rootUrl, InternService.GetDetailedApplicationByIdPath, 'get');
    if (params) {
      rb.query('InternShipId', params.InternShipId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<JobDetails>;
      })
    );
  }

  /**
   * get job details.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDetailedApplicationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailedApplicationById(params: {
    InternShipId: number;
  }): Observable<JobDetails> {

    return this.getDetailedApplicationById$Response(params).pipe(
      map((r: StrictHttpResponse<JobDetails>) => r.body as JobDetails)
    );
  }

  /**
   * Path part for operation cancelRequest
   */
  static readonly CancelRequestPath = '/api/intern/cancel-request';

  /**
   * Apply to job.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelRequest()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelRequest$Response(params: {
    internShipId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, InternService.CancelRequestPath, 'post');
    if (params) {
      rb.query('internShipId', params.internShipId, {});
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
   * Apply to job.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cancelRequest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelRequest(params: {
    internShipId: number;
  }): Observable<void> {

    return this.cancelRequest$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAppliedJobs
   */
  static readonly GetAppliedJobsPath = '/api/intern/getapplaiedjops ';

  /**
   * Apply to job.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAppliedJobs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAppliedJobs$Response(params?: {
  }): Observable<StrictHttpResponse<Array<{
'internShipId'?: number;
'internId'?: number;
'state'?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS';
'title'?: string;
'companyName'?: string;
'userId'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, InternService.GetAppliedJobsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        'internShipId'?: number;
        'internId'?: number;
        'state'?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS';
        'title'?: string;
        'companyName'?: string;
        'userId'?: string;
        }>>;
      })
    );
  }

  /**
   * Apply to job.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAppliedJobs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAppliedJobs(params?: {
  }): Observable<Array<{
'internShipId'?: number;
'internId'?: number;
'state'?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS';
'title'?: string;
'companyName'?: string;
'userId'?: string;
}>> {

    return this.getAppliedJobs$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{
'internShipId'?: number;
'internId'?: number;
'state'?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS';
'title'?: string;
'companyName'?: string;
'userId'?: string;
}>>) => r.body as Array<{
'internShipId'?: number;
'internId'?: number;
'state'?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS';
'title'?: string;
'companyName'?: string;
'userId'?: string;
}>)
    );
  }

  /**
   * Path part for operation searchJobs
   */
  static readonly SearchJobsPath = '/api/intern/SearchJobs';

  /**
   * Apply to job.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchJobs()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchJobs$Response(params: {
    page: number;
    pageSize: number;
    fieldId?: number;
  }): Observable<StrictHttpResponse<{
'data'?: Array<TimelineJob>;
'totalPages'?: number;
'currentPage'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, InternService.SearchJobsPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('pageSize', params.pageSize, {});
      rb.query('fieldId', params.fieldId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'data'?: Array<TimelineJob>;
        'totalPages'?: number;
        'currentPage'?: number;
        }>;
      })
    );
  }

  /**
   * Apply to job.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `searchJobs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchJobs(params: {
    page: number;
    pageSize: number;
    fieldId?: number;
  }): Observable<{
'data'?: Array<TimelineJob>;
'totalPages'?: number;
'currentPage'?: number;
}> {

    return this.searchJobs$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<TimelineJob>;
'totalPages'?: number;
'currentPage'?: number;
}>) => r.body as {
'data'?: Array<TimelineJob>;
'totalPages'?: number;
'currentPage'?: number;
})
    );
  }

}
