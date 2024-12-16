import { DeviceToken, NoticeData, PatchNoticeData } from '../types/datatype';
import { APIResponse } from '../types/datatype/apis';
import { apis, instance, responseBody } from './api';

const noticeRequests = {
  get: <T>(url: string) => instance.get<APIResponse<T>>(url).then(responseBody),
  post: <T>(url: string, body: any) => instance.post<APIResponse<T>>(url, body).then(responseBody),
  patch: <T>(url: string, body?: any) => instance.patch<APIResponse<T>>(url, body).then(responseBody),
  delete: <T>(url: string) => instance.delete<APIResponse<T>>(url).then(responseBody),
};

export const Notices = {
  //   알림 조회
  getNotices: (): Promise<APIResponse<NoticeData[]>> => noticeRequests.get(apis.notice),
  //   알림 확인 여부
  checkNotices: (check: PatchNoticeData): Promise<APIResponse<NoticeData[]>> =>
    noticeRequests.patch(apis.notice, check),

  // 알림 삭제
  deleteNotices: (noticeId: number): Promise<APIResponse<NoticeData>> =>
    noticeRequests.delete(apis.deleteNotice(noticeId)),
  // 디바이스 토큰 전송
  postToken: (token: DeviceToken): Promise<APIResponse<DeviceToken>> => noticeRequests.post(apis.noticeToken, token),
};
