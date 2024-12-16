import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as S from './style';

type DateProp = {
  date: string;
  setDate: (date: string) => void;
};

function DateFilter({ date, setDate }: DateProp) {
  const [show, setShow] = useState(false);

  function onConfirm(selectedDate: Date) {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const fommatedSelectedDate =
      year + '-' + ('00' + month.toString()).slice(-2) + '-' + ('00' + day.toString()).slice(-2);
    setShow(false);
    setDate(fommatedSelectedDate);
  }

  function onCancel() {
    setShow(false);
  }

  return (
    <>
      <S.DiaryListTitleContainer onPress={() => setShow(!show)}>
        <S.DiaryListTitle>{format(new Date(date), 'PPP', { locale: ko })} ⌵</S.DiaryListTitle>
      </S.DiaryListTitleContainer>
      <DateTimePickerModal
        isVisible={show}
        date={new Date(date)}
        mode="date"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
}

export default DateFilter;
