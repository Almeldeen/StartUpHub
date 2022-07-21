/* tslint:disable */
/* eslint-disable */
import { Field } from './field';
import { Skill } from './skill';
export interface InternProfile {
  about?: string;
  address?: string;
  availableToWork?: boolean;
  birthdate?: string;
  coverImg?: string;
  cv?: Blob;
  education?: (Array<{
'school'?: string;
'degree'?: string;
'fieldOfStudy'?: string;
'startDate'?: string;
'endDate'?: string;
'studentActivities'?: string;
}> | string);
  field?: Field;
  followedHim?: boolean;
  followedMe?: boolean;
  followersCount?: number;
  followingCount?: number;
  fullName?: string;
  interenId?: string;
  jobTitle?: string;
  mobile?: string;
  role?: 'COMPANY';
  skills?: Array<Skill>;
  userImg?: string;
  userRole?: string;
}
