import React from 'react';
import * as S from './style';

interface CuntomInputProps {
  value: string | undefined;
  onChangeText: (data: string) => void;
  onSubmitEditing: () => void;
}

function DiaryContent({ value, onChangeText, onSubmitEditing }: CuntomInputProps) {
  return (
    <S.DiaryContainer>
      <S.DiaryContent
        value={value}
        multiline={true}
        numberOfLines={10}
        placeholder="오늘의 하루를 기록해보세요."
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        style={{ textAlignVertical: 'top' }}
      />
      <S.CountTextContainer>
        <S.CountText>{value ? value.length : 0} / 200</S.CountText>
      </S.CountTextContainer>
    </S.DiaryContainer>
  );
}

export default DiaryContent;
