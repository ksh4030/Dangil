import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Diarys } from '../../apis/DiaryApi';
import CommonButton from '../../common/CommonButton';
import TodayDate from '../../common/TodayDate';
import DiaryContent from '../../components/diary/write/DiaryContent';
import * as S from './style';

interface EditDiaryProp {
  navigation: {
    replace: (arg0: string, arg1?: { diaryId: number }) => void;
    navigate: any;
  };
  route: { params: { diaryId: number; diaryContent: string } };
}

function EditDiary({ navigation, route }: EditDiaryProp) {
  const { diaryId, diaryContent } = route.params;

  // 일기 내용 상태 관리
  const [content, setContent] = useState({
    content: diaryContent,
  });

  // 일기 데이터 추적
  const onChangeContent = (newContent: string) => {
    setContent(prevData => ({
      ...prevData,
      content: newContent,
    }));
  };

  function onPressEdit() {
    Diarys.editDiary(diaryId, content)
      .then(res => {
        navigation.navigate('DiaryDetail', { diaryId: diaryId });
      })
      .catch(err => {
        console.log('일기 수정 실패', err);
      });
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <S.WriteDiaryContainer>
        <TodayDate />
        <S.WriteDiaryTitle>오늘 하루는 어땠나요?</S.WriteDiaryTitle>
        <DiaryContent value={content.content} onChangeText={onChangeContent} onSubmitEditing={onPressEdit} />
        <S.WriteDiaryButton>
          <CommonButton content="일기 수정 완료" onPress={onPressEdit} />
        </S.WriteDiaryButton>
      </S.WriteDiaryContainer>
    </KeyboardAwareScrollView>
  );
}

export default EditDiary;
