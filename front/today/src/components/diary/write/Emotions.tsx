// Emotions.tsx
import { EmotionDataProp } from '../../../contexts/EmotionData';
import * as S from './style';

type EmotionProps = {
  emotion: EmotionDataProp;
  onPress: () => void;
  backgroundColor: string;
  borderColor: string;
};

export const EmotionFiles: { [key: string]: any } = {
  happiness: require('../../../../assets/emotions/happiness.png'),
  surprise: require('../../../../assets/emotions/surprise.png'),
  sadness: require('../../../../assets/emotions/sadness.png'),
  disgust: require('../../../../assets/emotions/disgust.png'),
  fear: require('../../../../assets/emotions/fear.png'),
  angry: require('../../../../assets/emotions/angry.png'),
};

function Emotions({ emotion, onPress, backgroundColor, borderColor }: EmotionProps) {
  return (
    <S.EmotionContainer onPress={onPress} backgroundColor={backgroundColor} borderColor={borderColor}>
      <S.Emotion source={EmotionFiles[emotion.feel]} />
      <S.EmotionsTitle>{emotion.name}</S.EmotionsTitle>
    </S.EmotionContainer>
  );
}

export default Emotions;
