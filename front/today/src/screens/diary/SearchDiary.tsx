import React from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { DiaryCard } from '../../components/diary/search/DiaryCard';
import { SearchData } from '../../types/datatype';
import * as S from './style';

interface SearchDiaryProp {
  navigation: {
    push: (arg0: string, arg1?: { screen: string; params: { diaryId: number } }) => void;
  };
  route: { params: { searchData: SearchData[] } };
}

function SearchDiary({ navigation, route }: SearchDiaryProp) {
  const { searchData } = route.params;

  // 다이어리 렌더 함수
  function renderDiary({ item }: { item: SearchData }) {
    function onPressSearchDiary() {
      if (item.imgUrl === null) {
        navigation.push('DiaryNav', { screen: 'SelectImage', params: { diaryId: item.id } });
      } else {
        navigation.push('DiaryNav', { screen: 'DiaryDetail', params: { diaryId: item.id } });
      }
    }
    return <DiaryCard item={item} onPress={onPressSearchDiary} backgroundColor="white" />;
  }

  // 빈배열일 경우
  function renderEmptyComponent() {
    return (
      <S.EmptyDiaryContainer>
        <Text>검색 결과가 없습니다.</Text>
      </S.EmptyDiaryContainer>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
      <FlatList
        data={searchData}
        extraData={searchData}
        renderItem={renderDiary}
        keyExtractor={item => item?.id.toString()}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
}

export default SearchDiary;
