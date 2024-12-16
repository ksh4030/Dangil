import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

export const center = css`
  justify-content: center;
  align-items: center;
`;

export const shadow = css`
  ${Platform.select({
    ios: `
      shadow-color: #ffffff;
      shadow-offset: {width: 10, height: 10};
      shadow-opacity: 0.5;
      shadow-radius: 10;
    `,
    android: `
      elevation: 5;
    `,
  })}
`;

// 마이페이지
export const MyPage = styled.SafeAreaView`
  flex: 1;
  ${center}
`;

export const MyPageContainer = styled.View`
  flex: 1;
  width: 78%;
`;

export const MyPageTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.big};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  ${shadow}
`;

export const MyPageSubTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  ${shadow}
  margin-top: 30px;
`;

export const MyInfoTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xsmall};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-right: 20px;
  flex: 2;
`;

export const MBTITitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-bottom: 20px;
  text-align: center;
`;

export const MyInfoContent = styled.View`
  ${center}
  ${shadow}
  background-color: white;
  border: 1px black solid;
  border-radius: 10px;
  padding: 10px 15px;
  flex: 8;
`;

export const MyInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  margin-bottom: 10px;
`;

export const SettingWrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 8px 20px;
  gap: 10px;
  align-items: center;
`;

// 로그인 페이지
export const LoginScreen = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.mainPink};
  justify-content: center;
  gap: 120px;
`;

export const LoginContainer = styled.View`
  ${center}
`;

export const Logo = styled.Text`
  font-family: title;
  font-size: 105px;
  color: ${({ theme }) => theme.colors.background};
  margin: 5px;
`;

export const LoginPointWord = styled.Text`
  color: ${({ theme }) => theme.colors.middlePink};
  text-shadow: 1px 1px 3px lightgray;
`;

export const PointWord = styled.Text`
  color: ${({ theme }) => theme.colors.mainPink};
  text-shadow: 1px 1px 3px lightgray;
`;

export const LoginText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 23px;
`;

export const LoginButton = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 3px;
`;

export const LinkButton = styled.TouchableOpacity`
  width: 250px;
  height: 60px;
  margin: 7px 0px;
  ${shadow}
`;

export const Introduce = styled.TouchableOpacity`
  ${center}
  padding: 10px 20px 13px;
  border-radius: 30px;
  border: 2px solid white;
  margin: 20px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: lightgray;
  margin: 15px 0px;
`;

export const MBTItext = styled.Text`
  color: ${({ theme }) => theme.colors.pink};
  text-shadow: 1px 1px 3px gray;
`;
