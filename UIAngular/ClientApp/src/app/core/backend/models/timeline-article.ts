/* tslint:disable */
/* eslint-disable */
export interface TimelineArticle {
  commentsCount?: number;
  content?: string;
  createdDate?: string;
  fieldId?: number;
  fieldName?: string;
  id?: number;
  images?: (Array<string> | string);
  likedByUser?: boolean;
  likesCount?: number;
  postType?: 'JOB' | 'ARTICLE';
  status?: 'PUBLISHED' | 'SUSPENDED';
  userFullName?: string;
  userId?: string;
  userImg?: string;
  userJobTitle?: string;
  userRole?: string;
}
