/* tslint:disable */
/* eslint-disable */
export interface Notification {
  content?: string;
  createdate?: string;
  id?: number;
  jopId?: number;
  postId?: number;
  read?: boolean;
  reciverId?: string;
  senderId?: string;
  senderRole?: string;
  type?: 'NEWMSG' | 'NEWJOB' | 'CHANGSTATE' | 'FOLLOW' | 'APPLAYJOB' | 'LIKE' | 'COMMENT' | 'RATECOMMENT';
  userImg?: string;
  userName?: string;
}
