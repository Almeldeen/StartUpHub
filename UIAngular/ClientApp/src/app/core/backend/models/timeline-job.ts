/* tslint:disable */
/* eslint-disable */
import { Skill } from './skill';
export interface TimelineJob {
  appliedByUser?: boolean;
  appliedCount?: number;
  companyImg?: string;
  companyJobTitle?: string;
  companyName?: string;
  content?: string;
  endDate?: string;
  fieldId?: string;
  fieldName?: string;
  id?: number;
  questions?: Array<{
'qContent'?: string;
'qId'?: string;
'internShipId'?: string;
}>;
  skills?: Array<Skill>;
  startDate?: string;
  status?: 'OPEN' | 'CLOSED';
  title?: string;
  userId?: string;
}
