from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import List

class createImageIn(BaseModel):
    diaryId: int
    memberId: int
    count: int
    feel: str
    content: str
    createdAt: datetime

class createImageOut(BaseModel):
    diaryId: int
    memberId: int
    createdAt: datetime
    imageUrl: List[str]
    angry: float
    disgust: float
    fear: float
    happiness: float
    sadness: float
    surprise: float
    mbti: str
    count: int
