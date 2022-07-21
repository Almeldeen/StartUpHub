/* tslint:disable */
/* eslint-disable */
export interface InternUpdateProfile {
  about?: string;
  address?: string;
  availableToWork?: boolean;
  birthdate?: string;
  cv?: Blob;
  education?: (Array<{
'school'?: string;
'degree'?: string;
'fieldOfStudy'?: string;
'startDate'?: string;
'endDate'?: string;
'studentActivities'?: string;
}> | string);
  fieldId?: ({
} | {
});
  fullName?: string;
  jobTitle?: string;
  mobile?: string;
  skills?: (Array<number> | string);
}
