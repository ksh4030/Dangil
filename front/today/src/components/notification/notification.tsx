import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';
import { Notices } from '../../apis/NoticeApi';

// 테스트 알림 보내는 함수
// 알림의 내용을 data로 넣어서 body에 넣음
// export async function testNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: '테스트 알림',
//       body: '그림 생성이 완료되었습니다.',
//       data: { customData: 43 },
//     },
//     trigger: null,
//   });
//   console.log('알림왔당');
// }

// 알림 등록
export async function registerForPushNotificationsAsync() {
  // 안드로이드 채널 설정
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // 디바이스인지 확인 => 에뮬레이터 X
  if (Device.isDevice) {
    // 알림 권한 확인
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // 권한 허용하지 않았다면 권한 허용 요청 보냄
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // 권한 거부
    if (finalStatus !== 'granted') {
      alert('알림 권한이 거부되었습니다.');
      return;
    }
  } else {
    Alert.alert('알림', '모바일 기기 접속 권장드립니다.');
  }
}

export async function getDeviceToken() {
  let deviceToken = '';
  // projectId 자동 설정
  try {
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      throw new Error('Project ID를 찾지 못했습니다.');
    }

    // 토큰 발급 및
    const deviceToken = (
      await Notifications.getExpoPushTokenAsync({
        projectId: projectId,
      })
    ).data;

    // 토큰 서버로 전송
    Notices.postToken({ deviceToken: JSON.stringify(deviceToken) })
      .then(response => console.log('토큰 전송 완료', deviceToken))
      .catch(error => console.log(error));
  } catch (error) {
    deviceToken = `${error}`;
  }

  return deviceToken;
}
