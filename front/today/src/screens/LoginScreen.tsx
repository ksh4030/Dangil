import * as Network from 'expo-network';
import React from 'react';
import { Alert, Text } from 'react-native';
import * as S from './user/style';

interface LoginScreenProp {
  navigation: {
    navigate: (arg0: string) => void;
  };
}

function LoginScreen({ navigation }: LoginScreenProp) {
  const onPressLogin = async () => {
    const status = await Network.getNetworkStateAsync();
    if (status.isInternetReachable) {
      navigation.navigate('KakaoLogin');
    } else {
      Alert.alert('네트워크 연결 실패', '셀룰러 데이터 혹은 와이파이를 연결해주세요!');
    }
  };
  return (
    <S.LoginScreen>
      <S.LoginContainer>
        <S.Logo>당일</S.Logo>
        <S.LoginText>
          <S.LoginPointWord>당</S.LoginPointWord>신만의 특별한
        </S.LoginText>
        <S.LoginText>
          <S.LoginPointWord>일</S.LoginPointWord>기를 작성하세요
        </S.LoginText>
        <S.Introduce onPress={() => navigation.navigate('Intro1')}>
          <Text style={{ fontSize: 16, color: 'white' }}>당일을 소개합니다 ≫</Text>
        </S.Introduce>
      </S.LoginContainer>
      <S.LoginContainer>
        <Text style={{ fontSize: 15, color: 'white', marginBottom: 8 }}>카카오톡으로 로그인하고 시작하기</Text>
        <S.LinkButton onPress={onPressLogin}>
          <S.LoginButton source={require('../../assets/kakao-logo.png')} resizeMode="stretch" />
        </S.LinkButton>
      </S.LoginContainer>
    </S.LoginScreen>
  );
}

export default LoginScreen;
