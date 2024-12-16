export interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (data: boolean) => void;
  modalContent?: React.ReactNode;
  selectedDate: any;
}
