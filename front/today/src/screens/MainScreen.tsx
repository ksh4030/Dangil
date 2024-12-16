import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Keyboard, Linking, SafeAreaView } from 'react-native';
import { useTheme } from 'styled-components/native';
import BottomNav from '../components/nav/BottomNav';
import { NavigationProvider } from '../contexts/NavigationContext';
import MainStack from '../navigator/MainStack';

function MainScreen() {
  const theme = useTheme();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // 비로그인 알림 접근 시 가는 경로
    const noti = async () => {
      const selectImageURL = await AsyncStorage.getItem('selectImageURL'); // 저장된 URL 가져오기
      const writeDiaryURL = await AsyncStorage.getItem('writeDiaryURL');
      if (selectImageURL) {
        await Linking.openURL(selectImageURL);
        await AsyncStorage.removeItem('selectImageURL');
      }
      if (writeDiaryURL) {
        await Linking.openURL(writeDiaryURL);
        await AsyncStorage.removeItem('writeDiaryURL');
      }
    };
    noti();
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <NavigationProvider>
      <SafeAreaView
        style={{ flex: 1, paddingBottom: keyboardVisible ? 0 : 70, backgroundColor: theme.colors.background }}>
        <MainStack />
      </SafeAreaView>
      {!keyboardVisible && <BottomNav />}
    </NavigationProvider>
  );
}

export default MainScreen;
