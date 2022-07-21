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

import { AddJob } from '../models/add-job';
import { CompanyProfile } from '../models/company-profile';
import { CompanySimpleJob } from '../models/company-simple-job';
import { InternUpdateProfile } from '../models/intern-update-profile';
import { Job } from '../models/job';
import { JobDetails } from '../models/job-details';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCompanyProfile
   */
  static readonly GetCompanyProfilePath = '/api/company/get-profile';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCompanyProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompanyProfile$Response(params?: {
    userId?: string;
  }): Observable<StrictHttpResponse<CompanyProfile>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.GetCompanyProfilePath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyProfile>;
      })
    );
  }

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCompanyProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompanyProfile(params?: {
    userId?: string;
  }): Observable<CompanyProfile> {

    return this.getCompanyProfile$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyProfile>) => r.body as CompanyProfile)
    );
  }

  /**
   * Path part for operation addJob
   */
  static readonly AddJobPath = '/api/company/add-job';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addJob()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addJob$Response(params?: {
    body?: AddJob
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.AddJobPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `addJob$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addJob(params?: {
    body?: AddJob
  }): Observable<void> {

    return this.addJob$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getJobs
   */
  static readonly GetJobsPath = '/api/company/get-jobs';

  /**
   * Get detailed jobs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJobs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobs$Response(params: {
    page: number;
    pageSize: number;
    companyId: string;
  }): Observable<StrictHttpResponse<{
'data'?: Array<Job>;
'totalPages'?: number;
'currentPage'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.GetJobsPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('pageSize', params.pageSize, {});
      rb.query('companyId', params.companyId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'data'?: Array<Job>;
        'totalPages'?: number;
        'currentPage'?: number;
        }>;
      })
    );
  }

  /**
   * Get detailed jobs.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getJobs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobs(params: {
    page: number;
    pageSize: number;
    companyId: string;
  }): Observable<{
'data'?: Array<Job>;
'totalPages'?: number;
'currentPage'?: number;
}> {

    return this.getJobs$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<Job>;
'totalPages'?: number;
'currentPage'?: number;
}>) => r.body as {
'data'?: Array<Job>;
'totalPages'?: number;
'currentPage'?: number;
})
    );
  }

  /**
   * Path part for operation getSimpleJobs
   */
  static readonly GetSimpleJobsPath = '/api/company/get-simple-jobs';

  /**
   * get simple jobs for table.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSimpleJobs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSimpleJobs$Response(params?: {
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<Array<CompanySimpleJob>>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.GetSimpleJobsPath, 'get');
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
        return r as StrictHttpResponse<Array<CompanySimpleJob>>;
      })
    );
  }

  /**
   * get simple jobs for table.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSimpleJobs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSimpleJobs(params?: {
    page?: number;
    pageSize?: number;
  }): Observable<Array<CompanySimpleJob>> {

    return this.getSimpleJobs$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CompanySimpleJob>>) => r.body as Array<CompanySimpleJob>)
    );
  }

  /**
   * Path part for operation deleteJob
   */
  static readonly DeleteJobPath = '/api/company/delete-job';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteJob()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJob$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.DeleteJobPath, 'delete');
    if (params) {
      rb.query('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteJob$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJob(params: {
    id: string;
  }): Observable<void> {

    return this.deleteJob$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateCompanyProfile
   */
  static readonly UpdateCompanyProfilePath = '/api/company/update-profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCompanyProfile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateCompanyProfile$Response(params?: {
    body?: InternUpdateProfile
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.UpdateCompanyProfilePath, 'post');
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
   * To access the full response (for headers, for example), `updateCompanyProfile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateCompanyProfile(params?: {
    body?: InternUpdateProfile
  }): Observable<void> {

    return this.updateCompanyProfile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDetailedRequestForCompany
   */
  static readonly GetDetailedRequestForCompanyPath = '/api/company/getapllaiedjopbyid';

  /**
   * get job details.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDetailedRequestForCompany()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailedRequestForCompany$Response(params: {
    InternShipId: number;
    internId: string;
  }): Observable<StrictHttpResponse<JobDetails>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.GetDetailedRequestForCompanyPath, 'get');
    if (params) {
      rb.query('InternShipId', params.InternShipId, {});
      rb.query('internId', params.internId, {});
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
   * To access the full response (for headers, for example), `getDetailedRequestForCompany$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailedRequestForCompany(params: {
    InternShipId: number;
    internId: string;
  }): Observable<JobDetails> {

    return this.getDetailedRequestForCompany$Response(params).pipe(
      map((r: StrictHttpResponse<JobDetails>) => r.body as JobDetails)
    );
  }

  /**
   * Path part for operation changeRequestState
   */
  static readonly ChangeRequestStatePath = '/api/company/change-state';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeRequestState()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeRequestState$Response(params: {
    internShipId: number;
    state: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS';
    internId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ChangeRequestStatePath, 'post');
    if (params) {
      rb.query('internShipId', params.internShipId, {});
      rb.query('state', params.state, {});
      rb.query('internId', params.internId, {});
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
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changeRequestState$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeRequestState(params: {
    internShipId: number;
    state: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS';
    internId: string;
  }): Observable<void> {

    return this.changeRequestState$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getJobApplicants
   */
  static readonly GetJobApplicantsPath = '/api/company/GetJobApplicants';

  /**
   * Apply to job.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJobApplicants()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobApplicants$Response(params: {
    page: number;
    pageSize: number;
    InternShipId: number;
  }): Observable<StrictHttpResponse<{
'data'?: Array<{
'jopTitle'?: string;
'fullName'?: string;
'birthday'?: string;
'college'?: string;
'cv'?: string;
'state'?: string;
'profileImage'?: string;
'availableToWork'?: boolean;
'internId'?: string;
}>;
'totalPages'?: number;
'currentPage'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.GetJobApplicantsPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('pageSize', params.pageSize, {});
      rb.query('InternShipId', params.InternShipId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'data'?: Array<{
        'jopTitle'?: string;
        'fullName'?: string;
        'birthday'?: string;
        'college'?: string;
        'cv'?: string;
        'state'?: string;
        'profileImage'?: string;
        'availableToWork'?: boolean;
        'internId'?: string;
        }>;
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
   * To access the full response (for headers, for example), `getJobApplicants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobApplicants(params: {
    page: number;
    pageSize: number;
    InternShipId: number;
  }): Observable<{
'data'?: Array<{
'jopTitle'?: string;
'fullName'?: string;
'birthday'?: string;
'college'?: string;
'cv'?: string;
'state'?: string;
'profileImage'?: string;
'availableToWork'?: boolean;
'internId'?: string;
}>;
'totalPages'?: number;
'currentPage'?: number;
}> {

    return this.getJobApplicants$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<{
'jopTitle'?: string;
'fullName'?: string;
'birthday'?: string;
'college'?: string;
'cv'?: string;
'state'?: string;
'profileImage'?: string;
'availableToWork'?: boolean;
'internId'?: string;
}>;
'totalPages'?: number;
'currentPage'?: number;
}>) => r.body as {
'data'?: Array<{
'jopTitle'?: string;
'fullName'?: string;
'birthday'?: string;
'college'?: string;
'cv'?: string;
'state'?: string;
'profileImage'?: string;
'availableToWork'?: boolean;
'internId'?: string;
}>;
'totalPages'?: number;
'currentPage'?: number;
})
    );
  }

}
