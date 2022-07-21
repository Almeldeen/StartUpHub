/* tslint:disable */
/* eslint-disable */
export interface AppliedJobDetails {
  CV?: Blob;
  answers?: Array<{
'question'?: string;
'answer'?: string;
}>;
  id?: string;
  internId?: string;
  internImg?: string;
  internName?: string;
  internshipTitle?: string;
  status?: 'PENDING' | 'ON_PROGRESS' | 'REJECTED';
}
