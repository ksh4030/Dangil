import styled from 'styled-components/native';

export const SelectImageContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SelecImageTitle = styled.Text`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const TodayDate = styled.Text`
  text-align: center;
  padding-top: 20px;
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const ImagesContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px 0px;
`;

export const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;
