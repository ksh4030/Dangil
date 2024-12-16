import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { analysis } from '../../apis/AnalysisApi';
import { Members } from '../../apis/MemberApi';
import Graph from '../../components/user/Graph';
import Pyramid from '../../components/user/Pyramid';
import { IsLoginContext } from '../../contexts/IsLoginContext';
import { AnalysisData, MemberData } from '../../types/datatype';
import * as S from './style';

function Mypage() {
  const [memberInfo, setMemberInfo] = useState<MemberData | undefined>();
  const [analysisData, setAnalysisData] = useState<AnalysisData | undefined>();
  const { setIsLogin } = useContext(IsLoginContext);
  const isFocused = useIsFocused();
  const month = new Date().getMonth();
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
  }, []);

  const loadAnalysisData = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환

    analysis
      .getAnalysismonth(today)
      .then(response => {
        const data = response.data;
        if (data) {
          const scaledData = {
            ...data,
            angry: data.angry,
            disgust: data.disgust,
            fear: data.fear,
            happiness: data.happiness,
            sadness: data.sadness,
            surprise: data.surprise,
          };
          setAnalysisData(scaledData);
        }
      })
      .catch(error => {
        console.error('Graph error', error);
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadAnalysisData();
    }
  }, [isFocused, loadAnalysisData]);

  async function Logout() {
    await AsyncStorage.removeItem('accessToken');
    setIsLogin(false);
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <S.MyPage>
        <S.MyPageContainer>
          <S.MyPageSubTitle>MY INFO</S.MyPageSubTitle>
          <S.Line />
          <S.MyInfo>
            <S.MyInfoTitle>닉네임</S.MyInfoTitle>
            <S.MyInfoContent>
              <Text>{memberInfo?.nickName}</Text>
            </S.MyInfoContent>
          </S.MyInfo>
          <S.MyInfo>
            <S.MyInfoTitle>이메일</S.MyInfoTitle>
            <S.MyInfoContent>
              <Text>{memberInfo?.email}</Text>
            </S.MyInfoContent>
          </S.MyInfo>

          <S.MyPageSubTitle>
            <S.PointWord>{memberInfo?.nickName}</S.PointWord>님의 MBTI
          </S.MyPageSubTitle>
          <S.Line />
          {analysisData ? (
            <>
              <S.MBTITitle>
                <S.MBTItext>{MBTI}</S.MBTItext> 와 유사하네요
              </S.MBTITitle>
              <Pyramid analysisData={analysisData} width={280} height={250} />
            </>
          ) : (
            <Text style={{ marginTop: 30, marginBottom: 20 }}>일기를 작성해주시면 성격 유형을 분석해드려요!</Text>
          )}
          <S.MyPageSubTitle>
            <S.PointWord>{memberInfo?.nickName}</S.PointWord>님의 {month + 1}월 감정
          </S.MyPageSubTitle>
          <S.Line />
          {analysisData ? (
            <View style={{ height: 300, marginBottom: 30 }}>
              <Graph analysisData={analysisData} />
            </View>
          ) : (
            <Text style={{ marginVertical: 30 }}>일기를 작성해주시면 감정을 분석해드려요!</Text>
          )}
          {/* <S.Line />
          <S.SettingWrapper>
            <View style={{ width: 45, alignItems: 'center', marginRight: 18 }}>
              <Icon name="lock" size={28} />
            </View>
            <Text>비밀번호 설정</Text>
          </S.SettingWrapper> */}
          <S.Line />
          <S.SettingWrapper style={{ marginBottom: 20 }} onPress={Logout}>
            <View style={{ width: 37, alignItems: 'center', marginRight: 28 }}>
              <Icon name="logout" size={28} />
            </View>
            <Text>로그아웃</Text>
          </S.SettingWrapper>
        </S.MyPageContainer>
      </S.MyPage>
    </ScrollView>
  );
}

export default Mypage;
