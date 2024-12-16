from enum import Enum

#class StrEnum(str, Enum):
 #   def __init__(self, status, message):
  #      self.status = status
   #     self.message = message

    #def __str__(self):
     #   return self.name

class successResponseCode(Enum):
    createImage = (200, "OK")

    def __init__(self, status, message):
        self.status = status
        self.message = message

    def __str__(self):
        return self.name

class errorResponseCode(Enum):
    invalidParameter = (400, "올바르지 않은 값입니다.")
    createImage = (500, "이미지 생성에 실패했습니다.")

    def __init__(self, status, message):
        self.status = status
        self.message = message

    def __str__(self):
        return self.name

