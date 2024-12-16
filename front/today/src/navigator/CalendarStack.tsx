// CalendarStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Feather';
import { Calendars } from '../apis/CalendarApi';
import Logo from '../common/Logo';
import NotificationBadge from '../common/noti/NotificationBadge';
import SearchBar from '../components/diary/search/SearchBar';
import Calendar from '../screens/calendar/Calendar';
import SearchDiary from '../screens/diary/SearchDiary';
import OneDayDiary from '../screens/diary/day/OneDayDiary';
import { SearchData } from '../types/datatype';
import { CalendarStackParam } from '../types/navigatortype/stack';

interface CalendarStackProp {
  navigation: {
    navigate: (arg0: string, arg1?: { searchData?: SearchData[]; screen?: string }) => void;
    reset: any;
    push: (arg0: string, arg1?: { screen: string }) => void;
    jumpTo: any;
  };
}

const CalendarStack = createNativeStackNavigator<CalendarStackParam>();

export const CalendarNav = ({ navigation }: CalendarStackProp) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState<SearchData[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  function onPressSearch() {
    if (filterText.trim() === '') {
      Alert.alert('검색어 누락', '검색어를 입력해주세요!');
      return;
    }
    Calendars.Search({ keyword: filterText })
      .then(response => {
        const newData = response.data || [];
        setSearchData(newData);
        navigation.navigate('SearchDiary', { searchData: newData });
        setIsSearching(false);
        setFilterText('');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <CalendarStack.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: ({ children }) => (
          <Logo
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'CalendarNav',
                    state: {
                      routes: [{ name: 'Calendar' }],
                    },
                  },
                ],
              })
            }
          />
        ),
      }}>
      <CalendarStack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitle: () =>
            isSearching ? (
              <>
                <SearchBar filterText={filterText} setFilterText={setFilterText} onSubmit={onPressSearch} />
                <IconF name="search" size={27} onPress={onPressSearch} />
              </>
            ) : (
              <Logo
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'CalendarNav',
                        state: {
                          routes: [{ name: 'Calendar' }],
                        },
                      },
                    ],
                  })
                }
              />
            ),
          headerLeft: () =>
            isSearching ? (
              <></>
            ) : (
              <IconF name="plus" size={35} onPress={() => navigation.push('DiaryNav', { screen: 'SelectEmotion' })} />
            ),
          headerRight: () =>
            isSearching ? (
              <IconA name="close" size={27} onPress={() => setIsSearching(false)} />
            ) : (
              <>
                <IconF name="search" size={27} onPress={() => setIsSearching(true)} />
                <NotificationBadge onPress={() => navigation.push('NotificationScreen')} />
              </>
            ),
        }}
      />
      <CalendarStack.Screen
        name="OneDayDiary"
        component={OneDayDiary}
        options={{
          headerBackTitle: '캘린더',
        }}
      />
      <CalendarStack.Screen
        name="SearchDiary"
        component={SearchDiary}
        options={{
          headerTitle: () => (
            <>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'title', fontSize: 38 }}>나의 일기</Text>
              </View>
            </>
          ),
        }}
      />
    </CalendarStack.Navigator>
  );
};
