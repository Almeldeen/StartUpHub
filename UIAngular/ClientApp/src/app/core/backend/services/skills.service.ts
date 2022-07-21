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

import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root',
})
export class SkillsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation editSkills
   */
  static readonly EditSkillsPath = '/api/skills/EditSkills';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editSkills()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editSkills$Response(params?: {
    body?: Skill
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SkillsService.EditSkillsPath, 'put');
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
   * To access the full response (for headers, for example), `editSkills$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editSkills(params?: {
    body?: Skill
  }): Observable<void> {

    return this.editSkills$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postSkills
   */
  static readonly PostSkillsPath = '/api/skills/post-skills';

  /**
   * add skills.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSkills()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSkills$Response(params?: {
    body?: Array<Skill>
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SkillsService.PostSkillsPath, 'post');
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
   * add skills.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSkills$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSkills(params?: {
    body?: Array<Skill>
  }): Observable<void> {

    return this.postSkills$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteSkill
   */
  static readonly DeleteSkillPath = '/api/skills/DeleteSkill';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSkill()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteSkill$Response(params?: {
    Id?: number;
    body?: {
}
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SkillsService.DeleteSkillPath, 'delete');
    if (params) {
      rb.query('Id', params.Id, {});
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
   * To access the full response (for headers, for example), `deleteSkill$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteSkill(params?: {
    Id?: number;
    body?: {
}
  }): Observable<void> {

    return this.deleteSkill$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getByIdSkill
   */
  static readonly GetByIdSkillPath = '/api/Skills/GetByIdSkill';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByIdSkill()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByIdSkill$Response(params?: {
    Id?: number;
  }): Observable<StrictHttpResponse<Skill>> {

    const rb = new RequestBuilder(this.rootUrl, SkillsService.GetByIdSkillPath, 'get');
    if (params) {
      rb.query('Id', params.Id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Skill>;
      })
    );
  }

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByIdSkill$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByIdSkill(params?: {
    Id?: number;
  }): Observable<Skill> {

    return this.getByIdSkill$Response(params).pipe(
      map((r: StrictHttpResponse<Skill>) => r.body as Skill)
    );
  }

  /**
   * Path part for operation getAllSkills
   */
  static readonly GetAllSkillsPath = '/api/skills/GetAllSkills';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSkills()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSkills$Response(params: {
    page: number;
    pageSize: number;
    fieldId?: number;
  }): Observable<StrictHttpResponse<{
'data'?: Array<Skill>;
'totalPages'?: number;
'currentPages'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, SkillsService.GetAllSkillsPath, 'get');
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
        'data'?: Array<Skill>;
        'totalPages'?: number;
        'currentPages'?: number;
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
   * To access the full response (for headers, for example), `getAllSkills$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSkills(params: {
    page: number;
    pageSize: number;
    fieldId?: number;
  }): Observable<{
'data'?: Array<Skill>;
'totalPages'?: number;
'currentPages'?: number;
}> {

    return this.getAllSkills$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<Skill>;
'totalPages'?: number;
'currentPages'?: number;
}>) => r.body as {
'data'?: Array<Skill>;
'totalPages'?: number;
'currentPages'?: number;
})
    );
  }

}
