import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import NotificationScreen from '../screens/user/notification/NotificationScreen';
import { RootStackParam } from '../types/navigatortype/stack';
import { CalendarNav } from './CalendarStack';
import { DiaryNav } from './DairyStack';
import { UserNav } from './UserStack';

const Stack = createNativeStackNavigator<RootStackParam>();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="CalendarNav">
      <Stack.Screen name="CalendarNav" component={CalendarNav} options={{ headerShown: false }} />
      <Stack.Screen name="DiaryNav" component={DiaryNav} options={{ headerShown: false }} />
      <Stack.Screen name="UserNav" component={UserNav} options={{ headerShown: false }} />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: ({ children }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'title', fontSize: 38 }}>알림</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
