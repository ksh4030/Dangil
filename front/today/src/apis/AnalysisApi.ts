//AnalysisApi.ts
import { AnalysisData } from '../types/datatype';
import { APIResponse } from '../types/datatype/apis';
import { apis, instance, responseBody } from './api';

const analysisRequests = {
  get: <T>(url: string) => instance.get<APIResponse<T>>(url).then(responseBody),
};

export const analysis = {
  // 한달 통계 불러오기 => date : 0000-00-00
  getAnalysismonth: (date: string): Promise<APIResponse<AnalysisData>> =>
    analysisRequests.get(apis.analysismonth(date)),
  // 하루 통계 불러오기 => date : 0000-00-00
  getAnalysisday: (date: string): Promise<APIResponse<AnalysisData>> => analysisRequests.get(apis.analysisday(date)),
};
