import LottieView from 'lottie-react-native';
import { Image, Text } from 'react-native';
import { DiaryData } from '../../../types/datatype';
import * as S from './style';

type ItemProps = {
  item: DiaryData;
  onPress: () => void;
  backgroundColor: string;
};

export function DiaryCard({ item, onPress, backgroundColor }: ItemProps) {
  const day: Date = new Date(item.createdAt);
  // const month: number = day.getMonth() + 1;
  const date: number = day.getDate();
  const weekday = day.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });

  function renderImage(status: number) {
    switch (status) {
      case 0:
        return (
          <S.DefaultImage>
            <LottieView
              source={require('../../../../assets/lotties/loading.json')}
              autoPlay
              loop
              style={{
                width: '100%',
                height: 150,
              }}
            />
          </S.DefaultImage>
        );
      case 1:
        return (
          <S.DefaultImage>
            <LottieView
              source={require('../../../../assets/lotties/done.json')}
              autoPlay
              loop
              style={{
                width: '100%',
                height: 150,
              }}
            />
          </S.DefaultImage>
        );
      case 2:
        return <Image source={{ uri: item.imgUrl }} style={{ height: 200, width: '100%' }} />;
      default:
        return (
          <S.DefaultImage>
            <LottieView
              source={require('../../../../assets/lotties/loading.json')}
              autoPlay
              loop
              style={{
                width: '100%',
                height: 150,
              }}
            />
          </S.DefaultImage>
        );
    }
  }

  return (
    <S.SingleDiaryContainer onPress={onPress} backgroundColor={backgroundColor}>
      {renderImage(item.status)}
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
