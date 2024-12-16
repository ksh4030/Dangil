import app.utils.global_vars

def emotion(prompt):
    prompt = [prompt]
    cv_loaded = app.utils.global_vars.cv_loaded
    clf_loaded = app.utils.global_vars.clf_loaded
    # CountVectorizer를 사용하여 입력 텍스트 변환
    transformed_texts = cv_loaded.transform(prompt)
    # 예측 실행
    predictions = clf_loaded.predict(transformed_texts)
    probabilities = clf_loaded.predict_proba(transformed_texts)

    result = {}

    for text, prediction, probability in zip(prompt, predictions, probabilities):
        # 확률 값을 소수점 다섯 자리로 포맷
        formatted_probabilities = {
                emotion: float(f"{prob:.5f}") for emotion, prob in zip(clf_loaded.classes_, probability)}
        result = formatted_probabilities

    return result

