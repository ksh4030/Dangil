// DetailHeader.tsx
import { Center, Divider, HStack, Image, VStack } from 'native-base';
import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';
import { DiaryData } from '../../../types/datatype';
import { EmotionFiles } from '../write/Emotions';

type DetailHeaderProps = {
  diary: DiaryData;
};

const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayName = dayNames[date.getDay()];
  return `${month}월 ${day}일 ${dayName}`;
};

const DetailHeader = ({ diary }: DetailHeaderProps) => {
  const theme = useTheme();
  const mainColor = theme.colors.mainPink;
  const createdAt = diary.createdAt ? new Date(diary.createdAt) : undefined;

  const { width } = useWindowDimensions();
  const imageWidth = width * 0.85;

  return (
    <VStack
      borderColor={mainColor}
      borderWidth={3}
      borderRadius={8}
      overflow="hidden"
      borderBottomRadius={0}
      borderBottomWidth={0}
      width={imageWidth}>
      <HStack
        divider={<Divider borderWidth={1} borderColor={mainColor} bg={mainColor} />}
        borderBottomWidth={3}
        borderBottomColor={mainColor}>
        <VStack flex={1}>
          <Center
            height="50px"
            _text={{
              fontSize: '18px',
              fontFamily: 'base',
            }}
            style={{ borderBottomWidth: 3, borderColor: mainColor }}>
            날짜
          </Center>
          <Center
            height="60px"
            _text={{
              fontFamily: 'title',
              fontSize: '28px',
            }}>
            {createdAt ? formatDate(createdAt) : 'Unknown'}
          </Center>
        </VStack>
        <VStack flex={1}>
          <Center
            height="50px"
            _text={{
              fontSize: '18px',
              fontFamily: 'base',
            }}
            style={{ borderBottomWidth: 3, borderColor: mainColor }}>
            오늘의 기분
          </Center>
          <Center height="60px">
            {diary.feel ? (
              <Image source={EmotionFiles[diary.feel]} alt="emotion" style={{ width: 38, height: 38 }} />
            ) : (
              'Unknown'
            )}
          </Center>
        </VStack>
      </HStack>
      <View style={{ width: imageWidth, height: imageWidth }}>
        <Image
          source={{ uri: diary.imgUrl }}
          alt="drawing_diary"
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
    </VStack>
  );
};

export default DetailHeader;
