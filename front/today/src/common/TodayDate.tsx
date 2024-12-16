import * as S from './Style';

function TodayDate() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return <S.TodayDate>{formattedDate}</S.TodayDate>;
}

export default TodayDate;
