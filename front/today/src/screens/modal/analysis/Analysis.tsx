// Analysis.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { analysis } from '../../../apis/AnalysisApi';
import { Members } from '../../../apis/MemberApi';
import ModalComponent from '../../../components/modal/Modal';
import Graph from '../../../components/user/Graph';
import Pyramid from '../../../components/user/Pyramid';
import { AnalysisData, MemberData } from '../../../types/datatype';
import { ModalProps } from '../../../types/modal';
import * as S from './style';

function AnalysisContent({
  selectedDate,
  setModalVisible,
}: {
  selectedDate: string;
  setModalVisible: (view: boolean) => void;
}) {
  const [memberInfo, setMemberInfo] = useState<MemberData | undefined>();
  const [analysisData, setAnalysisData] = useState<AnalysisData | undefined>(undefined);

  let MBTI = '';

  if (analysisData) {
    MBTI += analysisData['e'] > analysisData['i'] ? 'E' : 'I';
    MBTI += analysisData['s'] > analysisData['n'] ? 'S' : 'N';
    MBTI += analysisData['f'] > analysisData['t'] ? 'F' : 'T';
    MBTI += analysisData['p'] > analysisData['j'] ? 'P' : 'J';
  }

  useEffect(() => {
    Members.getMembers()
      .then(response => {
        setMemberInfo(response.data);
      })
      .catch(err => {
        console.log(err);
      });

    analysis
      .getAnalysisday(selectedDate) // 하루치 데이터 불러오기
      .then(response => {
        setAnalysisData(response.data); // 데이터 상태 업데이트
      })
      .catch(error => {
        console.error('analysis data:', error);
      });
  }, [selectedDate]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <S.CloseModal>
        <Icon name="close" size={25} onPress={() => setModalVisible(false)} />
      </S.CloseModal>
      <Text></Text>
      <S.AnalysisTitle>오늘의 일기 분석 결과</S.AnalysisTitle>
      {analysisData ? (
        <ScrollView>
          <S.AnalysisSubTitle>{memberInfo?.nickName}님의 오늘의 성격유형입니다</S.AnalysisSubTitle>
          <S.AnalysisSubTitle>
            <S.MBTItext>{MBTI}</S.MBTItext> 와 유사하네요!
          </S.AnalysisSubTitle>
          <Pyramid analysisData={analysisData} width={280} height={250} />
          <S.Line />
          <S.AnalysisSubTitle>{memberInfo?.nickName}님의 오늘의 기분입니다</S.AnalysisSubTitle>
          <View style={{ height: 280, width: 280 }}>
            <Graph analysisData={analysisData} />
          </View>
        </ScrollView>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <S.AnalysisSubTitle>{memberInfo?.nickName}님의 오늘의 성격유형입니다</S.AnalysisSubTitle>
          <Text>오늘의 일기를 작성해주세요!</Text>
          <S.Line />
          <S.AnalysisSubTitle>{memberInfo?.nickName}님의 오늘의 기분입니다</S.AnalysisSubTitle>
          <Text>오늘의 일기를 작성해주세요!</Text>
        </View>
      )}
    </View>
  );
}

function Analysis({ modalVisible, setModalVisible, selectedDate }: ModalProps) {
  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      modalContent={<AnalysisContent selectedDate={selectedDate} setModalVisible={setModalVisible} />}
      selectedDate={selectedDate}
    />
  );
}

export default Analysis;
