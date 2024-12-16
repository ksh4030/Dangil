import Modal from 'react-native-modal';
import { ModalProps } from '../../types/modal';
import * as S from './style';

function ModalComponent({ modalVisible, setModalVisible, modalContent }: ModalProps) {
  return (
    <Modal
      isVisible={modalVisible}
      // animationIn="fadeIn"
      // animationOut="fadeOut"
      hideModalContentWhileAnimating={true}
      onBackdropPress={() => setModalVisible(!modalVisible)}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <S.ModalContainer>{modalContent}</S.ModalContainer>
    </Modal>
  );
}

export default ModalComponent;
