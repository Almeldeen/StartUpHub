/* tslint:disable */
/* eslint-disable */
import { Skill } from './skill';
export interface Job {
  appliedCount?: number;
  content?: string;
  endDate?: string;
  fieldId?: string;
  fieldName?: string;
  id?: string;
  postType?: string;
  questions?: Array<{
'qContent'?: string;
'qId'?: number;
}>;
  skillls?: Array<Skill>;
  startDate?: string;
  title?: string;
  userId?: string;
}
