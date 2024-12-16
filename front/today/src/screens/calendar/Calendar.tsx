// Calendar.tsx
import React, { useState } from 'react';
import { KeyboardAvoidingView, Switch, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import CalendarBody from '../../components/calendar/CalendarBody';
import CalendarHeader from '../../components/calendar/CalendarHeader';
import * as S from './style';

interface CalendarNavProp {
  navigation: {
    push: (arg0: string, arg1?: { selectedDate: string }) => void;
  };
}

function Calendar({ navigation }: CalendarNavProp) {
  const theme = useTheme();
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const DAY = DATE.getDate();

  // 캘린더 토글
  // true: feel, false: img
  const [toggleCalendar, setToggleCalendar] = useState<boolean>(false);

  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [date] = useState(DAY);

  const moveToNextMonth = (month: number) => {
    if (month === 12) {
      setYear(previousYear => previousYear + 1);
      setMonth(1);
    } else {
      setMonth(previouMonth => previouMonth + 1);
    }
  };

  const moveToPreviousMonth = (month: number) => {
    if (month === 1) {
      setYear(previousYear => previousYear - 1);
      setMonth(12);
    } else {
      setMonth(previousMonth => previousMonth - 1);
    }
  };

  const moveToSpecificYearAndMonth = (year: number, month: number) => {
    setYear(year);
    setMonth(month);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <S.CalenderContainer>
        <S.CalenderWrapper>
          <View style={{ flexDirection: 'row' }}>
            <CalendarHeader
              month={month}
              year={year}
              date={date}
              today={{ month: new Date().getMonth() + 1, year: new Date().getFullYear(), date: new Date().getDate() }}
              moveToNextMonth={moveToNextMonth}
              moveToPreviousMonth={moveToPreviousMonth}
              moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
            />
            <Switch
              trackColor={{ false: '#767577', true: theme.colors.middlePink }}
              thumbColor={toggleCalendar ? theme.colors.mainPink : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setToggleCalendar(!toggleCalendar)}
              value={toggleCalendar}
              style={{ flex: 3 }}
            />
          </View>
          <CalendarBody
            month={month}
            year={year}
            date={date}
            navigation={navigation}
            toggleCalendar={toggleCalendar}
            setToggleCalendar={setToggleCalendar}
          />
        </S.CalenderWrapper>
      </S.CalenderContainer>
    </KeyboardAvoidingView>
  );
}

export default Calendar;
