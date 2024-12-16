// EmotionData.tsx
type EmotionDataProp = {
  feel: string;
  name: string;
};

const EmotionData: EmotionDataProp[] = [
  {
    feel: 'happiness',
    name: '행복',
  },
  {
    feel: 'surprise',
    name: '놀람',
  },
  {
    feel: 'sadness',
    name: '슬픔',
  },
  {
    feel: 'disgust',
    name: '짜증',
  },
  {
    feel: 'fear',
    name: '불안',
  },
  {
    feel: 'angry',
    name: '분노',
  },
];

export { EmotionData, EmotionDataProp };
