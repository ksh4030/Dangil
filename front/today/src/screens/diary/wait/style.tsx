import styled from 'styled-components/native';

export const WaitImage = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightPink};
`;

export const WaitImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const WaitImageTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 35px;
`;

export const WaitImageContent = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 20px;
`;

export const WaitImageExplane = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  margin: 3px;
  color: gray;
`;

export const ButtonContainer = styled.View`
  margin-top: 40px;
`;
