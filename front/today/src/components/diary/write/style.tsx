import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

type EmotionContainerProps = {
  backgroundColor: string;
  borderColor: string;
};

export const full = css`
  height: 100%;
  width: 100%;
`;

export const DiaryContainer = styled.View`
  border-radius: 8px;
  width: 85%;
  background-color: ${({ theme }) => theme.colors.lightPink};
  ${Platform.select({
    ios: `
      shadow-color: #ffffff;
      shadow-offset: {width: 10, height: 10};
      shadow-opacity: 0.5;
      shadow-radius: 10;
    `,
    android: `
      elevation: 6;
    `,
  })}
  padding: 18px 20px;
`;

export const DiaryContent = styled.TextInput`
  font-size: ${({ theme }) => theme.fontSize.regular};
`;

export const CountText = styled.Text`
  color: gray;
`;

export const CountTextContainer = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const Emotion = styled.Image`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

export const EmotionContainer = styled.TouchableOpacity<EmotionContainerProps>`
  justify-content: center;
  align-items: center;
  padding: 20px 25px;
  margin: 5px;
  border-radius: 8px;
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
  background-color: ${props => props.backgroundColor || 'white'};
`;

export const EmotionsTitle = styled.Text`
  justify-content: center;
  align-items: center;
  color: #555555;
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
