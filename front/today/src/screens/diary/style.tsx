import styled, { css } from 'styled-components/native';

export const center = css`
  justify-content: center;
  align-items: center;
`;

export const WriteDiaryContainer = styled.View`
  flex: 1;
  ${center}
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const WriteDiaryTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 30px;
`;

export const WriteDiaryButton = styled.View`
  ${center};
  width: 100%;
  margin: 40px 0px;
`;

export const EmptyDiaryContainer = styled.View`
  flex: 1;
  ${center};
  height: 300px;
`;
