import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import Logo from '../common/Logo';
import NotificationBadge from '../common/noti/NotificationBadge';
import { useNavigationState } from '../contexts/NavigationContext';
import DiaryDetail from '../screens/diary/DiaryDetail';
import EditDiary from '../screens/diary/EditDiary';
import WriteDiary from '../screens/diary/WriteDiary';
import DiaryList from '../screens/diary/list/DiaryList';
import SelectImage from '../screens/diary/select/SelectImage';
import WaitImage from '../screens/diary/wait/WaitImage';
import SelectEmotion from '../screens/emotion/SelectEmotion';
import { DiaryStackParam } from '../types/navigatortype/stack';

interface DiaryStackProp {
  navigation: {
    push: (arg0: string, arg1?: { screen: string }) => void;
    reset: any;
  };
}

const DiaryStack = createNativeStackNavigator<DiaryStackParam>();

export const DiaryNav = ({ navigation }: DiaryStackProp) => {
  const { currentTab, setCurrentTab } = useNavigationState();
  return (
    <DiaryStack.Navigator
      initialRouteName="DiaryList"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: ({ children }) => (
          <Logo
            onPress={() => {
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
              });
              setCurrentTab('Calendar');
            }}
          />
        ),

        headerRight: () => (
          <NotificationBadge
            onPress={() => {
              navigation.push('NotificationScreen');
            }}
          />
        ),
      }}>
      <DiaryStack.Screen
        name="DiaryList"
        component={DiaryList}
        options={{ headerLeft: () => <Icon name="plus" size={35} onPress={() => navigation.push('SelectEmotion')} /> }}
      />
      <DiaryStack.Screen name="SelectImage" component={SelectImage} />
      <DiaryStack.Screen name="SelectEmotion" component={SelectEmotion} />
      <DiaryStack.Screen name="EditDiary" component={EditDiary} />
      <DiaryStack.Screen name="WriteDiary" component={WriteDiary} />
      <DiaryStack.Screen name="DiaryDetail" component={DiaryDetail} />
      <DiaryStack.Screen name="WaitImage" component={WaitImage} options={{ headerShown: false }} />
    </DiaryStack.Navigator>
  );
};
