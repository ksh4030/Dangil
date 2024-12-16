import LottieView from 'lottie-react-native';
import CommonButton from '../../../common/CommonButton';
import { useNavigationState } from '../../../contexts/NavigationContext';
import * as S from './style';

interface RouteList {
  routeNames: string[];
}

interface WaitImageProp {
  navigation: {
    reset: any;
    replace: (arg0: string, arg1?: { screen: string }) => void;
    getState: () => RouteList;
    navigate: any;
  };
}

function WaitImage({ navigation }: WaitImageProp) {
  const { currentTab, setCurrentTab } = useNavigationState();
  function onPressGoHome() {
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
  }
  return (
    <S.WaitImage>
      <S.WaitImageContainer>
        <LottieView
          source={require('../../../../assets/lotties/drawing.json')}
          autoPlay
          loop
          style={{
            width: '100%',
            height: 300,
          }}
        />
        <S.WaitImageTitle>그림 그리는 중!</S.WaitImageTitle>
        <S.WaitImageContent>오늘 하루를 그리는 중입니다.</S.WaitImageContent>
        <S.WaitImageContent>잠시만 기다려주세요.</S.WaitImageContent>

        <S.WaitImageExplane>그림을 생성하는데 약 3분 정도 소요됩니다.</S.WaitImageExplane>
        <S.WaitImageExplane>그림 생성이 완료되면 알림을 보내드려요!</S.WaitImageExplane>
        <S.ButtonContainer>
          <CommonButton content="홈으로 돌아가기" onPress={onPressGoHome} />
        </S.ButtonContainer>
      </S.WaitImageContainer>
    </S.WaitImage>
  );
}

export default WaitImage;
