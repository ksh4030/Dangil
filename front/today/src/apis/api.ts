import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Axios, AxiosResponse } from 'axios';
import { setIsLoginGlobal } from '../contexts/IsLoginContext';
import { APIResponse, Apis } from '../types/datatype/apis';

const apis: Apis = {
  // 유저 정보
  members: '/members',
  // 일기 검색
  search: '/es/search',
  // 알림 조회
  notice: '/notices',
  // 알림 삭제
  deleteNotice: diaryId => `/notices/${diaryId}`,
  // 알림 token 전달
  noticeToken: '/notices/token',

  // 이미지 생성
  diary: '/diary',
  // 이미지 선택 -> 최종 일기 생성
  image: '/diary/img',
  // 이미지 가져오기
  getImage: diaryId => `/diary/img/${diaryId}`,

  // 모든 일기 조회
  allDiarys: (page, size) => `/diary?page=${page}&size=${size}&sort=createdAt,desc`,
  // 일기 1개 상세, 수정, 삭제
  singleDiary: diaryId => `/diary/${diaryId}`,

  // main 일기 지정
  important: diaryId => `/diary/important/${diaryId}`,
  // 한달 일기 조회
  month: date => `/calendars/${date}`,
  // 하루 일기 조회
  day: date => `/calendars/day/${date}`,
  // 한달 통계
  analysismonth: date => `/analysis/${date}`,
  // 하루 통계
  analysisday: date => `/analysis/day/${date}`,
};

const instance: Axios = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    config.headers['authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  undefined,
  async error => {
    switch (error.response.status) {
      case 401: {
        await AsyncStorage.removeItem('accessToken');
        setIsLoginGlobal(false);
        break;
      }
      default:
        break;
    }
    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<APIResponse<T>>) => response.data;

export { apis, instance, responseBody };
