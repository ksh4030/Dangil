import { Platform } from 'react-native';
import styled from 'styled-components/native';

const shadow = Platform.select({
  ios: `
    shadow-color: #ffffff;
    shadow-offset: {width: 10, height: 10};
    shadow-opacity: 0.5;
    shadow-radius: 10;
  `,
  android: `
    elevation: 5;
  `,
});

export const StyledBtn = styled.TouchableOpacity`
  width: 83%;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.mainPink};
  ${shadow}
`;

export const StyledWhiteBtn = styled.TouchableOpacity`
  padding: 10px 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  ${shadow}
`;

export const StyledBtnText = styled.Text`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-family: title;
  color: ${({ theme }) => theme.colors.background};
`;

export const StyledWhiteBtnText = styled.Text`
  text-align: center;
  /* font-size: ${({ theme }) => theme.fontSize.medium}; */
  /* font-family: title; */
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.mainPink};
`;

export const TodayDate = styled.Text`
  text-align: center;
  padding: 20px;
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const SaveBtn = styled.TouchableOpacity`
  margin: 0px 2px;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.mainPink};
  ${Platform.select({
    ios: `
    shadow-color: #ffffff;
    shadow-offset: {width: 10, height: 10};
    shadow-opacity: 0.5;
    shadow-radius: 10;
  `,
    android: `
    elevation: 8;
  `,
  })}
`;
