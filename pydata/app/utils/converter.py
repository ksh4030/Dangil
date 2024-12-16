from datetime import datetime, date

# json dumps시 dict내용의 datatime클래스를 isoformat인 string타입으로 바꿈
def datetime_to_json_formatting(o):
    if isinstance(o, (date, datetime)):
        return o.isoformat()
