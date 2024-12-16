import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';
import { Diarys } from '../../../apis/DiaryApi';
import { DiaryCard } from '../../../components/diary/list/DiaryCard';
import { NoticeContext } from '../../../contexts/NoticeContext';
import { AllDiaryData, DiaryData } from '../../../types/datatype';

interface DiaryListProp {
  navigation: {
    push: (arg0: string, arg2?: { diaryId: number }) => void;
    getState: any;
  };
}

function DiaryList({ navigation }: any) {
  const flatListRef = useRef<FlatList<DiaryData>>(null);
  const isFocused = useIsFocused();
  const notices = useContext(NoticeContext);

  // 페이지네이션
  const [data, setData] = useState<AllDiaryData>({ content: [] });
  const [page, setPage] = useState(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const isFirstRender = useRef(true);
  const [reloadFlag, setReloadFlag] = useState(false);

  // 전체 다이어리 조회 => 페이지 변환 시
  function getData() {
    // if (loading) {
    //   return;
    // }
    // setLoading(true);

    Diarys.getDiarys(page, 2)
      .then(response => {
        const newData = response.data?.content || [];
        setData(currentData => ({
          ...currentData,
          content: [...currentData.content, ...newData],
        }));
      })
      .then(() => setLoading(false))
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }

  // 페이지 진입시 데이터 초기화
  useFocusEffect(
    useCallback(() => {
      // if (navigation.getState().routes[0].params !== undefined) {
      //   if(navigation.getState().routes[0].params.screen !== "SelectEmotion"){
      //     navigation.push(navigation.getState().routes[0].params.screen, { diaryId: navigation.getState().routes[0].params.diaryId });
      //   } else {
      //     navigation.push(navigation.getState().routes[0].params.screen);
      //   }
      //   navigation.getState().routes[0].params = undefined;
      // }
      setData({ content: [] });
      setPage(0);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });

      return () => {
        setData({ content: [] });
        setPage(-1);
        isFirstRender.current = true;
      };
    }, []),
  );

  useEffect(() => {
    if (isFirstRender.current || page == -1) {
      isFirstRender.current = false;
    } else {
      getData();
    }
  }, [page, reloadFlag]);

  useEffect(() => {
    if (notices && notices.length > 0) {
      setData({ content: [] });
      setPage(0);
      setReloadFlag(prev => !prev);
    }
  }, [notices]);

  // 다이어리 렌더 함수
  function renderDiary({ item }: { item: DiaryData }) {
    function onPressDiaryCard() {
      switch (item.status) {
        case 0:
          Alert.alert('그림 생성 미완료', '아직 그림을 그리는 중이에요!');
          break;
        case 1:
          navigation.push('SelectImage', { diaryId: item.id });
          break;
        case 2:
          navigation.push('DiaryDetail', { diaryId: item.id });
          break;
        default:
          Alert.alert('그림 생성 미완료', '아직 그림을 그리는 중이에요!');
      }
    }
    return <DiaryCard item={item} onPress={onPressDiaryCard} backgroundColor="white" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
      <FlatList
        ref={flatListRef}
        data={data.content}
        extraData={data}
        renderItem={renderDiary}
        keyExtractor={item => item?.id.toString()}
        onEndReached={() => setPage(prevPage => prevPage + 1)} // 지정 스크롤 지점에 도달했을 때 실행할 함수
        onEndReachedThreshold={0.6} // 스크롤 지점 지정
      />
    </SafeAreaView>
  );
}

export default DiaryList;
