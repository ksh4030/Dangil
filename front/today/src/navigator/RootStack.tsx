import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { useContext, useEffect, useState } from 'react';
import { Notices } from '../apis/NoticeApi';
import { IsLoginContext, useIsLoginState } from '../contexts/IsLoginContext';
import { useDispatchContext } from '../contexts/NoticeContext';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import Intro1 from '../screens/intro/Intro1';
import Intro2 from '../screens/intro/Intro2';
import Intro3 from '../screens/intro/Intro3';
import KakaoLogin from '../screens/user/KakaoLogin';
import { NoticeData } from '../types/datatype';
import { RootStackParam } from '../types/navigatortype/stack';

const Stack = createNativeStackNavigator<RootStackParam>();

function RootStack() {
  // 로그인 여부 체크
  const isLogin = useIsLoginState();
  const { setIsLogin } = useContext(IsLoginContext);

  // 알림 데이터 추가
  const dispatch = useDispatchContext();
  const [notis, setNotis] = useState<NoticeData>();

  useEffect(() => {
    async function init() {
      try {
        // 1. 로그인 상태 검사
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }

        // 2. 초기 알림 데이터 로드
        const response = await Notices.getNotices();
        if (response.data) {
          dispatch({ type: 'INIT', data: response.data });
        }

        // 3. 알림 오면 받아서 context에 저장
        Notifications.addNotificationReceivedListener(notification => {
          const response = notification.request.content.data;
          const convertedResponse: NoticeData = {
            noticeId: response.noticeId,
            diaryId: response.diaryId,
            kind: response.NoticeKind,
            content: response.content,
            confirm: response.confirm,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
          };

          setNotis(convertedResponse);

          dispatch({
            type: 'CREATE',
            noticeId: convertedResponse.noticeId,
            diaryId: convertedResponse.diaryId,
            kind: convertedResponse.kind,
            content: convertedResponse.content,
            confirm: convertedResponse.confirm,
            createdAt: convertedResponse.createdAt,
            updatedAt: convertedResponse.updatedAt,
          });
        });
      } catch (error) {
        console.error('Error initializing app: ', error);
      }
    }

    init();
  }, []);

  return (
    <Stack.Navigator>
      {isLogin ? (
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }} />
          <Stack.Screen
            name="Intro1"
            component={Intro1}
            options={{ headerShown: false, animationTypeForReplace: 'push', animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="Intro2"
            component={Intro2}
            options={{ headerShown: false, animationTypeForReplace: 'push', animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="Intro3"
            component={Intro3}
            options={{ headerShown: false, animationTypeForReplace: 'push', animation: 'slide_from_right' }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
