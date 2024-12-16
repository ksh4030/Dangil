import styled from 'styled-components/native';

export const AnalysisTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 10px;
`;

export const AnalysisSubTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin: 20px 0px;
  text-align: center;
`;

export const Line = styled.View`
  height: 1px;
  background-color: lightgray;
  margin: 15px 0px;
`;
export const MBTItext = styled.Text`
  color: ${({ theme }) => theme.colors.mainPink};
  text-shadow: 1px 1px 3px gray;
`;

export const CloseModal = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;
