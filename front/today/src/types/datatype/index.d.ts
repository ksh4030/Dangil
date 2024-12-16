export interface MemberData {
  id: number;
  email: string;
  nickName: string;
  createAt?: string;
  updatedAt?: string;
}

export interface DiaryData {
  id: number;
  memberId: number;
  feel: string | undefined;
  important: boolean;
  imgUrl: string;
  status: number;
  content: string;
  createdAt: string;
  count: number;
}

export interface CalendarData {
  id: number;
  memberId: number;
  important: boolean;
  content: string;
  status: number;
  imgUrl: string;
  feel: string;
  createdAt: string;
}

export interface SearchData {
  id: number;
  imgUrl: string;
  createdAt: string;
  content: string;
}

export interface AllDiaryData {
  content: DiaryData[];
}

export interface WriteDiaryData {
  feel: string | undefined;
  content: string;
}

export interface EditDiaryData {
  content: string;
}

export interface SearchWord {
  keyword: string;
}

export interface DeviceToken {
  deviceToken: string;
}

export interface ImageDatas {
  img1: string;
  img2: string;
  img3: string;
  img4: string;
}

export interface ImageData {
  id: number;
  imgUrl: string;
}

export interface NoticeData {
  noticeId: number;
  diaryId: number;
  kind: string;
  content: number;
  confirm: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PatchNoticeData {
  noticeId: number;
  confirm: boolean;
}

export interface AnalysisData {
  i: number;
  e: number;
  s: number;
  n: number;
  t: number;
  f: number;
  p: number;
  j: number;
  angry: number;
  disgust: number;
  fear: number;
  happiness: number;
  sadness: number;
  surprise: number;
}
