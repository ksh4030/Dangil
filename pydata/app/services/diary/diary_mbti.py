import app.utils.global_vars

def mbti(prompt):
    model = app.utils.global_vars.mbti
    try:
        transformed_input = model['tfidf'].transform([prompt])
        prediction = model['clf'].predict(transformed_input)
        result = prediction[0]
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

