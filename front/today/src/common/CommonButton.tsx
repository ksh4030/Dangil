import * as S from './Style';

export type ButtonProps = {
  content: string;
  onPress?: (data?: any) => void;
};

function CommonButton({ content, onPress }: ButtonProps) {
  return (
    <S.StyledBtn onPress={onPress}>
      <S.StyledBtnText>{content}</S.StyledBtnText>
    </S.StyledBtn>
  );
}

export default CommonButton;
