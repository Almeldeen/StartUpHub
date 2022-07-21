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

import { Field } from '../models/field';

@Injectable({
  providedIn: 'root',
})
export class FieldsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getFields
   */
  static readonly GetFieldsPath = '/api/fields/GetAllField';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFields()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFields$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Field>>> {

    const rb = new RequestBuilder(this.rootUrl, FieldsService.GetFieldsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Field>>;
      })
    );
  }

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFields$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFields(params?: {
  }): Observable<Array<Field>> {

    return this.getFields$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Field>>) => r.body as Array<Field>)
    );
  }

  /**
   * Path part for operation postApiFieldsAddFields
   */
  static readonly PostApiFieldsAddFieldsPath = '/api/fields/AddField';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postApiFieldsAddFields()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApiFieldsAddFields$Response(params?: {
    body?: Array<Field>
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FieldsService.PostApiFieldsAddFieldsPath, 'post');
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
   * To access the full response (for headers, for example), `postApiFieldsAddFields$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postApiFieldsAddFields(params?: {
    body?: Array<Field>
  }): Observable<void> {

    return this.postApiFieldsAddFields$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getApiFieldsGetByIdField
   */
  static readonly GetApiFieldsGetByIdFieldPath = '/api/fields/GetByIdField';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApiFieldsGetByIdField()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApiFieldsGetByIdField$Response(params?: {
    Id?: number;
  }): Observable<StrictHttpResponse<Field>> {

    const rb = new RequestBuilder(this.rootUrl, FieldsService.GetApiFieldsGetByIdFieldPath, 'get');
    if (params) {
      rb.query('Id', params.Id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Field>;
      })
    );
  }

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApiFieldsGetByIdField$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApiFieldsGetByIdField(params?: {
    Id?: number;
  }): Observable<Field> {

    return this.getApiFieldsGetByIdField$Response(params).pipe(
      map((r: StrictHttpResponse<Field>) => r.body as Field)
    );
  }

  /**
   * Path part for operation deleteField
   */
  static readonly DeleteFieldPath = '/api/fields/DeleteField';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteField()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteField$Response(params?: {
    Id?: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FieldsService.DeleteFieldPath, 'delete');
    if (params) {
      rb.query('Id', params.Id, {});
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
   * To access the full response (for headers, for example), `deleteField$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteField(params?: {
    Id?: number;
  }): Observable<void> {

    return this.deleteField$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation editFeild
   */
  static readonly EditFeildPath = '/api/fields/EditFeild';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editFeild()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editFeild$Response(params?: {
    body?: Field
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FieldsService.EditFeildPath, 'put');
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
   * To access the full response (for headers, for example), `editFeild$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editFeild(params?: {
    body?: Field
  }): Observable<void> {

    return this.editFeild$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
