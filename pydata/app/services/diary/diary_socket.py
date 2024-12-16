import app.utils.global_vars

from app.services.diary.diary_image import create_image
from app.services.diary.diary_openai import diary_translate, diary_keyword
from app.services.diary.diary_emotion import emotion
from app.services.diary.diary_mbti import mbti
from app.services.diary.diary_schema import createImageIn, createImageOut
from app.utils.response import successResponse
from app.utils.response_code import successResponseCode, errorResponseCode

def make_image(data):
    data = createImageIn(**data)
    # 한글 to 영어
    translate_prompt = diary_translate(data.content)
    # 핵심 단어 추출
    keyword = diary_keyword(translate_prompt)
    # 이미지 추출 및 저장
    images_url = create_image(data.feel, keyword)
    # 감정 분석 
    emotion_result = emotion(data.content)
    # MBTI 분석
    mbti_result = mbti(translate_prompt)
    
    diary_result = {"diaryId": data.diaryId, "memberId": data.memberId, "createdAt": data.createdAt}
    
    return createImageOut(
                memberId=data.memberId,
                diaryId=data.diaryId,
                createdAt=data.createdAt,
                imageUrl=images_url, 
                angry=emotion_result["angry"],
                disgust=emotion_result["disgust"],
                fear=emotion_result["fear"],
                happiness=emotion_result["happiness"],
                sadness=emotion_result["sadness"],
                surprise=emotion_result["surprise"],
                mbti=mbti_result,
                count=data.count
            ).model_dump(mode='dict')

