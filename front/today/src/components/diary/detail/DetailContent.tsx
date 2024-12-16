// DetailContent.tsx
import { VStack } from 'native-base';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import { DiaryData } from '../../../types/datatype';

interface DetailContentProps {
  diary: DiaryData;
}

const DetailContent = ({ diary }: DetailContentProps) => {
  const { width } = useWindowDimensions();
  const imageWidth = width * 0.85; // 전체 화면의 35% 높이로 설정

  return (
    <VStack
      padding={4}
      borderColor="#FE8B8B"
      borderWidth={3}
      borderBottomColor="#FE8B8B"
      borderRadius={8}
      borderTopRadius={0}
      width={imageWidth}>
      <TextContent>{diary.content}</TextContent>
    </VStack>
  );
};

const TextContent = styled.Text`
  text-align: justify;
  font-family: title;
  font-size: 32px;
  line-height: 32px;
  letter-spacing: 0.3px; // 글자 간격
`;

export default DetailContent;
