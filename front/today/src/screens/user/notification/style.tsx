import { Platform } from 'react-native';
import styled from 'styled-components/native';

type NotiContainerProps = {
  backgroundColor: string;
};

export const NotiContainer = styled.TouchableOpacity<NotiContainerProps>`
  background-color: ${props => props.backgroundColor || 'transparent'};
  padding: 30px 15px 15px 15px;
  margin: 8px;
  border-radius: 3px;
  ${Platform.select({
    ios: `
      shadow-color: #ffffff;
      shadow-offset: {width: 10, height: 10};
      shadow-opacity: 0.5;
      shadow-radius: 10;
    `,
    android: `
      elevation: 3;
    `,
  })}
`;

export const NoticePageContianer = styled.SafeAreaView`
  flex: 1;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const NotiTitle = styled.Text`
  margin-top: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.regular};
`;

export const IconContainer = styled.Pressable`
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 100;
`;

export const Line = styled.View`
  height: 1px;
  background-color: lightgray;
  margin-top: 15px;
  margin-bottom: 20px;
`;
