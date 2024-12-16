import { useContext, useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';
import { Diarys } from '../../../apis/DiaryApi';
import { Notices } from '../../../apis/NoticeApi';
import { NoticeContext, useDispatchContext } from '../../../contexts/NoticeContext';
import { NoticeData } from '../../../types/datatype';
import * as S from './style';

type NotiItemProps = {
  item: NoticeData;
  onpress: () => void;
  dispatch: any;
};

type RenderNotiProps = {
  item: NoticeData;
};

interface NotiScreenProp {
  navigation: {
    navigate: (arg0: string, arg1?: { screen: string; params?: { diaryId: number } }) => void;
  };
}

function NotificationItem({ item, onpress, dispatch }: NotiItemProps) {
  const theme = useTheme();
  const backgroundColor = item.confirm ? '#fcfcfc' : theme.colors.middlePink;

  function onPressDelete() {
    dispatch({
      type: 'REMOVE',
      content: item.content,
    });
    Notices.deleteNotices(item.noticeId)
      .then(response => {})
      .catch(error => console.log(error));
  }

  const date = item.createdAt.split('T')[0];

  return (
    <S.NotiContainer onPress={onpress} backgroundColor={backgroundColor}>
      <S.IconContainer onPress={onPressDelete}>
        <Icon name="close" size={20} />
      </S.IconContainer>
      <Text>{date}</Text>
      <Text>오늘의 {item.content} 번째 일기의 그림이 완성되었습니다!</Text>
    </S.NotiContainer>
  );
}

function NotificationScreen({ navigation }: any) {
  const [notiData, setNotiData] = useState<NoticeData[]>([]);
  const dispatch = useDispatchContext();
  const notices = useContext(NoticeContext);

  useEffect(() => {
    setNotiData(notices ?? []);
  }, [notices]);

  function renderNoti({ item }: RenderNotiProps) {
    async function onPressNoti() {
      let temp;
      await Diarys.getSingleDiary(item.diaryId)
        .then(response => {
          temp = response.data?.status;
        })
        .catch(error => console.log(error));

      Notices.checkNotices({ noticeId: item.noticeId, confirm: true });
      dispatch({
        type: 'TOGGLE',
        content: item.content,
      });
      if (temp === 1) {
        navigation.push('DiaryNav', {
          screen: 'SelectImage',
          params: { diaryId: item.diaryId },
        });
      } else {
        navigation.push('DiaryNav', {
          screen: 'DiaryDetail',
          params: { diaryId: item.diaryId },
        });
      }
    }
    return <NotificationItem item={item} onpress={onPressNoti} dispatch={dispatch} />;
  }

  return (
    <S.NoticePageContianer>
      <FlatList
        data={notiData}
        keyExtractor={item => item?.diaryId.toString()}
        renderItem={({ item }) => renderNoti({ item })}
        ListEmptyComponent={() => <Text style={{ textAlign: 'center', marginTop: 20 }}>아직 알림이 없어요!</Text>}
      />
    </S.NoticePageContianer>
  );
}

export default NotificationScreen;
