from fastapi import FastAPI, APIRouter
from app.utils.init import load_env, load_sdxl, load_emotion, load_mbti, connect_kafka , consumer_listener, connect_openai ,connect_s3
import asyncio

app = FastAPI(docs_url='/api/data/docs', redoc_url='/api/data/redoc')

@app.on_event("startup")
async def startup():
    # 초기 환경변수 설정
    load_env()
    # 초기 Stable Diffusion XL 설정
    load_sdxl()
    # 초기 감정 분석 모델 설정
    load_emotion()
    # 초기 MBTI 모델 설정
    load_mbti()
    # OPENAI 연결
    connect_openai()
    # S3 Bucket 연결
    connect_s3()
    # Socket.IO 연결
    #await connect_socket()
    connect_kafka()
    await consumer_listener()
