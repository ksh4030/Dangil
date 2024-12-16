import { Image } from 'react-native';
import { ImageData } from '../../../types/datatype';
import * as S from './style';

type ImageItemProps = {
  item: ImageData;
  onPress: () => void;
  backgroundColor: string;
};

function Images({ item, onPress, backgroundColor }: ImageItemProps) {
  return (
    <S.ImageContainer onPress={onPress} backgroundColor={backgroundColor}>
      <Image source={{ uri: item.imgUrl }} style={{ height: 180 }} />
    </S.ImageContainer>
  );
}

export default Images;
