from fastapi.responses import JSONResponse

def successResponse(responseCode, data):
    return {
            "statusCode": responseCode.status,
            "statusName": responseCode.name,
            "message": responseCode.message,
            "data": data.model_dump(mode='dict')
        }
def ErrorResponse(responseCode):
    return JSONResponse(
            status_code = responseCode.status,
            content = {
                "statusCode": responseCode.status,
                "statusName": responseCode.name,
                "message": responseCode.message,
            }
        )
