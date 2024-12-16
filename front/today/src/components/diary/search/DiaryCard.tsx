import { Image, Text } from 'react-native';
import { SearchData } from '../../../types/datatype';
import * as S from './style';

type ItemProps = {
  item: SearchData;
  onPress: () => void;
  backgroundColor: string;
};

export function DiaryCard({ item, onPress, backgroundColor }: ItemProps) {
  const day: Date = new Date(item.createdAt);
  const weekday = day.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });
  const date: number = day.getDate();

  return (
    <S.SingleDiaryContainer onPress={onPress} backgroundColor={backgroundColor}>
      {item.imgUrl === null ? (
        <Text
          style={{ height: 200, textAlign: 'center', textAlignVertical: 'center', fontFamily: 'title', fontSize: 24 }}>
          이미지를 선택해주세요!
        </Text>
      ) : (
        <Image source={{ uri: item.imgUrl }} style={{ height: 200, width: '100%' }} />
      )}
      <S.SingleDiaryContent>
        <S.SingleDiaryDates>
          <S.SingleDiaryDate>{date}</S.SingleDiaryDate>
          <S.SingleDiaryDate>{weekday}</S.SingleDiaryDate>
        </S.SingleDiaryDates>

        <Text numberOfLines={2} ellipsizeMode="tail" style={{ flex: 1 }}>
          {item.content}
        </Text>
      </S.SingleDiaryContent>
    </S.SingleDiaryContainer>
  );
}
