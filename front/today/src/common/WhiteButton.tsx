import * as S from './Style';

export type ButtonProps = {
  content: string;
  onPress?: (data?: any) => void;
};

function WhiteButton({ content, onPress }: ButtonProps) {
  return (
    <S.StyledWhiteBtn onPress={onPress}>
      <S.StyledWhiteBtnText>{content}</S.StyledWhiteBtnText>
    </S.StyledWhiteBtn>
  );
}

export default WhiteButton;
