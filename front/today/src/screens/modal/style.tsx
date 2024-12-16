import styled, { css } from 'styled-components/native';

export const center = css`
  justify-content: center;
  align-items: center;
`;

export const MakingDiaryContainer = styled.View`
  ${center};
  flex: 1;
`;

export const MakingDiaryText = styled.Text`
  text-align: center;
`;

export const ResultModalContainer = styled.View`
  margin: 10px;
`;

export const ResultModalTextContainer = styled.View`
  ${center}
  margin-bottom: 20px;
`;
export const ResultModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 8px;
`;

export const ResultModalText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin: 6px;
`;

export const ResultModalPoiotText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.pink};
`;
