import { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { NoticeContext } from '../../contexts/NoticeContext';
import { NoticeData } from '../../types/datatype';
import * as S from './Notistyle';

type NotiBadgeProp = {
  onPress: () => void;
};

function NotificationBadge({ onPress }: NotiBadgeProp) {
  const [notiData, setNotiData] = useState<NoticeData[]>([]);
  const [count, setCount] = useState<number>(0);
  const notices = useContext(NoticeContext);

  useEffect(() => {
    setNotiData(notices ?? []);
  }, [notices]);

  useEffect(() => {
    // confirm이 false인 항목들만 필터링하고, 그 개수를 count 상태에 설정
    const unconfirmedCount = notiData.filter(noti => noti.confirm === false).length;
    setCount(unconfirmedCount);
  }, [notiData]);

  return (
    <S.NotiContainer onPress={onPress}>
      <Icon name="bell" size={30} />
      {count > 0 && (
        <S.NotiBadge>
          <S.NotiBadgeText>{count}</S.NotiBadgeText>
        </S.NotiBadge>
      )}
    </S.NotiContainer>
  );
}

export default NotificationBadge;
