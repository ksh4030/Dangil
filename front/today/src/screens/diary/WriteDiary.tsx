import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Diarys } from '../../apis/DiaryApi';
import CommonButton from '../../common/CommonButton';
import TodayDate from '../../common/TodayDate';
import DiaryContent from '../../components/diary/write/DiaryContent';
import * as S from './style';

interface WriteDiaryProp {
  navigation: {
    replace: (arg0: string, arg1?: { screen: string }) => void;
  };
  route: { params: { feel: string } };
}

function WriteDiary({ navigation, route }: WriteDiaryProp) {
  const { feel } = route.params;
  const [diarys, setDiarys] = useState();

  // 일기 내용 상태 관리
  const [content, setContent] = useState({
    feel: feel,
    content: '',
  });

  // 일기 데이터 추적
  const onChangeContent = (newContent: string) => {
    setContent(prevData => ({
      ...prevData,
      content: newContent,
    }));
  };

  // 이미지 생성 요청
  async function onPressWrite() {
    const contentLength = content.content.trim().length;

    if (contentLength < 10) {
      Alert.alert('최소 글자수 제한!', '최소 10자 이상 입력해주세요.');
    } else if (contentLength > 200) {
      Alert.alert('최대 글자수 제한!', '200자를 초과할 수 없습니다.');
    } else {
      navigation.replace('WaitImage');

      try {
        await Diarys.createImage(content)
          .then(response => {})
          .catch(err => {
            console.log(err);
          });

        await Diarys.getDiarys(0, 3)
          .then(response => {
            const newData = response.data?.content || [];
            AsyncStorage.setItem('initDiarys', JSON.stringify(newData));
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <S.WriteDiaryContainer>
        <TodayDate />
        <S.WriteDiaryTitle>오늘 하루는 어땠나요?</S.WriteDiaryTitle>
        <DiaryContent value={content.content} onChangeText={onChangeContent} onSubmitEditing={onPressWrite} />
        <S.WriteDiaryButton>
          <CommonButton content="다 음" onPress={onPressWrite} />
        </S.WriteDiaryButton>
      </S.WriteDiaryContainer>
    </KeyboardAwareScrollView>
  );
}

export default WriteDiary;
