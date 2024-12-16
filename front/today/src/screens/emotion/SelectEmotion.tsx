import React, { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import NextButton from '../../common/CommonButton';
import Emotions from '../../components/diary/write/Emotions';
import { EmotionData, EmotionDataProp } from '../../contexts/EmotionData';
import * as S from './style';

interface SelectEmotionProp {
  navigation: {
    push: (arg0: string, arg1?: { feel: string }) => void;
  };
}

function SelectEmotion({ navigation }: SelectEmotionProp) {
  const theme = useTheme();
  const [selectedFeel, setSelectedFeel] = useState<string>('');

  // 감정 선택시 색 변화
  function renderEmotion({ item }: { item: EmotionDataProp }) {
    const backgroundColor = item.feel === selectedFeel ? theme.colors.middlePink : '';
    const borderColor = item.feel === selectedFeel ? theme.colors.mainPink : '';

    return (
      <Emotions
        emotion={item}
        onPress={() => setSelectedFeel(item.feel)}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
      />
    );
  }

  // 일기 작성 페이지로 화면 이동
  function navigateToWriteDiary() {
    if (selectedFeel) {
      navigation.push('WriteDiary', { feel: selectedFeel });
    } else {
      Alert.alert(
        '감정 선택', // 제목
        '감정을 선택해주세요.', // 메시지
        [
          { text: '확인' }, // 확인 버튼
        ],
      );
    }
  }

  return (
    <S.SelectEmotionContainer>
      <S.TitleContainer>
        <S.Title>오늘의 감정을</S.Title>
        <S.Title>선택해주세요.</S.Title>
        <S.SubTitle>오늘의 기분은 어땠나요?</S.SubTitle>
      </S.TitleContainer>
      <FlatList
        data={EmotionData}
        renderItem={renderEmotion}
        numColumns={3}
        keyExtractor={emotion => emotion.feel}
        extraData={selectedFeel}
      />

      <S.ButtonContainer>
        <NextButton content="다 음" onPress={navigateToWriteDiary} />
      </S.ButtonContainer>
    </S.SelectEmotionContainer>
  );
}

export default SelectEmotion;
