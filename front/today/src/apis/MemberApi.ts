import { MemberData } from '../types/datatype';
import { APIResponse } from '../types/datatype/apis';
import { apis, instance, responseBody } from './api';

const memberRequests = {
  get: <T>(url: string) => instance.get<APIResponse<T>>(url).then(responseBody),
};

export const Members = {
  getMembers: (): Promise<APIResponse<MemberData>> => memberRequests.get(apis.members),
  getMonthAnalysis: (date: string): Promise<APIResponse<MemberData>> => memberRequests.get(apis.analysismonth(date)),
  getDayAnalysis: (date: string): Promise<APIResponse<MemberData>> => memberRequests.get(apis.analysisday(date)),
};
