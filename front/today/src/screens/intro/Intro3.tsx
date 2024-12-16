import { SafeAreaView, Text } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './style';

interface IntroProp {
  navigation: {
    reset: (options: { routes: [{ name: string; params?: Record<string, unknown> }]; index?: number }) => void;
  };
}

function Intro3({ navigation }: IntroProp) {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <S.Images source={require('../../../assets/intro3.png')}>
        <S.arrowContainer onPress={() => navigation.reset({ routes: [{ name: 'LoginScreen' }] })}>
          <Text style={{ fontSize: 25, fontWeight: '600', color: theme.colors.mainPink }}>≫</Text>
        </S.arrowContainer>
      </S.Images>
    </SafeAreaView>
  );
}

export default Intro3;
