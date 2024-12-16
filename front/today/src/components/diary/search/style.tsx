import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

export const center = css`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const SearchContainer = styled.View`
  padding: 10px;
`;

export const Search = styled.TextInput`
  flex: 1;
  width: 100%;
`;

type ImageContainerProps = {
  backgroundColor: string;
};

export const SingleDiaryContainer = styled.TouchableOpacity<ImageContainerProps>`
  background-color: ${props => props.backgroundColor || 'transparent'};
  padding: 20px;
  margin: 20px 35px;
  border-radius: 3px;
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
`;

export const SingleDiaryContent = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  overflow: hidden;
`;

export const SingleDiaryDates = styled.View`
  margin: 0px 10px;
  align-items: center;
  padding-right: 8px;
`;

export const SingleDiaryDate = styled.Text`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.small};
  margin-right: 5px;
`;

export const SingleDiaryTextContainer = styled.View``;
export const SingleDiaryText = styled.Text`
  flex: 1 1 0;
`;
