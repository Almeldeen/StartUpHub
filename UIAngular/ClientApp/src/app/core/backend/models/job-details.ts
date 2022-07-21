/* tslint:disable */
/* eslint-disable */
import { Skill } from './skill';
export interface JobDetails {
  answers?: Array<{
'question'?: string;
'answer'?: string;
}>;
  appliedByUser?: boolean;
  appliedCount?: number;
  companyImg?: string;
  companyJobTitle?: string;
  companyName?: string;
  content?: string;
  endDate?: string;
  fieldId?: string;
  fieldName?: string;
  internEmail?: string;
  internId?: string;
  internName?: string;
  internShipId?: number;
  skills?: Array<Skill>;
  startDate?: string;
  state?: 'REJECTED' | 'ACCEPTED' | 'IN_PROGRESS' | 'PENDING';
  title?: string;
  userId?: string;
}
