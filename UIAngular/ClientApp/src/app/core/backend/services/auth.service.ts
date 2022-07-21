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

import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation register
   */
  static readonly RegisterPath = '/api/auth/Register';

  /**
   * Registration.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params?: {
    body?: Account
  }): Observable<StrictHttpResponse<{
'id'?: string;
'role'?: string;
'mobile'?: string;
'username'?: string;
'message'?: string;
'emailConfirmToken'?: string;
'isAuthenticated'?: string;
'isConfirmed'?: string;
'fullName'?: string;
'address'?: string;
'image'?: string;
'expiresOn'?: string;
'token'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.RegisterPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'id'?: string;
        'role'?: string;
        'mobile'?: string;
        'username'?: string;
        'message'?: string;
        'emailConfirmToken'?: string;
        'isAuthenticated'?: string;
        'isConfirmed'?: string;
        'fullName'?: string;
        'address'?: string;
        'image'?: string;
        'expiresOn'?: string;
        'token'?: string;
        }>;
      })
    );
  }

  /**
   * Registration.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params?: {
    body?: Account
  }): Observable<{
'id'?: string;
'role'?: string;
'mobile'?: string;
'username'?: string;
'message'?: string;
'emailConfirmToken'?: string;
'isAuthenticated'?: string;
'isConfirmed'?: string;
'fullName'?: string;
'address'?: string;
'image'?: string;
'expiresOn'?: string;
'token'?: string;
}> {

    return this.register$Response(params).pipe(
      map((r: StrictHttpResponse<{
'id'?: string;
'role'?: string;
'mobile'?: string;
'username'?: string;
'message'?: string;
'emailConfirmToken'?: string;
'isAuthenticated'?: string;
'isConfirmed'?: string;
'fullName'?: string;
'address'?: string;
'image'?: string;
'expiresOn'?: string;
'token'?: string;
}>) => r.body as {
'id'?: string;
'role'?: string;
'mobile'?: string;
'username'?: string;
'message'?: string;
'emailConfirmToken'?: string;
'isAuthenticated'?: string;
'isConfirmed'?: string;
'fullName'?: string;
'address'?: string;
'image'?: string;
'expiresOn'?: string;
'token'?: string;
})
    );
  }

  /**
   * Path part for operation changePassword
   */
  static readonly ChangePasswordPath = '/api/auth/ChangePassword';

  /**
   * Update pass.
   *
   * update password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  changePassword$Response(params: {
    newPassword: string;
    oldPassword: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ChangePasswordPath, 'post');
    if (params) {
      rb.query('newPassword', params.newPassword, {});
      rb.query('oldPassword', params.oldPassword, {});
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
   * Update pass.
   *
   * update password
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changePassword(params: {
    newPassword: string;
    oldPassword: string;
  }): Observable<void> {

    return this.changePassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAccount
   */
  static readonly GetAccountPath = '/api/auth/account';

  /**
   * get account.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccount$Response(params?: {
  }): Observable<StrictHttpResponse<Account>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.GetAccountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Account>;
      })
    );
  }

  /**
   * get account.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccount(params?: {
  }): Observable<Account> {

    return this.getAccount$Response(params).pipe(
      map((r: StrictHttpResponse<Account>) => r.body as Account)
    );
  }

  /**
   * Path part for operation isLogged
   */
  static readonly IsLoggedPath = '/api/auth/islogged';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isLogged()` instead.
   *
   * This method doesn't expect any request body.
   */
  isLogged$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.IsLoggedPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `isLogged$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isLogged(params?: {
  }): Observable<void> {

    return this.isLogged$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/api/auth/login';

  /**
   * loginn.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params?: {
    body?: {
'email'?: string;
'password'?: string;
}
  }): Observable<StrictHttpResponse<{
'token'?: string;
'message'?: string;
'emailConfirmToken'?: string;
'isConfirmed'?: boolean;
'isAuthenticated'?: boolean;
'fullName'?: string;
'mobile'?: string;
'address'?: string;
'image'?: string;
'role'?: string;
'expiresOn'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'token'?: string;
        'message'?: string;
        'emailConfirmToken'?: string;
        'isConfirmed'?: boolean;
        'isAuthenticated'?: boolean;
        'fullName'?: string;
        'mobile'?: string;
        'address'?: string;
        'image'?: string;
        'role'?: string;
        'expiresOn'?: string;
        }>;
      })
    );
  }

  /**
   * loginn.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params?: {
    body?: {
'email'?: string;
'password'?: string;
}
  }): Observable<{
'token'?: string;
'message'?: string;
'emailConfirmToken'?: string;
'isConfirmed'?: boolean;
'isAuthenticated'?: boolean;
'fullName'?: string;
'mobile'?: string;
'address'?: string;
'image'?: string;
'role'?: string;
'expiresOn'?: string;
}> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<{
'token'?: string;
'message'?: string;
'emailConfirmToken'?: string;
'isConfirmed'?: boolean;
'isAuthenticated'?: boolean;
'fullName'?: string;
'mobile'?: string;
'address'?: string;
'image'?: string;
'role'?: string;
'expiresOn'?: string;
}>) => r.body as {
'token'?: string;
'message'?: string;
'emailConfirmToken'?: string;
'isConfirmed'?: boolean;
'isAuthenticated'?: boolean;
'fullName'?: string;
'mobile'?: string;
'address'?: string;
'image'?: string;
'role'?: string;
'expiresOn'?: string;
})
    );
  }

  /**
   * Path part for operation confirmEmail
   */
  static readonly ConfirmEmailPath = '/api/auth/ConfirmEmail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirmEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirmEmail$Response(params?: {
    token?: string;
    email?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ConfirmEmailPath, 'post');
    if (params) {
      rb.query('token', params.token, {});
      rb.query('email', params.email, {});
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
   * To access the full response (for headers, for example), `confirmEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirmEmail(params?: {
    token?: string;
    email?: string;
  }): Observable<void> {

    return this.confirmEmail$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
