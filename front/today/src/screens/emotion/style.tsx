import styled, { css } from 'styled-components/native';

export const center = css`
  justify-content: center;
  align-items: center;
`;

export const SelectEmotionContainer = styled.SafeAreaView`
  ${center}
  flex: 1;
  background-color: #ffffff;
`;

export const TitleContainer = styled.View`
  ${center}
  flex: 2;
  padding: 20px;
`;

export const EmotionsContainer = styled.View`
  ${center}
  flex: 3;
`;

export const ButtonContainer = styled.View`
  ${center}
  flex: 1;
  width: 100%;
  margin-bottom: 30px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding: 5px;
`;

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: gray;
  padding: 5px;
`;
