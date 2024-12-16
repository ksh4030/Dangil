import { CalendarData, SearchData, SearchWord } from '../types/datatype';
import { APIResponse } from '../types/datatype/apis';
import { apis, instance, responseBody } from './api';

const calendarRequests = {
  get: <T>(url: string) => instance.get<APIResponse<T>>(url).then(responseBody),
  post: <T>(url: string, body: any) => instance.post<APIResponse<T>>(url, body).then(responseBody),
};

export const Calendars = {
  // 한달 일기 모두 가져오기 => date : 0000-00-00
  getCalendars: (date: string): Promise<APIResponse<CalendarData[]>> => calendarRequests.get(apis.month(date)),
  // 하루 일기 모두 가져오기 => date : 0000-00-00
  getCalendar: (date: string): Promise<APIResponse<CalendarData[]>> => calendarRequests.get(apis.day(date)),
  // 검색
  Search: (search: SearchWord): Promise<APIResponse<SearchData[]>> => calendarRequests.post(apis.search, search),
};
