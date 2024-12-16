import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { Diarys } from '../../../apis/DiaryApi';
import NextButton from '../../../common/CommonButton';
import Images from '../../../components/diary/select/ResultImage';
import { ImageData, ImageDatas } from '../../../types/datatype';
import * as S from './style';

interface SelectImageProp {
  navigation: {
    replace: (arg0: string, arg1?: { diaryId: number }) => void;
  };
  route: { params: { diaryId: number } };
}

function SelectImage({ navigation, route }: SelectImageProp) {
  const theme = useTheme();
  const { diaryId } = route.params;
  const today: string = format(new Date(), 'yyyy. MM. dd');
  const [images, setImages] = useState<ImageDatas>();
  const [selectedImg, setSelectedImg] = useState<string>();

  useEffect(() => {
    Diarys.getImage(diaryId)
      .then(response => {
        if (response.data) {
          setImages(response.data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const imageUrls: ImageData[] = [];

  if (images) {
    const values = Object.values(images);
    for (let i = 0; i < values.length; i++) {
      const idx = i + 1; // 각각의 키
      const value = values[i]; // 각각의 키에 해당하는 각각의 값
      imageUrls.push({ id: idx, imgUrl: value });
    }
  }

  function renderImage({ item }: { item: ImageData }) {
    const backgroundColor = item.imgUrl === selectedImg ? theme.colors.middlePink : 'white';

    return <Images item={item} onPress={() => setSelectedImg(item.imgUrl)} backgroundColor={backgroundColor} />;
  }

  async function createDiary() {
    if (selectedImg) {
      await Diarys.addDiary({
        id: diaryId,
        imgUrl: selectedImg,
      })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
      navigation.replace('DiaryDetail', { diaryId: diaryId });
    } else {
      Alert.alert(
        '그림 선택', // 제목
        '오늘의 그림을 선택해주세요.', // 메시지
        [
          { text: '확인' }, // 확인 버튼
        ],
      );
    }
  }

  return (
    <S.SelectImageContainer>
      <S.TodayDate>{today}</S.TodayDate>
      <S.SelecImageTitle>마음에 드는 그림을 선택해주세요!</S.SelecImageTitle>
      <S.ImagesContainer>
        <FlatList data={imageUrls} renderItem={renderImage} numColumns={2} keyExtractor={item => item.id.toString()} />
      </S.ImagesContainer>
      <S.ButtonContainer>
        <NextButton content="작성 완료" onPress={createDiary} />
      </S.ButtonContainer>
    </S.SelectImageContainer>
  );
}

export default SelectImage;
