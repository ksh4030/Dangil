import { Platform } from 'react-native';
import styled from 'styled-components/native';

type ImageContainerProps = {
  backgroundColor: string;
};

export const ImageContainer = styled.TouchableOpacity<ImageContainerProps>`
  background-color: ${props => props.backgroundColor || 'transparent'};
  padding: 20px;
  margin: 8px;
  width: 160px;
  border-radius: 3px;
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
`;
