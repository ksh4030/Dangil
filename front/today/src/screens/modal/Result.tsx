import ModalComponent from '../../components/modal/Modal';
import { ModalProps } from '../../types/modal';
import * as S from './style';

function ResultModalContent() {
  return (
    <S.ResultModalContainer>
      <S.ResultModalTextContainer>
        <S.ResultModalTitle>오늘의 일기</S.ResultModalTitle>
        <S.ResultModalTitle>AI 분석 결과</S.ResultModalTitle>
      </S.ResultModalTextContainer>
      <S.ResultModalTextContainer>
        <S.ResultModalText>당신의 오늘 MBTI는</S.ResultModalText>
        <S.ResultModalText>
          <S.ResultModalPoiotText>ISTJ</S.ResultModalPoiotText> 입니다
        </S.ResultModalText>
      </S.ResultModalTextContainer>
      <S.ResultModalTextContainer>
        <S.ResultModalText>오늘의 기분은</S.ResultModalText>
        <S.ResultModalText>
          <S.ResultModalPoiotText>슬픔</S.ResultModalPoiotText> 이네요
        </S.ResultModalText>
      </S.ResultModalTextContainer>
    </S.ResultModalContainer>
  );
}

function ResultModal({ modalVisible, setModalVisible }: ModalProps) {
  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      modalContent={<ResultModalContent />}
    />
  );
}

export default ResultModal;
