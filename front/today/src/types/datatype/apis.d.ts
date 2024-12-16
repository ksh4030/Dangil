export interface Apis {
  members: string;
  search: string;
  getImage: (diaryId: number) => Array;
  image: string;
  diary: string;
  allDiarys: (page: number, size: number) => Array;
  singleDiary: (diaryId: number) => Array;
  important: (diaryId: number) => Array;
  month: (date: string) => Array;
  day: (date: string) => Array;
  analysismonth: (date: string) => Array;
  analysisday: (date: string) => Array;
  notice: string;
  deleteNotice: (diaryId: number) => Array;
  noticeToken: string;
}

export interface APIResponse<T> {
  statusCode: number;
  statusName: string;
  message: string;
  data?: T;
}
