import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components/native';
import { TabName, useNavigationState } from '../../contexts/NavigationContext';
import * as S from './style';

const BottomNav = () => {
  const theme = useTheme();
  const navigation: any = useNavigation();

  const { currentTab, setCurrentTab } = useNavigationState();
  const getIconColor = (tabKey: string) => (currentTab === tabKey ? theme.colors.mainPink : 'black');

  const tabs = [
    { key: 'Calendar', nav: 'CalendarNav', label: <Icon name="calendar" size={27} color={getIconColor('Calendar')} /> },
    { key: 'Diary', nav: 'DiaryNav', label: <Icon name="book" size={27} color={getIconColor('Diary')} /> },
    { key: 'Mypage', nav: 'UserNav', label: <Icon name="user" size={27} color={getIconColor('Mypage')} /> },
  ];

  return (
    <S.BottomNavContainer>
      {tabs.map(tab => (
        <S.IconContainer
          key={tab.key}
          onPress={() => {
            setCurrentTab(tab.key as TabName);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: tab.nav,
                  state: {
                    routes: [{ name: tab.key }],
                  },
                },
              ],
            });
          }}>
          {tab.label}
        </S.IconContainer>
      ))}
    </S.BottomNavContainer>
  );
};

export default BottomNav;
