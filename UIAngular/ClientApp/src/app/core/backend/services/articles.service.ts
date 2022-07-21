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

import { Comment } from '../models/comment';
import { TimelineArticle } from '../models/timeline-article';
import { TimelineJob } from '../models/timeline-job';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateComment
   */
  static readonly UpdateCommentPath = '/api/posts/EditComment';

  /**
   * Update comment.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateComment$Response(params: {
    PostId: number;
    commentId: number;
    Cotent: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UpdateCommentPath, 'put');
    if (params) {
      rb.query('PostId', params.PostId, {});
      rb.query('commentId', params.commentId, {});
      rb.query('Cotent', params.Cotent, {});
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
   * Update comment.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateComment(params: {
    PostId: number;
    commentId: number;
    Cotent: string;
  }): Observable<void> {

    return this.updateComment$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteComment
   */
  static readonly DeleteCommentPath = '/api/posts/DeletComment';

  /**
   * Delete comment.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComment$Response(params: {
    PostId: number;
    commentId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.DeleteCommentPath, 'delete');
    if (params) {
      rb.query('PostId', params.PostId, {});
      rb.query('commentId', params.commentId, {});
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
   * Delete comment.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComment(params: {
    PostId: number;
    commentId: number;
  }): Observable<void> {

    return this.deleteComment$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation rateComment
   */
  static readonly RateCommentPath = '/api/posts/RateComment';

  /**
   * Delete comment.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rateComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  rateComment$Response(params: {
    PostId: number;
    commentId: number;
    type: 'UP' | 'DOWN' | 'NONE';
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.RateCommentPath, 'put');
    if (params) {
      rb.query('PostId', params.PostId, {});
      rb.query('commentId', params.commentId, {});
      rb.query('type', params.type, {});
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
   * Delete comment.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `rateComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rateComment(params: {
    PostId: number;
    commentId: number;
    type: 'UP' | 'DOWN' | 'NONE';
  }): Observable<void> {

    return this.rateComment$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addComment
   */
  static readonly AddCommentPath = '/api/posts/Comment';

  /**
   * add comment.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  addComment$Response(params: {
    Cotent: string;
    PostId: number;
  }): Observable<StrictHttpResponse<Comment>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.AddCommentPath, 'post');
    if (params) {
      rb.query('Cotent', params.Cotent, {});
      rb.query('PostId', params.PostId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Comment>;
      })
    );
  }

  /**
   * add comment.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addComment(params: {
    Cotent: string;
    PostId: number;
  }): Observable<Comment> {

    return this.addComment$Response(params).pipe(
      map((r: StrictHttpResponse<Comment>) => r.body as Comment)
    );
  }

  /**
   * Path part for operation postArticle
   */
  static readonly PostArticlePath = '/api/posts/AddPost';

  /**
   * Post article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postArticle()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  postArticle$Response(params?: {
    body?: {
'Content': string;
'PostImage': (Array<Blob> | string);
'FieldId': number;
}
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.PostArticlePath, 'post');
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
   * Post article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postArticle$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  postArticle(params?: {
    body?: {
'Content': string;
'PostImage': (Array<Blob> | string);
'FieldId': number;
}
  }): Observable<void> {

    return this.postArticle$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updatePost
   */
  static readonly UpdatePostPath = '/api/posts/updatePost';

  /**
   * Update post.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updatePost$Response(params?: {
    body?: {
'Content': string;
'PostImage': (Array<Blob> | {
});
'FieldId': number;
'postId': number;
}
  }): Observable<StrictHttpResponse<TimelineArticle>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UpdatePostPath, 'put');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TimelineArticle>;
      })
    );
  }

  /**
   * Update post.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updatePost(params?: {
    body?: {
'Content': string;
'PostImage': (Array<Blob> | {
});
'FieldId': number;
'postId': number;
}
  }): Observable<TimelineArticle> {

    return this.updatePost$Response(params).pipe(
      map((r: StrictHttpResponse<TimelineArticle>) => r.body as TimelineArticle)
    );
  }

  /**
   * Path part for operation deleteArticle
   */
  static readonly DeleteArticlePath = '/api/posts/deletePost';

  /**
   * Delete article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.DeleteArticlePath, 'delete');
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
   * Delete article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle(params: {
    id: number;
  }): Observable<void> {

    return this.deleteArticle$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation likeArticle
   */
  static readonly LikeArticlePath = '/api/posts/like';

  /**
   * Like article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `likeArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  likeArticle$Response(params: {

    /**
     * article ID
     */
    PostId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.LikeArticlePath, 'post');
    if (params) {
      rb.query('PostId', params.PostId, {});
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
   * Like article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `likeArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  likeArticle(params: {

    /**
     * article ID
     */
    PostId: number;
  }): Observable<void> {

    return this.likeArticle$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation dislikeArticle
   */
  static readonly DislikeArticlePath = '/api/posts/DisLike';

  /**
   * Dislike article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dislikeArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  dislikeArticle$Response(params: {
    PostId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.DislikeArticlePath, 'delete');
    if (params) {
      rb.query('PostId', params.PostId, {});
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
   * Dislike article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dislikeArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dislikeArticle(params: {
    PostId: number;
  }): Observable<void> {

    return this.dislikeArticle$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getUserArticles
   */
  static readonly GetUserArticlesPath = '/api/posts/get-user-articles';

  /**
   * get articles for user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserArticles$Response(params: {
    page: number;
    pageSize: number;
    userId?: string;
  }): Observable<StrictHttpResponse<{
'data'?: Array<TimelineArticle>;
'totalPages'?: number;
'currentPage'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetUserArticlesPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('pageSize', params.pageSize, {});
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'data'?: Array<TimelineArticle>;
        'totalPages'?: number;
        'currentPage'?: number;
        }>;
      })
    );
  }

  /**
   * get articles for user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserArticles(params: {
    page: number;
    pageSize: number;
    userId?: string;
  }): Observable<{
'data'?: Array<TimelineArticle>;
'totalPages'?: number;
'currentPage'?: number;
}> {

    return this.getUserArticles$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<TimelineArticle>;
'totalPages'?: number;
'currentPage'?: number;
}>) => r.body as {
'data'?: Array<TimelineArticle>;
'totalPages'?: number;
'currentPage'?: number;
})
    );
  }

  /**
   * Path part for operation getArticleDetails
   */
  static readonly GetArticleDetailsPath = '/api/posts/get-post-details';

  /**
   * get article details.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticleDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleDetails$Response(params: {
    postId: number;
  }): Observable<StrictHttpResponse<TimelineArticle>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetArticleDetailsPath, 'get');
    if (params) {
      rb.query('postId', params.postId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TimelineArticle>;
      })
    );
  }

  /**
   * get article details.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticleDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleDetails(params: {
    postId: number;
  }): Observable<TimelineArticle> {

    return this.getArticleDetails$Response(params).pipe(
      map((r: StrictHttpResponse<TimelineArticle>) => r.body as TimelineArticle)
    );
  }

  /**
   * Path part for operation getComments
   */
  static readonly GetCommentsPath = '/api/posts/get-comments';

  /**
   * get comments.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComments$Response(params: {
    page: number;
    pageSize: number;
    PostId: number;
  }): Observable<StrictHttpResponse<{
'data'?: Array<Comment>;
'totalPages'?: number;
'currentPage'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetCommentsPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('pageSize', params.pageSize, {});
      rb.query('PostId', params.PostId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'data'?: Array<Comment>;
        'totalPages'?: number;
        'currentPage'?: number;
        }>;
      })
    );
  }

  /**
   * get comments.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComments(params: {
    page: number;
    pageSize: number;
    PostId: number;
  }): Observable<{
'data'?: Array<Comment>;
'totalPages'?: number;
'currentPage'?: number;
}> {

    return this.getComments$Response(params).pipe(
      map((r: StrictHttpResponse<{
'data'?: Array<Comment>;
'totalPages'?: number;
'currentPage'?: number;
}>) => r.body as {
'data'?: Array<Comment>;
'totalPages'?: number;
'currentPage'?: number;
})
    );
  }

  /**
   * Path part for operation getTimelineArticles
   */
  static readonly GetTimelineArticlesPath = '/api/posts/get-timeline-articles';

  /**
   * Your GET endpoint.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTimelineArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTimelineArticles$Response(params?: {
    page?: number;
    pageSize?: number;
  }): Observable<StrictHttpResponse<{
'posts'?: Array<TimelineArticle>;
'jops'?: Array<TimelineJob>;
'totalPages'?: number;
'currentPage'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetTimelineArticlesPath, 'get');
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
        return r as StrictHttpResponse<{
        'posts'?: Array<TimelineArticle>;
        'jops'?: Array<TimelineJob>;
        'totalPages'?: number;
        'currentPage'?: string;
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
   * To access the full response (for headers, for example), `getTimelineArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTimelineArticles(params?: {
    page?: number;
    pageSize?: number;
  }): Observable<{
'posts'?: Array<TimelineArticle>;
'jops'?: Array<TimelineJob>;
'totalPages'?: number;
'currentPage'?: string;
}> {

    return this.getTimelineArticles$Response(params).pipe(
      map((r: StrictHttpResponse<{
'posts'?: Array<TimelineArticle>;
'jops'?: Array<TimelineJob>;
'totalPages'?: number;
'currentPage'?: string;
}>) => r.body as {
'posts'?: Array<TimelineArticle>;
'jops'?: Array<TimelineJob>;
'totalPages'?: number;
'currentPage'?: string;
})
    );
  }

}
