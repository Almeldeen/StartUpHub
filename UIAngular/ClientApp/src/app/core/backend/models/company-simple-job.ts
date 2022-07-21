/* tslint:disable */
/* eslint-disable */
export interface CompanySimpleJob {
  id?: string;
  newTicketsCount?: number;
  onProgressRequests?: number;
  pendingRequests?: number;
  status?: 'OPEN' | 'CLOSED';
  title?: string;
}
